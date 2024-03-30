import { InvestItem } from "../invest";

interface LocalStorageUtil {
  save: (key: string, value: string) => void;
  edit: (key: string, newValue: string) => void;
  remove: (key: string) => void;
  get: (key: string) => string | null;
}

export const localStorageUtil: LocalStorageUtil = {
  // Saves a value to localStorage.
  save(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.error("Error saving to localStorage:", JSON.stringify(e));
    }
  },

  // Edits an existing value in localStorage. Technically, localStorage does not have an edit method.
  // Editing is the same as saving, as it overwrites the existing value for the given key.
  edit(key: string, newValue: string): void {
    try {
      localStorage.setItem(key, newValue);
    } catch (e) {
      console.error("Error editing localStorage:", JSON.stringify(e));
    }
  },

  // Removes an item from localStorage.
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error("Error removing from localStorage:", JSON.stringify(e));
    }
  },

  // Retrieves an item from localStorage. Returns null if the key does not exist.
  get(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.error("Error getting from localStorage:", JSON.stringify(e));
      return null;
    }
  },
};

export const INVEST_ITEMS_KEY = "investItems";
export const USER_TOTAL_INVESTMENT_KEY = "userTotalInvestment";

export const initLocalStorage = () => {
  const investItems: InvestItem[] = [
    {
      id: 1,
      title: "game 1",
      description: "Description of game 1",
      imageUrl: "https://picsum.photos/200/300?random=1",
      now: 300,
      goal: 600,
    },
    {
      id: 2,
      title: "game 2",
      description: "Description of game 2",
      imageUrl: "https://picsum.photos/200/300?random=2",
      now: 400,
      goal: 600,
    },
    {
      id: 3,
      title: "game 3",
      description: "Description of game 3",
      imageUrl: "https://picsum.photos/200/300?random=3",
      now: 500,
      goal: 600,
    },
    {
      id: 4,
      title: "game 4",
      description: "Description of game 4",
      imageUrl: "https://picsum.photos/200/300?random=4",
      now: 550,
      goal: 600,
    },
    {
      id: 5,
      title: "game 5",
      description: "Description of game 5",
      imageUrl: "https://picsum.photos/200/300?random=5",
      now: 600,
      goal: 600,
    },
    {
      id: 6,
      title: "game 6",
      description: "Description of game 5",
      imageUrl: "https://picsum.photos/200/300?random=5",
      now: 350,
      goal: 600,
    },
  ];

  const userTotalInvestment = 400;

  if (localStorageUtil.get(INVEST_ITEMS_KEY)) {
    localStorageUtil.remove(INVEST_ITEMS_KEY);
  }
  if (localStorageUtil.get(USER_TOTAL_INVESTMENT_KEY)) {
    localStorageUtil.remove(USER_TOTAL_INVESTMENT_KEY);
  }
  localStorageUtil.save(INVEST_ITEMS_KEY, JSON.stringify(investItems));
  localStorageUtil.save(
    USER_TOTAL_INVESTMENT_KEY,
    userTotalInvestment.toString()
  );
};

export const getInvestItems = (): InvestItem[] => {
  const items = localStorageUtil.get(INVEST_ITEMS_KEY);
  if (items) {
    return JSON.parse(items);
  }
  return [];
};

export const getUserTotalInvestment = (): number => {
  const totalInvestment = localStorageUtil.get(USER_TOTAL_INVESTMENT_KEY);
  if (totalInvestment) {
    return parseInt(totalInvestment);
  }
  return 0;
};
