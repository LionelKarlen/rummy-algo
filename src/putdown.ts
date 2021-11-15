import { PutdownMove, Rummy } from "rummy-lib/lib";

export function oldestCard(playerIndex: number, rummy: Rummy) {
	return new PutdownMove(
		rummy.players[playerIndex].hand,
		rummy.board.discard,
		rummy.players[playerIndex].hand.cards[
			rummy.players[playerIndex].hand.cards.findIndex(
				(card, index) => card.isDiscard == false
			)
		]
	);
}

export function uselessCard(playerIndex: number, rummy: Rummy) {
	if (rummy.players[playerIndex].hand.cards) {
	}
}

export const putdowns = [oldestCard];
