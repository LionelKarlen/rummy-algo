import { PickupMove, Rummy } from "rummy-lib/lib";

export function onlyStockPickup(playerIndex: number, rummy: Rummy) {
	return new PickupMove(
		rummy.board.stock,
		rummy.players[playerIndex].hand,
		rummy.board.stock.cards[0]
	);
}

export function onlyDiscardPickup(playerIndex: number, rummy: Rummy) {
	return new PickupMove(
		rummy.board.discard,
		rummy.players[playerIndex].hand,
		rummy.board.discard.cards[0]
	);
}
