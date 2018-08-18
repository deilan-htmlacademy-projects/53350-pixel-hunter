export function createKeydownHandler(keyCodeHandlersMap) {
  return (ev) => {
    const handler = keyCodeHandlersMap[ev.code];
    if (handler) {
      handler();
    }
  };
}
