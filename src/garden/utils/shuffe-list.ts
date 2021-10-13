

export default function shuffle<T>(array: T[]): T[] {

    if (array.length <= 1) return array;

    for (let i = 0; i < array.length; i++) {
      const randomItem = randomRange(i, array.length - 1);
  ​
      // place our random choice in the spot by swapping
      [array[i], array[randomItem]] = [array[randomItem], array[i]];
    }
  ​
    return array;
  }

  function randomRange(start, end) {
      return ((Math.trunc(Math.random() * (end - start) + start)));
  }