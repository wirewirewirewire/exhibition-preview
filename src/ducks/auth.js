import { createSlice } from "@reduxjs/toolkit";
import { put, call, takeEvery } from "redux-saga/effects";
import Axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// reducer with initial state
const initialState = {
  data: undefined,
  responses: [],
  fetching: false,
  error: null,
};

const auth = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    fetch(state) {
      state.loading = true;
      state.error = false;
    },
    fetchSuccess(state, action) {
      state.data = action.payload;
      state.loading = false;
    },
    fetchFailure(state, action) {
      state.error = action.payload;
      state.data = undefined;
      state.loading = false;
    },
  },
});

export const getData = (state) => {
  return state.data.data;
};

export function* dataSaga() {
  yield takeEvery(data.actions.fetch, workerSaga);
}

function fetchSaga({ search }) {
  return Axios({
    method: "POST",
    url: `${process.env.REACT_APP_SERVER_BASE_URL}${duck.name}/`,
  });
}

function* workerSaga({ payload }) {
  try {
    const response = yield call(fetchSaga, { search: payload });
    yield put(data.actions.fetchSuccess(response.data));
  } catch (error) {
    yield put(data.actions.fetchFailure(error));
  }
}

export default data;
