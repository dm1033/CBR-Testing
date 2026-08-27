import { useEffect, useState } from "react";
import { useTests } from "./store";

export function useHydrated() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const unsub = useTests.persist.onFinishHydration(() => setOk(true));
    if (useTests.persist.hasHydrated()) setOk(true);
    return unsub;
  }, []);
  return ok;
}
