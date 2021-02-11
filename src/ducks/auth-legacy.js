import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";

export const REQUEST = "schoolconnect/auth/REQUEST_LOGIN";
export const SUCCESS = "schoolconnect/auth/SUCCESS_LOGIN";
export const FAILURE = "schoolconnect/auth/FAILURE_LOGIN";

const initialState = {
  currentUser: undefined,
  error: null,
  errorResponse: null,
  fetching: false,
  token: undefined,
  is_active: undefined,
  isCIAM: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST:
      return { ...state, fetching: true, error: null };
    case SUCCESS:
      return {
        ...state,
        currentUser: action.data.user,
        token: action.data.token,
        fetching: false,
      };
    case FAILURE:
      return {
        ...state,
        fetching: false,
        token: undefined,
        currentUser: undefined,
        error: action.error,
        errorResponse: action.error.response,
      };
    case "LOGOUT":
      if (state.isCIAM) {
        window.open(
          `${process.env.REACT_APP_CIAM_LOGOUT_URL}?id_token_hint=${state.token}&post_logout_redirect_uri=${process.env.REACT_APP_CIAM_REDIRECT_URL}`,
          "_self"
        );
      }
      return initialState;

    default:
      return state;
  }
}

export const requestLogin = (data) => ({
  type: REQUEST,
  data,
});

export const getAuthErrorResponse = (state) => state.auth.errorResponse;
export const getAuth = (state) => state.auth;
export const getToken = (state) => state.auth.token;
export const getCurrentUser = (state) => state.auth.currentUser;
export const getLoginState = (state) => {
  return {
    fetching: state.auth.fetching,
    error: state.auth.error,
    errorResponse: state.auth.errorResponse,
  };
};
export const getIsActive = (state) => state.auth.is_active;

export function* loginSaga() {
  yield takeEvery(REQUEST, workerSaga);
}

function fetchSaga({ data }) {
  const url = `${process.env.REACT_APP_API_URL}/auth/login/`;
  return axios({
    method: "POST",
    url: url,
    data: data,
  });
}

function* workerSaga(data) {
  var response;
  try {
    response = yield call(fetchSaga, data);
    yield put({ type: SUCCESS, data: response.data });
  } catch (error) {
    yield put({ type: FAILURE, error });
  }
}
