import Axios from "axios";
import { getPersistedState, getPersistedStateSession } from "./persist-util";
import { ROUTE_API } from "./route-util";

const HttpUtil = Axios.create({
  baseURL: ROUTE_API.root,
});

HttpUtil.interceptors.request.use(async (config) => {
  const persistedState: IAuth.ILoginRes =
    getPersistedState(process.env.REACT_APP_PERSIST_AUTH) ||
    getPersistedStateSession(process.env.REACT_APP_PERSIST_AUTH) ||
    {};

  config.headers.Authorization = persistedState.access_token
    ? `Bearer ${persistedState?.access_token}`
    : "";

  config.headers.Accept = "*/*";
  return config;
});

HttpUtil.interceptors.response.use(
  function (res) {
    if (res?.data?.error) {
      return Promise.reject(res.data);
    }
    return res;
  },
  function (err) {
    const res = err.response;
    console.log("Res:", res);
    if (res) {
      if (res?.status === 401) {
        localStorage.clear();
        alert(res?.data?.error);
        window?.location?.reload();
      }
      return Promise.reject(res.data);
    } else {
      return Promise.reject(err);
    }
  }
);

export default HttpUtil;
