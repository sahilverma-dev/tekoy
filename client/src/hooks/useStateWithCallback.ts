import { useState, useRef, useEffect, useCallback } from "react";

export const useStateWithCallback = <T>(
  initialState: T
): [
  T,
  (newState: T | ((prevState: T) => T), cb?: (newState: T) => void) => void
] => {
  const [state, setState] = useState<T>(initialState);
  const cbRef = useRef<((newState: T) => void) | null>(null);

  const updateState = useCallback(
    (newState: T | ((prevState: T) => T), cb?: (newState: T) => void) => {
      if (cb) {
        cbRef.current = cb;
      } else {
        cbRef.current = null;
      }

      setState((prev: T) =>
        typeof newState === "function"
          ? (newState as (prevState: T) => T)(prev)
          : newState
      );
    },
    []
  );

  useEffect(() => {
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null;
    }
  }, [state]);

  return [state, updateState];
};
