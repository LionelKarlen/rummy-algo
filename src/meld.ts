import { Book, Meld, MeldMove, MeldType, Rummy, Run } from "rummy-lib/lib";

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

export const melds = [minimumPossibleMeld];
