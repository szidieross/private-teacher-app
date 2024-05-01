"use client";

import { ReactNode, FC } from "react";
import SearchProvider from "../contexts/search.context";
import StoreProvider from "../contexts/store.context";

type Props = {
  children: ReactNode;
};

const Providers: FC<Props> = ({ children }) => {
  return (
    <StoreProvider>
      <SearchProvider> {children}</SearchProvider>
    </StoreProvider>
  );
};

export default Providers;
