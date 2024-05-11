import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edamam } from "../edamam";

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
        const response = await fetch(`${Edamam.baseUrl}&q=${payload}`);
        const json = await response.json();
        return json;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });
};
