let timeoutId: ReturnType<typeof setTimeout> | null = null;

const debounce = <T extends (...args: any[]) => void | Promise<void>>(
  operation: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  return (...args: Parameters<T>) => {
    if (timeoutId != null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      operation(...args);
      timeoutId = null;
    }, delay);
  };
};

export default debounce;
