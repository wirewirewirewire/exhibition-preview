import { call, put } from "redux-saga/effects";

export function createDuck(state, action, filter) {
  state.data[action.payload.id] = {
    id: action.payload.id,
    ...action.payload.values,
  };

  if (filter)
    Object.entries(filter).forEach((element) => {
      state.data[action.payload.id][element[0]] = element[1];
    });
}

export function editDuck(state, action, filter) {
  const { id, ...payload } = action.payload;
  const entry = state.data[id];

  state.data[id] = {
    id: id,
    points: entry && entry.points ? entry.points : {},
    kind: entry ? entry.kind : undefined,
    userImage: entry ? entry.userImage : undefined,
    ...payload,
  };

  if (filter && entry)
    filter.forEach((element) => {
      state.data[id][element] = entry[element];
    });
}

export function deleteDuck(state, action) {
  delete state.data[action.payload];
}

export function editMetaDuck(state, action) {
  const { patientA, ...payload } = action.payload;
  const patient = action.payload.patient
    ? action.payload.patient
    : state.currentPatient;

  state.data[patient] = {
    ...state.data[patient],
    ...payload,
  };
  return state;
}

export function fetchSagaInitialize(state, action, filter) {
  state.loading = true;
  state.error = false;
  state.data = [];
}

export function fetchSingleFailure(state, action, filter) {
  state.loading = false;
  state.loadingCrud = false;
  state.error = true;
  state.data = [];
}

export function fetchSingleSuccess(state, action, filter) {
  state.loading = false;
  state.loadingCrud = false;
  state.error = true;
  state.data = [];
}

export function fetchSagaFailure(state, action, filter) {
  state.loading = false;
  state.loadingCrud = false;
  state.error = true;
  state.data = [];
}

export function updateSagaInitialize(state, action, filter) {
  state.loadingCrud = true;
  state.error = false;
  state.data = [];
}

export function* workerSagaRequest(fetchSaga, success, failure, payload) {
  try {
    const response = yield call(fetchSaga, payload);
    const data = response.data;
    yield put(success(data));
  } catch (error) {
    console.log(error);
    yield put(failure(error));
  }
}
