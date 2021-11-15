import { LayMove, MeldMove, Rummy } from "rummy-lib/lib";
import { Algo } from "./algo";
import { pickups } from "./pickup";
import { melds } from "./meld";
import { layoffs } from "./layoff";
import { putdowns } from "./putdown";

export class AutoAlgo {
	algo: Algo;
	algoNum: number[];

	constructor(algo: Algo, algoNum: number[]) {
		this.algo = algo;
		this.algoNum = algoNum;
	}

	pickUp() {
		return this.algo.pickUp(() =>
			pickups[this.algoNum[0]](this.algo.playerIndex, this.algo.game)
		);
	}

	meld(): MeldMove | null {
		return this.algo.meld(() =>
			melds[this.algoNum[1]](this.algo.playerIndex, this.algo.game)
		);
	}

	layoff(): LayMove | null {
		return this.algo.layOff(() =>
			layoffs[this.algoNum[2]](this.algo.playerIndex, this.algo.game)
		);
	}

	putDown() {
		return this.algo.putDown(() =>
			putdowns[this.algoNum[3]](this.algo.playerIndex, this.algo.game)
		);
	}
}
