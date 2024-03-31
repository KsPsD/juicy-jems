import { InvestItem } from "../invest";

interface LocalStorageUtil {
  save: (key: string, value: string) => void;
  edit: (key: string, newValue: string) => void;
  remove: (key: string) => void;
  get: (key: string) => any;
  editInvestItems: (newValue: InvestItem) => void;
}

export const localStorageUtil: LocalStorageUtil = {
  save(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
      console.log(key, value);
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

  editInvestItems(newValue: InvestItem): void {
    try {
      const items = localStorageUtil.get(INVEST_ITEMS_KEY);
      if (items) {
        const investItems = JSON.parse(items);
        const newItems = investItems.map((item: InvestItem) => {
          if (item.id === newValue.id) {
            return { ...item, now: newValue.now };
          }
          return item;
        });
        console.log(newItems);
        console.log(INVEST_ITEMS_KEY);
        localStorageUtil.save(INVEST_ITEMS_KEY, JSON.stringify(newItems));
      }
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
  get(key: string): any {
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
      title: "War Craft",
      description: "Description of game 1",
      imageUrl: "/world.png",
      now: 300,
      goal: 600,
    },
    {
      id: 2,
      title: "The Greatest Warrior",
      description: "Description of game 2",
      imageUrl: "/warrior.png",
      now: 400,
      goal: 600,
    },
    {
      id: 3,
      title: "Magician",
      description: "Description of game 3",
      imageUrl: "/magician.png",
      now: 500,
      goal: 600,
    },
    {
      id: 4,
      title: "Dragon razor",
      description: "Description of game 4",
      imageUrl: "dragon.png",
      now: 550,
      goal: 600,
    },
    {
      id: 5,
      title: "Sold Out",
      description: "Description of game 5",
      imageUrl: "https://picsum.photos/200/300?random=5",
      now: 600,
      goal: 600,
    },
    {
      id: 6,
      title: "NEOPIN",
      description: "Description of game 5",
      imageUrl: "castle.png",
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
