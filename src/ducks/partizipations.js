import { createSlice } from "@reduxjs/toolkit";
import {
  crudOperations,
  editGenerator,
  selectors,
} from "helpers/crudGenerator";

const partizipations = createSlice({
  name: "partizipations",
  initialState: { data: {} },
  reducers: {
    ...crudOperations,
    createSingleSuccess: (state, action, filter) => {
      state.loadingCrud = false;
      state.error = false;
      state.data[action.payload.id] = action.payload;
      state.latestCrudUpdate = action.payload.uuid;
    },
  },
});

partizipations.selectors = selectors(partizipations);
partizipations.sagas = editGenerator({ duck: partizipations });

export default partizipations;
