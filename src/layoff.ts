import { Book, Card, LayMove, Rank, Rummy, Suit } from "rummy-lib/lib";

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

export const layoffs = [minimalPossibleLayoff];
