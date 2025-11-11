export function useSubmitOnEnter<T extends HTMLElement>(
  onSubmit: () => void,
  options?: { disableShift?: boolean }
) {
  return (e: React.KeyboardEvent<T>) => {
    if (e.key === "Enter" && (!options?.disableShift ? !e.shiftKey : true)) {
      e.preventDefault();
      onSubmit();
    }
  };
}
