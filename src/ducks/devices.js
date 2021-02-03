import { createSlice } from "@reduxjs/toolkit";
import {
  crudOperations,
  editGenerator,
  selectors,
} from "helpers/crudGenerator";

const devices = createSlice({
  name: "devices",
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

devices.selectors = selectors(devices);
devices.sagas = editGenerator({ duck: devices });

export default devices;
