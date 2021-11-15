import { Book, Meld, MeldMove, MeldType, Rummy } from "rummy-lib/lib";

export function minimumPossibleMeld(playerIndex: number, rummy: Rummy) {
	let hand = rummy.players[playerIndex].hand;

	//   return new MeldMove(rummy.players[playerIndex].hand,rummy.players[playerIndex].meldStack,new Book([]));
	return null;
}

export const melds = [minimumPossibleMeld];
