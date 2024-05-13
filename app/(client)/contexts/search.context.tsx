"use client";

import { TeacherModel } from "@/app/api/models/teacher.model";
import { FC, ReactNode, createContext, useCallback, useMemo, useState } from "react";
interface SearchContextModel {
    filteredTeachers: TeacherModel[];
  setFilteredTeachers: (communities: TeacherModel[]) => void;
  allTeachers: TeacherModel[];
  setAllTeachers: (communities: TeacherModel[]) => void;
}


export const SearchContext = createContext<SearchContextModel>({} as SearchContextModel);


type Props = {
  children: ReactNode;
};


const SearchProvider: FC<Props> = ({ children }) => {
  const [filteredTeachers, setFilteredTeachers] = useState<TeacherModel[]>([]);
  const [allTeachers, setAllTeachers] = useState<TeacherModel[]>([]);


  const setfilteredTeachers = useCallback((filteredTeachers: TeacherModel[]) => {
    setFilteredTeachers(filteredTeachers);
  }, []);


  const setTeachers = useCallback((Teachers: TeacherModel[]) => {
    setAllTeachers(Teachers);
  }, []);


  const value = useMemo(
    () => ({
      filteredTeachers: filteredTeachers,
      setFilteredTeachers: setfilteredTeachers,
      allTeachers: allTeachers,
      setAllTeachers: setTeachers,
    }),
    [allTeachers, filteredTeachers, setfilteredTeachers, setTeachers]
  );


  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};


export default SearchProvider;
