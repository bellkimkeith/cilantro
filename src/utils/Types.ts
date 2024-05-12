export type SearchParameters = {
  searchText: string;
  dietFilter: string | undefined;
  cuisineFilter: string | undefined;
  timeFilter: string | undefined;
};

export type Hits = {
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

export type CachedRecipes = {
  from: number;
  to: number;
  count: number;
  _links: Object;
  hits: Array<Hits>;
};
