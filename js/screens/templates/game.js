import {getStats} from "./stats-current";
import {getHeader} from "./header";

export function getGame(game, content, {showState} = {showState: true}) {
  return `${getHeader(game, {showState})}
  <section class="game">
    ${content}
    ${getStats(game)}
  </section>`;
}
