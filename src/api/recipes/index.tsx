import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edamam } from "../edamam";
import { SearchParameters } from "@/src/utils/Types";

// api parameter reference
// q=chicken&diet=high-protein&cuisineType=Kosher&time=30

// for get requests
export const useInitialRecipes = () => {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${Edamam.baseUrl}&dishType=Main%20course&random=true`
        );
        const json = await response.json();
        return json;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });
};

// for mutation requests
export const useRecipesByKeyword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: string) => {
      try {
        const response = await fetch(
          `${Edamam.baseUrl}&q=${payload}&random=true`
        );
        const json = await response.json();
        return json;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: async (data) => {
      queryClient.setQueryData(["recipes"], data);
    },
  });
};

export const useRecipesByKeywordWithFilter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: SearchParameters) => {
      const searchText = payload.searchText && `&q=${payload.searchText}`;
      const diet = payload.dietFilter && `&diet=${payload.dietFilter}`;
      const cuisine =
        payload.cuisineFilter && `&cuisineType=${payload.cuisineFilter}`;
      const time = payload.timeFilter && `&time=${payload.timeFilter}`;
      const parameters = `${searchText !== undefined ? searchText : ""}${
        diet !== undefined ? diet : ""
      }${cuisine !== undefined ? cuisine : ""}${time === 0 ? "" : time}`;

      try {
        const response = await fetch(
          `${Edamam.baseUrl}&random=true${parameters}`
        );
        const json = await response.json();
        return json;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: async (data) => {
      queryClient.setQueryData(["recipes"], data);
    },
  });
};
