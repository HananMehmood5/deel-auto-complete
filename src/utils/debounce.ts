const debounce = <T extends (...args: any[]) => void>(
  operation: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  console.log("xx debounce");
  return (...args: Parameters<T>) => {
    console.log("xx debounce return");
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      console.log("xx debounce return opera");
      operation(...args);
      timeoutId = null;
    }, delay);
  };
};

export default debounce;