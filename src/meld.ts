import {
	Book,
	Card,
	Meld,
	MeldMove,
	MeldType,
	Rummy,
	Run,
} from "rummy-lib/lib";
import { Utils } from "./utils";
import { Util } from "rummy-lib/lib";
import fs from "fs";

export function minimumPossibleMeld(playerIndex: number, rummy: Rummy) {
	let hand = rummy.players[playerIndex].hand;
	let ranked = hand.cards.sort((a, b) => a.rank - b.rank);
	for (let i = 0; i < ranked.length - 2; i++) {
		if (
			ranked[i].rank == ranked[i + 1].rank &&
			ranked[i].rank == ranked[i + 2].rank &&
			ranked[i].suit == ranked[i + 1].suit &&
			ranked[i].suit == ranked[i + 2].suit
		) {
			let meld = new Book([ranked[i], ranked[i + 1], ranked[i + 2]]);
			// console.log("meldMove", meld);
			return new MeldMove(
				rummy.players[playerIndex].hand,
				rummy.players[playerIndex].meldStack,
				meld
			);
		}
		if (
			ranked[i].rank + 1 == ranked[i + 1].rank &&
			ranked[i + 1].rank + 1 == ranked[i + 2].rank
		) {
			let meld = new Run([ranked[i], ranked[i + 1], ranked[i + 2]]);
			// console.log("meldMove", meld);
			return new MeldMove(
				rummy.players[playerIndex].hand,
				rummy.players[playerIndex].meldStack,
				meld
			);
		}
	}
	return null;
}

export function cfrMeld(playerIndex: number, rummy: Rummy) {
	// FIND ALL LEGAL MELDS
	let cards = Util.sortCards(rummy.players[playerIndex].hand.cards);
	let el = [];
	// console.log("cards", cards);
	for (let l = 3; l < cards.length; l++) {
		for (let x = 0; x < cards.length - l + 1; x++) {
			el.push(cards.slice(x, x + l));
		}
	}
	cards = cards.sort((a, b) => a.suit - b.suit);
	for (let l = 3; l < cards.length; l++) {
		for (let x = 0; x < cards.length - l + 1; x++) {
			el.push(cards.slice(x, x + l));
		}
	}
	// console.log(el)
	let moves: Meld[] = [];
	for (const iterator of el) {
		if (Util.isValidMeld(MeldType.BOOK, iterator)) {
			moves.push(new Book(iterator));
		} else if (Util.isValidMeld(MeldType.RUN, iterator)) {
			moves.push(new Run(iterator));
		}
	}
	// console.log("moves", moves);
	let moveids: Record<string, Meld> = {};
	for (const iterator of moves) {
		moveids[Utils.uniqueID(iterator.cards)] = iterator;
	}

	// FIND BEST MOVE
	let regrets = Utils.getMeldRegret();
	// console.log("regret keys", Object.keys(regrets));
	// console.log("meld keys", moveids);
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
		moveType=Object.keys(moveids)[0];
	}
	if(moves.length>0) {

		let meld = moveids[moveType];
		let meldmove = new MeldMove(
			rummy.players[playerIndex].hand,
			rummy.players[playerIndex].meldStack,
			meld
		);

		// CFR
		let meldscore = 0;
		for (const i of meld.cards) {
			meldscore += i.score;
		}
		for (const key in moveids) {
			let score = 0;
			for (const j of moveids[key].cards) {
				score += j.score;
			}
			if(regrets[key]==null) {

			regrets[key] = Utils.calculateRegret(meldscore, score);
			} else {

			regrets[key] += Utils.calculateRegret(meldscore, score);
			}
		}
		// console.log("regrets", regrets);
		fs.writeFileSync(`res/meld.json`, JSON.stringify(regrets));
		return meldmove
	}
	return null;
}

export const melds = [minimumPossibleMeld, cfrMeld];
