// state.js
import { atom } from "recoil";

export const firstNameState = atom({
  key: "firstNameState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});

export const lastNameState = atom({
  key: "lastNameState",
  default: "",
});
