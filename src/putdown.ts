import { PutdownMove, Rummy } from "rummy-lib/lib";
import { Utils } from "./utils";
import fs from 'fs';

export function oldestCard(playerIndex: number, rummy: Rummy) {
	let nonDiscard = rummy.players[playerIndex].hand.cards.findIndex(
		(card, index) => card.isDiscard == false
	);
	// console.log("nonDisc", nonDiscard);
	// console.log("hand", rummy.players[playerIndex].hand.cards);
	// console.log(playerIndex)
	return new PutdownMove(
		rummy.players[playerIndex].hand,
		rummy.board.discard,
		nonDiscard
	);
}

export function uselessCard(playerIndex: number, rummy: Rummy) {
	if (rummy.players[playerIndex].hand.cards) {
	}
}

export function cfrPutdown(playerIndex: number, rummy: Rummy) {
	let moves: number[] = [];
	for (let i = 0; i < rummy.players[playerIndex].hand.cards.length; i++) {
		if(!rummy.players[playerIndex].hand.cards[i].isDiscard) {
			moves.push(i)	
		}
	}
	// console.log("moves", moves);

	let moveids: Record<string, number> = {};
	for (const iterator of moves) {
		let c = rummy.players[playerIndex].hand.cards[iterator];
		moveids[Utils.uniqueID([c])] = iterator;
	}
	
	// FIND BEST MOVE
	let regrets = Utils.getPutdownRegret();
	// console.log("regret keys", Object.keys(regrets));
	// console.log("putdown keys", moveids);
	let savedMoves = Object.keys(regrets).filter((o) =>
		Object.keys(moveids).some((s) => s == o)
	);
	// console.log("saved legal moves", savedMoves);
	let moveType = "";
	let t = 0;
	for (const key of savedMoves) {
		if (regrets[key] > t) {
			t = regrets[key];
			moveType = key;
		}
	}
	if (moveType == "") {
		moveType = Object.keys(moveids)[0];
	}
	if (moves.length > 0) {
		let card = moveids[moveType];
		let meldmove = new PutdownMove(
			rummy.players[playerIndex].hand,
			rummy.board.discard,
			card,
		);

		// CFR
		let meldscore = rummy.players[playerIndex].hand.cards[card].score;
		// console.log(meldscore)
		for (const key in moveids) {
			let score =
				rummy.players[playerIndex].hand.cards[moveids[key]].score;
			if (regrets[key] == null) {
				regrets[key] = Utils.calculateRegret(meldscore, score);
			} else {
				regrets[key] += Utils.calculateRegret(meldscore, score);
			}
		}
		// console.log("regrets", regrets);
		fs.writeFileSync(`res/putdown.json`, JSON.stringify(regrets));
		return meldmove;
	}
	return oldestCard(playerIndex, rummy);
}

export const putdowns = [oldestCard,cfrPutdown];
