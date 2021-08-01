import { call, put, takeEvery } from "redux-saga/effects";
let activatedSagas = false;

const baseURL = "http://localhost:8097/user";
const loginURL = "/login";

export const checkHttpErrors = (response) => {
  if (!response.ok) {
    throw response;
  }
  return response;
};

function* login(action) {
  const { payload } = action;
  yield put({ type: "LOADING", payload: true });
  const data = yield call(loginApi, payload);
  yield put({ type: "LOADING", payload: false });
  yield put({ type: "LOGIN_SUCCESS", payload: data });
}
const loginApi = (payload) =>
  fetch(`${baseURL}${loginURL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then((res) => checkHttpErrors(res))
    .then((res) => res.json())
    .then((data) => data);

export default function* rootSaga() {
  if (!activatedSagas) {
    yield takeEvery("LOGIN", login);
    activatedSagas = true;
  }
}
