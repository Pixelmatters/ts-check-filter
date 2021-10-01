/**
 * Replace an element of an array at the given position.
 *
 * @param array
 * @param pos
 * @param newElm
 * @returns
 */
export function arrayReplacePos<T>(
  array: Array<T>,
  pos: number,
  newElm: T
): Array<T> {
  return array.map((e, index) => (index === pos ? newElm : e));
}
