import cloneDeep from "lodash/cloneDeep";
import { useEffect, useRef } from "react";

export default function usePrevious(value) {
  const prev = useRef();

  useEffect(() => {
    prev.current = cloneDeep(value);
  }, [value]);

  return prev.current;
}
