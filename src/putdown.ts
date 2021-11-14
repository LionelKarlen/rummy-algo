import { PutdownMove, Rummy } from "rummy-lib/lib";

export function oldestCard(playerIndex: number, rummy: Rummy) {
  return new PutdownMove(
    rummy.players[playerIndex].hand,
    rummy.board.discard,
    rummy.players[playerIndex].hand.cards[0]
  );
}
