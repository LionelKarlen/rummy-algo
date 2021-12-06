export abstract class Summary {
	games: number;
	wins: number;

	constructor() {
		this.games = 0;
		this.wins = 0;
	}

	incrementGames() {
		this.games += 1;
	}
	incrementWins() {
		this.wins += 1;
	}
	draw() {
		this.wins+=0.5;
	}
}

export class GameSummary extends Summary {
	constructor() {
		super();
	}
}

export class SimulationSummary extends Summary {
	algos: Record<string, GameSummary>;
	constructor() {
		super();
		this.algos = {};
	}
	addGameSummary(algoNum: string, summary: GameSummary) {
		this.algos[algoNum] = summary;
		console.log(summary);
		this.wins += summary.wins;
		this.games += summary.games;
	}
}
