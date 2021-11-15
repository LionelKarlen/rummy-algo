import { Rummy, MeldMove, LayMove } from "rummy-lib/lib";
import { Algo } from "./algo";
import { AutoAlgo } from "./autoalgo";
let rummy = new Rummy();

let algo = new Algo(rummy, 0);
let autoalgo = new AutoAlgo(algo, [0, 0, 0, 0]);

let secondalgo = new Algo(rummy, 1);
let secondautoalgo = new AutoAlgo(secondalgo, [0, 0, 0, 0]);

while (!rummy.isGameOver) {
	rummy.makeMove(rummy.players[autoalgo.algo.playerIndex], autoalgo.pickUp());
	let meld = autoalgo.meld();
	if (meld != null) {
		rummy.makeMove(
			rummy.players[autoalgo.algo.playerIndex],
			meld as unknown as MeldMove
		);
	}
	let layoff = autoalgo.layoff();
	if (layoff != null) {
		rummy.makeMove(
			rummy.players[autoalgo.algo.playerIndex],
			layoff as unknown as LayMove
		);
	}

	let putdown = autoalgo.putDown();
	rummy.makeMove(rummy.players[autoalgo.algo.playerIndex], putdown);

	rummy.makeMove(
		rummy.players[secondautoalgo.algo.playerIndex],
		secondautoalgo.pickUp()
	);
	let secondmeld = secondautoalgo.meld();
	if (secondmeld != null) {
		rummy.makeMove(
			rummy.players[secondautoalgo.algo.playerIndex],
			secondmeld as unknown as MeldMove
		);
	}
	let secondlayoff = secondautoalgo.layoff();
	if (secondlayoff != null) {
		rummy.makeMove(
			rummy.players[secondautoalgo.algo.playerIndex],
			secondlayoff as unknown as LayMove
		);
	}

	rummy.makeMove(
		rummy.players[secondautoalgo.algo.playerIndex],
		secondautoalgo.putDown()
	);

	console.log(rummy.isGameOver);
}
console.log(
	"Winner",
	rummy.players.sort((a, b) => a.score - b.score)[rummy.players.length - 1]
);
