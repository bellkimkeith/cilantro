import { PropsWithChildren, createContext, useContext, useState } from "react";
import { SearchParameters } from "../utils/Types";

type SearchFilterData = {
  parameters: SearchParameters;
  updateParameters: (newParams: SearchParameters) => void;
};

const SearchFilterContext = createContext<SearchFilterData>({
  parameters: {
    searchText: "",
    dietFilter: "",
    cuisineFilter: "",
    timeFilter: "",
  },
  updateParameters: () => {},
});

export default function SearchFilterContextProvider({
  children,
}: PropsWithChildren) {
  const [parameters, setParameters] = useState<SearchParameters>({
    searchText: "",
    dietFilter: "",
    cuisineFilter: "",
    timeFilter: "",
  });

  const updateParameters = (newParams: SearchParameters) => {
    setParameters(newParams);
  };

  return (
    <SearchFilterContext.Provider value={{ parameters, updateParameters }}>
      {children}
    </SearchFilterContext.Provider>
  );
}

export const useParams = () => useContext(SearchFilterContext);
