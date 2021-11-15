import fs from "fs";
import { Rummy } from "rummy-lib/lib";
import { AutoAlgo } from "./autoalgo";
export class Utils {
	static summariseGame(
		autoAlgo_1: AutoAlgo,
		autoAlgo_2: AutoAlgo,
		rummy: Rummy
	) {
		let algoString_1 = autoAlgo_1.algoNum.join("");
		let algoString_2 = autoAlgo_2.algoNum.join("");
		let date = Date.now();
		let string = `
SUMMARY OF GAME
===============
FINISHED: ${date}
FIRST: ${algoString_1} ${rummy.players[autoAlgo_1.algo.playerIndex].score}
SECOND: ${algoString_2} ${rummy.players[autoAlgo_2.algo.playerIndex].score}
WINNER: ${rummy.players.indexOf(
			rummy.players.sort(
				(a, b) => a.hand.cards.length - b.hand.cards.length
			)[0]
		)}
===============`;
		console.log(string);
		// fs.writeFileSync(
		// 	`export/${date}-${algoString_1}-${algoString_2}.rmy`,
		// 	string
		// );
		return string;
	}
}
