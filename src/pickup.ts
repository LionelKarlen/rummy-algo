import { PickupMove, Rummy } from "rummy-lib/lib";

export function onlyStockPickup(playerIndex: number, rummy: Rummy) {
	return new PickupMove(
		rummy.board.stock,
		rummy.players[playerIndex].hand,
		0
	);
}

export function onlyDiscardPickup(playerIndex: number, rummy: Rummy) {
	return new PickupMove(
		rummy.board.discard,
		rummy.players[playerIndex].hand,
		0
	);
}

export function conditionalDisard(playerIndex: number, rummy: Rummy) {
	for (let player of rummy.players) {
		for (let meld of player.meldStack.melds) {
			if (meld.isValidAddition(rummy.board.discard.cards[0])) {
				return new PickupMove(
					rummy.board.discard,
					rummy.players[playerIndex].hand,
					0
				);
			}
		}
	}
	return onlyStockPickup(playerIndex, rummy);
}

export const pickups = [onlyStockPickup, onlyDiscardPickup, conditionalDisard];
