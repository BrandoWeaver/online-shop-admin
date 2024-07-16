import HttpUtil from 'utils/http-util';
import { ROUTE_API } from 'utils/route-util';

const AUTH = {
  login: async (data: { username: string; password: string }) => {
    const res = await HttpUtil.post<IAuth.ILoginRes>(ROUTE_API.login, data);
    console.log('res', res);
    return res.data;
  },
};

export default AUTH;
