import { Book, Card, LayMove, Meld, MeldStack, Rank, Rummy, Suit } from "rummy-lib/lib";
import { Utils } from "./utils";
import fs from "fs";

export function minimalPossibleLayoff(playerIndex: number, rummy: Rummy) {
	for (let player of rummy.players) {
		for (let meld of player.meldStack.melds) {
			for (
				let i = 0;
				i < rummy.players[playerIndex].hand.cards.length;
				i++
			) {
				const card = rummy.players[playerIndex].hand.cards[i];

				if (meld.isValidAddition(card)) {
					return new LayMove(
						rummy.players[playerIndex].hand,
						player.meldStack,
						i,
						meld
					);
				}
			}
		}
	}
	return null;
}

export function cfrLayoff(playerIndex: number, rummy: Rummy) {
	let moves: { card: number; meld: Meld; meldstack: MeldStack}[] = [];
	for (let player of rummy.players) {
		for (let meld of player.meldStack.melds) {
			for (
				let i = 0;
				i < rummy.players[playerIndex].hand.cards.length;
				i++
			) {
				const card = rummy.players[playerIndex].hand.cards[i];

				if (meld.isValidAddition(card)) {
					let card = i;
					let meldstack = player.meldStack;
					moves.push({ card, meld, meldstack});
				}
			}
		}
	}
	// console.log("moves", moves);
	let moveids: Record<string, { card: number; meld: Meld; meldstack: MeldStack }> = {};
	for (const iterator of moves) {
		let c = rummy.players[playerIndex].hand.cards[iterator.card];
		moveids[Utils.uniqueID([c])] = iterator;
	}

	// FIND BEST MOVE
	let regrets = Utils.getLayoffRegret();
	// console.log("regret keys", Object.keys(regrets));
	// console.log("layoff keys", moveids);
	let savedMoves = Object.keys(regrets).filter((o) =>
		Object.keys(moveids).some((s) => s == o)
	);
	// console.log("saved legal moves", savedMoves);
	let moveType = "";
	let t = 100000000000000;
	for (const key of savedMoves) {
		if (regrets[key] < t) {
			t = regrets[key];
			moveType = key;
		}
	}
	if (moveType == "") {
		moveType = Object.keys(moveids)[0];
	}
	if (moves.length > 0) {
		let card = moveids[moveType];
		let meldmove = new LayMove(
			rummy.players[playerIndex].hand,
			card.meldstack,
			card.card,
			card.meld
		);

		// CFR
		let meldscore = rummy.players[playerIndex].hand.cards[card.card].score;
		for (const key in moveids) {
			let score =
				rummy.players[playerIndex].hand.cards[moveids[key].card].score;
			if (regrets[key] == null) {
				regrets[key] = Utils.calculateRegret(meldscore, score);
			} else {
				regrets[key] += Utils.calculateRegret(meldscore, score);
			}
		}
		// console.log("regrets", regrets);
		fs.writeFileSync(`res/layoff.json`, JSON.stringify(regrets));
		return meldmove;
	}
	return null;
}

export const layoffs = [minimalPossibleLayoff, cfrLayoff];
