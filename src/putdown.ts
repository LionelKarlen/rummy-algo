import { PutdownMove, Rummy } from "rummy-lib/lib";

export function oldestCard(playerIndex: number, rummy: Rummy) {
	let nonDiscard = rummy.players[playerIndex].hand.cards.findIndex(
		(card, index) => card.isDiscard == false
	);
	console.log("nonDisc", nonDiscard);
	console.log("hand", rummy.players[playerIndex].hand.cards);
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

export const putdowns = [oldestCard];
