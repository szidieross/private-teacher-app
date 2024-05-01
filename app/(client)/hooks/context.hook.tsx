import { useContext } from "react";
import { SearchContext } from "../contexts/search.context";
import { StoreContext } from "../contexts/store.context";

export const useSearchContext = () => {
  return useContext(SearchContext);
};

export const useStoreContext = () => {
  return useContext(StoreContext);
};