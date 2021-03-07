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
  },
});

partizipations.selectors = selectors(partizipations);
partizipations.sagas = editGenerator({ duck: partizipations });

export default partizipations;
