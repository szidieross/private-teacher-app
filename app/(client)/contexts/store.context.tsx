import { Dispatch, FC, ReactNode, SetStateAction, createContext, useState } from "react";

interface NavbarSettingsModel {
  title: ReactNode;
  visibilities: {
    search: boolean;
    aboutCommunity: ReactNode | null;
  };
  membershipRibbonUrl?: string;
}

interface StoreContextModel {
  navbarSettings: NavbarSettingsModel;
  setNavbarSettings: Dispatch<SetStateAction<NavbarSettingsModel>>;
}

const initNavbarSettings: NavbarSettingsModel = {
  title: null,
  visibilities: {
    search: false,
    aboutCommunity: null,
  },
};

export const StoreContext = createContext<StoreContextModel>({
  navbarSettings: initNavbarSettings,
  setNavbarSettings: () => {},
});

type Props = {
  children: React.ReactNode;
};

const StoreProvider: FC<Props> = ({ children }) => {
  const [navbarSettings, setNavbarSettings] = useState<NavbarSettingsModel>(initNavbarSettings);

  return (
    <StoreContext.Provider
      value={{
        navbarSettings,
        setNavbarSettings,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;