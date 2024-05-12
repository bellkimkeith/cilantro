export type SearchParameters = {
  searchText: string;
  dietFilter: string | undefined;
  cuisineFilter: string | undefined;
  timeFilter: string | undefined;
};

export interface Nutrient {
  label: string;
  quantity: number;
  unit: string;
}

export interface TotalNutrients {
  ENERC_KCAL: Nutrient;
  FAT: Nutrient;
  FIBTG: Nutrient;
  PROCNT: Nutrient;
}

export type Hits = {
  recipe: {
    label: string;
    image: string;
    source: string;
    calories: number;
    totalNutrients: TotalNutrients;
  };
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
  hits: Array<Hits>;
};
