export const randomInt = (size: number): number => {
  return Math.floor(Math.random() * size)
}

export const mock = (x: number, y: number): number[][] => {
  return new Array(y)
    .fill(null)
    .map(e => new Array(x).fill(null).map(e => randomInt(10)))
}
