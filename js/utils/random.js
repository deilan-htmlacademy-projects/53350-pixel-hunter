export function getRandomItem(array) {
  verifyArray(array);
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

function verifyArray(array) {
  if (!Array.isArray(array)) {
    throw new Error(`array must be an Array`);
  }

  if (array.length === 0) {
    throw new Error(`array must contain at least one item`);
  }
}
