import { Book, Meld, MeldMove, MeldType, Rummy } from "rummy-lib/lib";

export function minimumPossibleMeld(playerIndex: number, rummy: Rummy) {
	let hand = rummy.players[playerIndex].hand;
	let run = hand.cards.sort((a, b) => a.rank - b.rank);
	console.log(run);

	return null;
}

export const melds = [minimumPossibleMeld];
