import HttpUtil from 'utils/http-util';
import { ROUTE_API } from 'utils/route-util';

const AUTH = {
  login: async (data: IAuth.ILoginReq) => {
    const res = await HttpUtil.post<IAuth.ILoginRes>(ROUTE_API.login, {
      type: 'seller',
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      grant_type: process.env.REACT_APP_GRANT_TYPE,
      debug: process.env.REACT_APP_STAGE === 'dev',
      ...data,
    });
    return res.data;
  },

  getSellerInfo: async (shopId?: number) => {
    const res = await HttpUtil.get<IAuth.ISellerInfo>(ROUTE_API.getSellerInfo, {
      params: { shopId },
    });
    return res.data;
  },

  // getUserProfile: async () => {
  //   const res = await HttpUtil.get<IAuth.IUserInfo>(ROUTE_API.getAuthInfo);
  //   return res.data;
  // },
};

export default AUTH;
