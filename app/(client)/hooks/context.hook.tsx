import { useContext } from "react";
import { SearchContext } from "../contexts/search.context";
import { StoreContext } from "../contexts/store.context";
import { UserContext } from "../contexts/user.context";

export const useSearchContext = () => {
  return useContext(SearchContext);
};

export const useStoreContext = () => {
  return useContext(StoreContext);
};

export const useUserContext = () => {
  return useContext(UserContext);
};
