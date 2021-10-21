import { createSlice } from "@reduxjs/toolkit";
import { put, call, takeEvery } from "redux-saga/effects";
import Axios from "axios";

// reducer with initial state
const initialState = {
  data: {},
  fetching: false,
  error: null,
};

const responses = createSlice({
  name: "responses",
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
      //state.data = undefined;
      state.loading = false;
    },
    saveResponse(state, action) {
      state.data[action.payload.uuid] = action.payload;
    },
    updateResponse(state, action) {
      state.data[action.payload.uuid].uploaded = true;
    },
  },
});

export const getResponses = (state) => {
  return state.responses?.data;
};
export const getResponesData = (state) => {
  return state.responses?.data;
};

export const getResponseById = (state, id) => {
  return state.responses.data[id];
};

export const getResponsesArray = (state, filter) => {
  return Object.entries(state.responses.data).map((e) => {
    return { uuid: e[0], ...e[1] };
  });
};

export function* dataSaga() {
  yield takeEvery(responses.actions.fetch, workerSaga);
}

function fetchSaga({ search }) {
  return Axios({
    method: "GET",
    url: `${process.env.REACT_APP_DATA_URL}`,
  });
}

function* workerSaga({ payload }) {
  try {
    const response = yield call(fetchSaga, { search: payload });
    yield put(responses.actions.fetchSuccess(response.data));
  } catch (error) {
    yield put(responses.actions.fetchFailure(error));
  }
}

export default responses;
