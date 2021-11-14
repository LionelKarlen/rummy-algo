import { Rummy } from "rummy-lib/lib";
import { Algo } from './src/algo';
import { onlyStockPickup } from './src/pickup';

let rummy = new Rummy();

let algo = new Algo(rummy, 0);

rummy.makeMove(rummy.players[algo.playerIndex],algo.pickUp(()=>onlyStockPickup(algo.playerIndex,rummy)));
