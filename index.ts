import { Rummy, Meld, MeldMove, LayMove } from "rummy-lib/lib";
import { Algo } from "./src/algo";
import { onlyStockPickup } from "./src/pickup";
import { minimumPossibleMeld } from "./src/meld";
import { minimalPossibleLayoff } from "./src/layoff";
import { oldestCard } from "./src/putdown";

let rummy = new Rummy();

let algo = new Algo(rummy, 0);

while (!rummy.isGameOver) {
	rummy.makeMove(
		rummy.players[algo.playerIndex],
		algo.pickUp(() => onlyStockPickup(algo.playerIndex, rummy))
	);
	let meld = minimumPossibleMeld(algo.playerIndex, rummy);
	if (meld != null) {
		rummy.makeMove(
			rummy.players[algo.playerIndex],
			algo.meld(() => meld as unknown as MeldMove)
		);
	}
	let layoff = minimalPossibleLayoff(algo.playerIndex, rummy);
	if (layoff != null) {
		rummy.makeMove(
			rummy.players[algo.playerIndex],
			algo.layOff(() => layoff as unknown as LayMove)
		);
	}

	let putdown = oldestCard(algo.playerIndex, rummy);
	rummy.makeMove(
		rummy.players[algo.playerIndex],
		algo.putDown(() => putdown)
	);
}
