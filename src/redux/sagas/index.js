import { all } from "redux-saga/effects";

import DashboardSaga from "./DashboardSaga";

export function* sagas() {
  yield all([DashboardSaga]);
}
