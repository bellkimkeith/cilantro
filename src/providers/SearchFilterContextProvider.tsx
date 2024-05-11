import { PropsWithChildren, createContext, useContext, useState } from "react";

type SearchParameters = {
  searchText: string | null;
  dietFilter: string | null;
  cuisineFilter: string | null;
  timeFilter: number | null;
};

type SearchFilterData = {
  parameters: SearchParameters | null;
  updateParameters: (newParams: SearchParameters) => void;
};

const SearchFilterContext = createContext<SearchFilterData>({
  parameters: {
    searchText: null,
    dietFilter: null,
    cuisineFilter: null,
    timeFilter: null,
  },
  updateParameters: () => {},
});

export default function SearchFilterContextProvider({
  children,
}: PropsWithChildren) {
  const [parameters, setParameters] = useState<SearchParameters | null>(null);

  const updateParameters = (newParams: SearchParameters) => {
    setParameters(newParams);
  };

  return (
    <SearchFilterContext.Provider value={{ parameters, updateParameters }}>
      {children}
    </SearchFilterContext.Provider>
  );
}

export const useAuth = () => useContext(SearchFilterContext);
