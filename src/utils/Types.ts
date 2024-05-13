export type SearchParameters = {
  searchText: string;
  dietFilter: string | undefined;
  cuisineFilter: string | undefined;
  timeFilter: string | undefined;
};

export type Nutrient = {
  label: string;
  quantity: number;
  unit: string;
};
export type Ingredient = {
  text: string;
  quantity: number;
  measure: string | null;
  food: string;
  weight: number;
  foodCategory: string;
  foodId: string;
  image: string;
  checked: boolean;
};

export type TotalNutrients = {
  ENERC_KCAL: Nutrient;
  FAT: Nutrient;
  FIBTG: Nutrient;
  PROCNT: Nutrient;
};

export type Recipe = {
  label: string;
  image: string;
  source: string;
  calories: number;
  totalNutrients: TotalNutrients;
  yield: number;
  ingredients: Ingredient[];
};

export type Hits = {
  recipe: Recipe;
  _links: {
    self: {
      title: string;
      href: string;
    };
  };
};

export type CachedRecipes = {
  from: number;
  to: number;
  count: number;
  _links: Object;
  hits: Hits[];
};

export type RecipeListItemProp = {
  item: {
    recipe: {
      label: string;
      image: string;
      source: string;
      calories: number;
    };
    _links: {
      self: {
        title: string;
        href: string;
      };
    };
  };
};
