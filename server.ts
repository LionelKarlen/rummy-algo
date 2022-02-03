import express from "express";
import * as path from "path";
import { LayMove, MeldMove, Rummy } from "rummy-lib/lib";
import { Socket } from "socket.io";
import { Algo } from "./src/algo";
import { AutoAlgo } from "./src/autoalgo";

const app = express();
app.set("port", process.env.PORT || 3000);

let http = require("http").Server(app);
// set up socket.io and bind it to our
// http server.
let io = require("socket.io")(http, {
	cors: {
		origin: "http://localhost:3000",
	},
});
let paused = false;

// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
io.on("connection", function (socket: Socket) {
	console.log("a user connected");
	// whenever we receive a 'message' we log it out
	socket.on("message", function (message: any) {
		console.log(message);
	});
	socket.on("pause", () => {
		paused = !paused;
		console.log("pause");
	});
	socket.on("start", async function (message) {
		let delay = message.delay;
		let algoNum_1 = [2, 1, 1, 1];
		let algoNum_2 = [2, 1, 1, 1];
		switch (message.mode) {
			case 0:
				algoNum_1 = [2, 1, 1, 1];
				algoNum_2 = [2, 1, 1, 1];
				break;
			case 1:
				algoNum_1 = [2, 1, 1, 1];
				algoNum_2 = [2, 0, 0, 0];
				break;
			case 2:
				algoNum_1 = [2, 0, 0, 0];
				algoNum_2 = [2, 0, 0, 0];
				break;
		}
		try {
			// let algoNum_1 = [2, 1, 1, 1];
			// let algoNum_2 = [2, 1, 1, 1];
			let rummy = new Rummy();
			socket.emit("update", rummy);

			let algo = new Algo(rummy, 0);
			let autoalgo = new AutoAlgo(algo, algoNum_1);

			let secondalgo = new Algo(rummy, 1);

			let secondautoalgo = new AutoAlgo(secondalgo, algoNum_2);
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
				socket.emit("update", rummy);
				await sleep(delay * 1000);
				while (paused) {
					await sleep(1000);
				}

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
				socket.emit("update", rummy);
				await sleep(delay * 1000);
				while (paused) {
					await sleep(1000);
				}
			}
			let winner = rummy.players[0].hand.cards.length == 0 ? 0 : 1;
			socket.emit("won", winner);
		} catch (error) {
			socket.emit("error");
		}
	});
});

function sleep(millis: number) {
	return new Promise((resolve) => setTimeout(resolve, millis));
}

const server = http.listen(3001, function () {
	console.log("listening on *:3001");
});
