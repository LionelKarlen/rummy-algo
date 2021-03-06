import { Rummy, MeldMove, LayMove, Util } from "rummy-lib/lib";
import { Algo } from "./src/algo";
import { AutoAlgo } from "./src/autoalgo";
import { pickups } from "./src/pickup";
import { melds } from "./src/meld";
import { layoffs } from "./src/layoff";
import { putdowns } from "./src/putdown";
import { Utils } from "./src/utils";
import fs from "fs";
import { SimulationSummary, GameSummary } from "./src/summary";

const simulationRuns = 50000;
let csv="";
let entry="";
// for (let f_1 = 0; f_1 < pickups.length; f_1++) {
// 	for (let s_1 = 0; s_1 < melds.length; s_1++) {
// 		for (let t_1 = 0; t_1 < layoffs.length; t_1++) {
// 			for (let fo_1 = 0; fo_1 < putdowns.length; fo_1++) {
// 				let algoNum_1 = [f_1, s_1, t_1, fo_1];
let algoNum_1 = [2, 1, 1, 1];
// let games = [];
let games = new SimulationSummary();
// for (let f_2 = 0; f_2 < pickups.length; f_2++) {
// 	for (let s_2 = 0; s_2 < melds.length; s_2++) {
// 		for (let t_2 = 0; t_2 < layoffs.length; t_2++) {
// 			for (let fo_2 = 0; fo_2 < putdowns.length; fo_2++) {
// let algoNum_2 = [f_2, s_2, t_2, fo_2];
let algoNum_2 = [2, 1, 1, 1];
// if (algoNum_1.join("") == algoNum_2.join("")) {
// console.log("skipping");
// continue;
// }
games.addGameSummary(
	algoNum_2.join(""),
	runSimulation(algoNum_1, algoNum_2, simulationRuns)
);
// 			}
// 		}
// 	}
// }
let filename = `export/${new Date()}-${algoNum_1.join("")}`;
fs.writeFileSync(
	`${filename}.rmy`,
	JSON.stringify(games)
);
fs.writeFileSync(
	`${filename}.csv`,
	csv
)
fs.writeFileSync(
	`${filename}.entry`,
	entry
)
// 			}
// 		}
// 	}
// }

function runSimulation(
	algonum_1: number[],
	algonum_2: number[],
	iterations: number
) {
	let summary = new GameSummary();
	for (let i = 0; i < iterations; i++) {
		try {
			let rummy = new Rummy();

			let algo = new Algo(rummy, 0);
			let autoalgo = new AutoAlgo(algo, algonum_1);

			let secondalgo = new Algo(rummy, 1);

			let secondautoalgo = new AutoAlgo(secondalgo, algonum_2);
			while (!rummy.isGameOver) {
				rummy.makeMove(
					rummy.players[autoalgo.algo.playerIndex],
					autoalgo.pickUp()
				);
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
				rummy.makeMove(
					rummy.players[autoalgo.algo.playerIndex],
					putdown
				);

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
			}
			Utils.summarise(summary, rummy);
		} catch (error) {
			// console.log(error)
			summary.incrementGames();
			summary.incrementWins();
		}
		csv+=`${summary.games}, ${summary.wins}\n`;
		entry+=`${summary.games}, ${Object.keys(Utils.getMeldRegret()).length+Object.keys(Utils.getLayoffRegret()).length+Object.keys(Utils.getPutdownRegret()).length}\n`
		console.log(`game ${i} of ${simulationRuns}`);
	}
	return summary;
}
