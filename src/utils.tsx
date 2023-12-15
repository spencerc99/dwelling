export function jsxJoin(
  elements: React.ReactNode[],
  separator: React.ReactNode
) {
  return elements.reduce((acc, el, i) => {
    if (i === 0) {
      return [el];
    }
    // @ts-ignore
    return [...acc, separator, el];
  }, [] as React.ReactNode[]);
}
