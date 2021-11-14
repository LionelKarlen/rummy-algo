import { Book, Card, LayMove, Rank, Rummy, Suit } from "rummy-lib/lib";

export function minimalPossibleLayoff(playerIndex: number, rummy: Rummy) {
	for (let player of rummy.players) {
		for (let meld of player.meldStack.melds) {
			for (let card of rummy.players[playerIndex].hand.cards) {
				if (meld.isValidAddition(card)) {
					return new LayMove(
						rummy.players[playerIndex].hand,
						player.meldStack,
						card,
						meld
					);
				}
			}
		}
	}
	return null;
}
