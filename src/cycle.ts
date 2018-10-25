function* cycle(arr: Array<number>): any {
  if (arr.length === 0) return;

  let index = 0;

  while (true) {
    yield arr[index++ % arr.length];
  }
}

export default cycle;
