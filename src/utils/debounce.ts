let timeoutId: ReturnType<typeof setTimeout> | null = null;

const debounce = <T extends (...args: any[]) => void>(
  operation: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      operation(...args);
      timeoutId = null;
    }, delay);
  };
};

export default debounce;