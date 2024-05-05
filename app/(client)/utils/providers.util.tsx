"use client";

import { ReactNode, FC } from "react";
import SearchProvider from "../contexts/search.context";
import StoreProvider from "../contexts/store.context";
import UserProvider from "../contexts/user.context";

type Props = {
  children: ReactNode;
};

const Providers: FC<Props> = ({ children }) => {
  return (
    <UserProvider>
      <StoreProvider>
        <SearchProvider> {children}</SearchProvider>
      </StoreProvider>
    </UserProvider>
  );
};

export default Providers;
