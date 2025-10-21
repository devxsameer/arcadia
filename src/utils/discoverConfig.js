// src/config/discoverConfig.js
const today = new Date();
const year = today.getFullYear();
const format = (date) => date.toISOString().split('T')[0];
const subDays = (days) => {
  const d = new Date(today);
  d.setDate(today.getDate() - days);
  return d;
};

export const discoverConfigs = {
  'this-week': {
    title: 'New & Trending This Week',
    params: {
      dates: `${format(subDays(7))},${format(today)}`,
      ordering: '-metacritic',
    },
  },
  'last-30-days': {
    title: 'Top Games in the Last 30 Days',
    params: {
      dates: `${format(subDays(30))},${format(today)}`,
      ordering: '-metacritic',
    },
  },
  'top-rated': {
    title: 'Top Rated Games',
    params: {
      ordering: '-rating',
    },
  },
  // Best games of the current year
  'best-of-the-year': {
    title: `Best of ${year}`,
    params: {
      dates: `${year}-01-01,${year}-12-31`,
      ordering: '-rating',
    },
  },

  // Popular games in the current year
  'popular-in-current-year': {
    title: `Popular in ${year}`,
    params: {
      dates: `${year}-01-01,${year}-12-31`,
      ordering: '-added',
    },
  },
  'all-time-top': {
    title: 'All-Time Top 250',
    params: {
      ordering: '-rating,-added',
    },
  },
};
