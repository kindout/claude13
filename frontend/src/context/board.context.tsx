import React, { createContext, useMemo, useState } from "react";

type BoardUIContextValue = {
  activeBoardId: number | null;
  setActiveBoardId: (id: number | null) => void;
};

export const BoardUIContext = createContext<BoardUIContextValue | undefined>(undefined);

export function BoardUIProvider({ children }: { children: React.ReactNode }) {
  const [activeBoardId, setActiveBoardId] = useState<number | null>(null);

  const value = useMemo(
    () => ({ activeBoardId, setActiveBoardId }),
    [activeBoardId]
  );

  return <BoardUIContext.Provider value={value}>{children}</BoardUIContext.Provider>;
}
