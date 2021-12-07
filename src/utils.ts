import fs from "fs";
import { Card, Rummy } from "rummy-lib/lib";
import { isFunctionDeclaration } from "typescript";
import { AutoAlgo } from "./autoalgo";
import { GameSummary } from "./summary";
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
		// console.log(string);
		// fs.writeFileSync(
		// 	`export/${date}-${algoString_1}-${algoString_2}.rmy`,
		// 	string
		// );
		return string;
	}

	static summarise(summary: GameSummary, rummy: Rummy) {
		summary.incrementGames();
		let copy = rummy.players;
		if (
			rummy.players[0].hand.cards.length == 0
		) {
			summary.incrementWins();
		}
	}

	static calculateRegret(playedScore: number, mockScore: number) {
		return Math.abs(mockScore-playedScore);
	}

	static getMeldRegret() {
		let s = JSON.parse(fs.readFileSync("res/meld.json").toString()) as unknown as Record<string, number>;
		return s
	}

	static getLayoffRegret() {
		let s = JSON.parse(fs.readFileSync("res/layoff.json").toString()) as unknown as Record<string, number>;
		return s
	}
	static getPutdownRegret() {
		let s = JSON.parse(fs.readFileSync("res/putdown.json").toString()) as unknown as Record<string, number>;
		return s
	}

	static uniqueID(cards: Card[]) {
		let s ="";
		for (const iterator of cards) {
			s+=iterator.rank.toString()
			s+="-"
		}
		return s.slice(0,s.length-1);
	}
}
