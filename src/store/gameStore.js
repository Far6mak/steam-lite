import { create } from "zustand";
import { games as initialGames } from "../data/games";

export const useGameStore = create((set, get) => ({
  // 🎮 все игры
  games: initialGames,

  // 📚 библиотека пользователя
  library: [],

  // 🔎 поиск
  searchQuery: "",

  // 🎯 фильтр жанра
  genreFilter: "All",

  // ➕ добавить в библиотеку
  addToLibrary: (game) => {
    const { library } = get();

    const exists = library.find((g) => g.id === game.id);
    if (exists) return;

    set({ library: [...library, game] });
  },

  // ❌ удалить из библиотеки
  removeFromLibrary: (id) => {
    set({
      library: get().library.filter((g) => g.id !== id),
    });
  },

  // 🔎 установить поиск
  setSearchQuery: (value) => {
    set({ searchQuery: value });
  },

  // 🎯 установить фильтр жанра
  setGenreFilter: (value) => {
    set({ genreFilter: value });
  },

  sortType: "none",
  setSortType: (value) => set({ sortType: value }),
}));