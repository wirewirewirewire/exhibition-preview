import { combineReducers } from "redux";
import data, { dataSaga } from "./data";
import responses from "./responses";
import settings from "./settings";
import { all, fork } from "redux-saga/effects";
import devices from "./devices";
import partizipations from "./partizipations";

const rootReducer = () =>
  combineReducers({
    data: data.reducer,
    responses: responses.reducer,
    settings: settings.reducer,
    devices: devices.reducer,
    partizipations: partizipations.reducer,
  });

export default rootReducer;

export function* rootSaga() {
  yield all([fork(dataSaga), ...devices.sagas, ...partizipations.sagas]);
}
