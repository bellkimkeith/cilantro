import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { SearchParameters } from "../utils/Types";

type SearchFilterData = {
  parameters: SearchParameters;
  updateParameters: (newParams: SearchParameters) => void;
  filtersCount: number;
};

const SearchFilterContext = createContext<SearchFilterData>({
  parameters: {
    searchText: "",
    dietFilter: "",
    cuisineFilter: "",
    timeFilter: "",
  },
  updateParameters: () => {},
  filtersCount: 0,
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
  const filtersCount = useMemo(() => {
    let count = Object.values(parameters).filter((item) => item !== "").length;
    return count;
  }, [parameters]);

  const updateParameters = (newParams: SearchParameters) => {
    setParameters(newParams);
  };

  return (
    <SearchFilterContext.Provider
      value={{ parameters, updateParameters, filtersCount }}
    >
      {children}
    </SearchFilterContext.Provider>
  );
}

export const useParams = () => useContext(SearchFilterContext);
