export function createKeydownHandler(keyCodeHandlersMap) {
  return ({code}) => {
    const handler = keyCodeHandlersMap[code];
    if (handler) {
      handler();
    }
  };
}
