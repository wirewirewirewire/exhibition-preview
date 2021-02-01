import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer, { rootSaga } from "./ducks";
import axiosInterceptors from "./components/Login/axiosInterceptors";
//import { routerMiddleware } from "connected-react-router";
//import { createBrowserHistory } from "history";
//import { createBlacklistFilter } from "redux-persist-transform-filter";
/*const saveSubsetBlacklistFilter = createBlacklistFilter("auth", [
  "error",
  "errorResponse",
]);*/

const persistConfig = {
  key: "root",
  storage,
  timeout: 500,
  whitelist: ["responses"],
};

//export const history = createBrowserHistory();
const persistedReducer = persistReducer(persistConfig, rootReducer());

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware /*, routerMiddleware(history)*/)
);
const storeEntry = createStore(persistedReducer, enhancer);
axiosInterceptors.setupInterceptors(/*storeEntry*/);
sagaMiddleware.run(rootSaga);

export const store = storeEntry;
export const persistor = persistStore(storeEntry);
