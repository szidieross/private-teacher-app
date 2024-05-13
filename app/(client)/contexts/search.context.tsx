"use client";

import { TeacherModel } from "@/app/api/models/teacher.model";
import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
interface SearchContextModel {
  filteredTeachers: TeacherModel[];
  setFilteredTeachers: (communities: TeacherModel[]) => void;
}

export const SearchContext = createContext<SearchContextModel>(
  {} as SearchContextModel
);

type Props = {
  children: ReactNode;
};

const SearchProvider: FC<Props> = ({ children }) => {
  const [filteredTeachers, setFilteredTeachers] = useState<TeacherModel[]>([]);

  const setfilteredTeachers = useCallback(
    (filteredTeachers: TeacherModel[]) => {
      setFilteredTeachers(filteredTeachers);
    },
    []
  );

  useEffect(() => {
    console.log("lefut");
  }, [setfilteredTeachers]);

  const value = useMemo(
    () => ({
      filteredTeachers: filteredTeachers,
      setFilteredTeachers: setfilteredTeachers,
    }),
    [filteredTeachers, setfilteredTeachers]
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export default SearchProvider;
