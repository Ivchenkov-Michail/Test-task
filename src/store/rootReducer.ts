import { combineReducers } from "@reduxjs/toolkit";
import filterReducer from "./filterSlice";
import postReducer from "./postSlice";

const rootReducer = combineReducers({
  filter: filterReducer,
  posts: postReducer,
});

export default rootReducer;
