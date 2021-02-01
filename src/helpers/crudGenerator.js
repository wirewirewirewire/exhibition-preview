import Axios from "axios";

import { workerSagaRequest } from "ducks/helpers";
import { fork, takeEvery } from "redux-saga/effects";

export function editGenerator({ duck }) {
  /* Get all by organization ID */
  function* watcherAllSaga() {
    yield takeEvery(duck.actions.fetch, workerAllSaga);
  }

  function fetchAllSaga(payload) {
    return Axios({
      method: "GET",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}${duck.name}/`,
      params: {
        organizationID: payload?.organizationId,
        patientID: payload?.patientId,
      },
    });
  }

  function workerAllSaga({ payload }) {
    return workerSagaRequest(
      fetchAllSaga,
      duck.actions.fetchSuccess,
      duck.actions.fetchFailure,
      payload
    );
  }

  /* Fetch single by single ID */
  function* watcherFetchSingleSaga() {
    yield takeEvery(duck.actions.fetchSingle, workerFetchSingleSaga);
  }

  function fetchFetchSingleSaga({ postId, values }) {
    return Axios({
      method: "GET",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}${duck.name}/${postId}`,
    });
  }

  function workerFetchSingleSaga({ payload }) {
    return workerSagaRequest(
      fetchFetchSingleSaga,
      duck.actions.fetchSingleSuccess,
      duck.actions.fetchSingleFailure,
      payload
    );
  }

  /* Create single by single ID */
  function* watcherCreateSingleSaga() {
    yield takeEvery(duck.actions.createSingle, workerCreateSingleSaga);
  }

  function fetchCreateSingleSaga({ postId, values }) {
    return Axios({
      method: "POST",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}${duck.name}/`,
      data: values,
    });
  }

  function workerCreateSingleSaga({ payload }) {
    return workerSagaRequest(
      fetchCreateSingleSaga,
      duck.actions.createSingleSuccess,
      duck.actions.fetchSingleFailure,
      payload
    );
  }

  /* Edit single by single ID */
  function* watcherUpdateSingleSaga() {
    yield takeEvery(duck.actions.updateSingle, workerUpdateSingleSaga);
  }

  function fetchUpdateSingleSaga({ postId, values }) {
    return Axios({
      method: "PUT",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}${duck.name}/${postId}`,
      data: values,
      params: {
        postID: postId,
      },
    });
  }

  function workerUpdateSingleSaga({ payload }) {
    return workerSagaRequest(
      fetchUpdateSingleSaga,
      duck.actions.updateSingleSuccess,
      duck.actions.fetchSingleFailure,
      payload
    );
  }

  /* Delete single by single ID */
  function* watcherDeleteSingleSaga() {
    yield takeEvery(duck.actions.deleteSingle, workerDeleteSingleSaga);
  }

  function fetchDeleteSingleSaga({ postId, values }) {
    return Axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_SERVER_BASE_URL}${duck.name}/${postId}`,
      params: {
        postID: postId,
      },
    });
  }

  function workerDeleteSingleSaga({ payload }) {
    return workerSagaRequest(
      fetchDeleteSingleSaga,
      duck.actions.deleteSingleSuccess,
      duck.actions.fetchSingleFailure,
      payload
    );
  }

  return [
    fork(watcherFetchSingleSaga),
    fork(watcherCreateSingleSaga),
    fork(watcherUpdateSingleSaga),
    fork(watcherDeleteSingleSaga),
    fork(watcherAllSaga),
  ];
}

export const crudOperations = {
  fetch: (state, action, filter) => {
    state.loading = true;
    state.error = false;
    state.data = {};
  },
  fetchSuccess: (state, action, filter) => {
    state.loading = false;
    state.error = false;
    const data = {};
    action.payload.forEach((e) => {
      data[e.id] = e;
    });
    state.data = data;
  },
  fetchFailure: (state, action, filter) => {
    state.loading = false;
    state.error = true;
    state.data = {};
  },
  fetchSingle: (state, action, filter) => {
    state.loading = true;
    state.error = false;
  },
  fetchSingleSuccess: (state, action, filter) => {
    state.loading = false;
    state.error = false;
    state.data[action.payload.id] = action.payload;
  },
  fetchSingleFailure: (state, action, filter) => {
    state.loading = false;
    state.loadingCrud = false;
    state.error = true;
  },
  createSingle: (state, action, filter) => {
    state.loadingCrud = true;
    state.error = false;
  },
  createSingleSuccess: (state, action, filter) => {
    state.loadingCrud = false;
    state.error = false;
    state.data[action.payload.post.id] = action.payload.post;
    state.latestCrudUpdate = action.payload.post;
  },
  updateSingle: (state, action, filter) => {
    state.loadingCrud = true;
    state.error = false;
  },
  updateSingleSuccess: (state, action, filter) => {
    state.loadingCrud = false;
    state.error = false;
    state.data[action.payload.post.id] = action.payload.post;
    state.latestCrudUpdate = action.payload.post;
  },
  deleteSingle: (state, action, filter) => {
    state.loadingCrud = true;
    state.error = false;
  },
  deleteSingleSuccess: (state, action, filter) => {
    state.loadingCrud = false;
    state.error = false;
    delete state.data[action.payload.post.id];
    state.latestCrudUpdate = action.payload.post;
  },
};

export const selectors = (duck) => {
  return {
    status: (state) => state[duck.name],
    data: (state) => state[duck.name].data,
    dataArray: (state, filter) => {
      var values = Object.values(state[duck.name].data);
      return values;
    },
    dataArrayOptimized: (duckContent) => {
      var values = Object.values(duckContent);
      return values;
    },
    byId: (state, id) => state[duck.name].data[id],
  };
};
