import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ESort {
  TITLE = "title",
  ID = "id",
  NONE = "none",
}

export enum View {
  ALL = "Всё",
  Favorite = "Избранное",
}

interface IInititalState {
  view: View;
  sortBy: ESort;
}

const initialState: IInititalState = {
  view: JSON.parse(sessionStorage.getItem("view") || `{"view": "${View.ALL}"}`),
  sortBy: JSON.parse(
    sessionStorage.getItem("sortBy") || `{"sortBy": "${ESort.NONE}"}`
  ),
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFavorite(state, action: PayloadAction<View>) {
      state.view = action.payload;
      sessionStorage.setItem("view", JSON.stringify(state.view));
    },
    setSortBy(state, action: PayloadAction<ESort>) {
      state.sortBy = action.payload;
      sessionStorage.setItem("sortBy", JSON.stringify(state.sortBy));
    },
  },
});

export const { setFavorite, setSortBy } = filterSlice.actions;
export default filterSlice.reducer;
