export const debounce = (targetFxn: () => void) => {
  let timeout: ReturnType<typeof setTimeout> ;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      targetFxn();
    }, 1000);
  };
};