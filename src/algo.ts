import {
	LayMove,
	MeldMove,
	PickupMove,
	PutdownMove,
	Rummy,
} from "rummy-lib/lib";

export class Algo {
	playerIndex: number;
	game: Rummy;
	constructor(game: Rummy, playerIndex: number) {
		this.game = game;
		this.playerIndex = playerIndex;
	}

	pickUp(implement: (playerIndex: number, rummy: Rummy) => PickupMove) {
		return implement(this.playerIndex, this.game);
	}

	meld(implement: (playerIndex: number, rummy: Rummy) => MeldMove | null) {
		return implement(this.playerIndex, this.game);
	}

	layOff(implement: (playerIndex: number, rummy: Rummy) => LayMove | null) {
		return implement(this.playerIndex, this.game);
	}

	putDown(
		implement: (playerIndex: number, rummy: Rummy) => PutdownMove
	): PutdownMove {
		return implement(this.playerIndex, this.game);
	}
}
