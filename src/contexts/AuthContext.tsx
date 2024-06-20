import { useRequest } from 'ahooks';
import AUTH from 'api/Auth';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from 'react';
import {
  persistState,
  getPersistedState,
  getPersistedStateSession,
  persistStateSession,
} from 'utils/persist-util';

interface IAuthState {
  authed: boolean;
  rememberMe?: boolean;
  access_token?: string;
  token_type?: string;
  selectedShopId?: number;
}

const AuthContextInitValues = {
  authState: { authed: false },
  setAuthState: () => {},
  setSellerInfo: () => {},
  loadingSellerInfo: false,
};

interface IAuthContext {
  loadingSellerInfo: boolean;
  selectedShop?: IAuth.Shop;
  authState: IAuthState;
  setAuthState: React.Dispatch<React.SetStateAction<IAuthState>>;
  sellerInfo?: IAuth.ISellerInfo;
  setSellerInfo: (
    data?:
      | IAuth.ISellerInfo
      | ((
          oldData?: IAuth.ISellerInfo | undefined
        ) => IAuth.ISellerInfo | undefined)
      | undefined
  ) => void;
}

export const AuthContext = createContext<IAuthContext>(AuthContextInitValues);

export function AuthWrapper({ children }: { children: ReactNode }) {
  const initMount = useRef(true);

  const local: IAuthState =
    getPersistedState(process.env.REACT_APP_PERSIST_AUTH) ||
    AuthContextInitValues.authState;
  const session: IAuthState =
    getPersistedStateSession(process.env.REACT_APP_PERSIST_AUTH) ||
    AuthContextInitValues.authState;

  const [authState, setAuthState] = useState<IAuthState>(
    local?.rememberMe ? local : session
  );

  let selectedShop: IAuth.Shop | undefined;

  const {
    data: sellerInfo,
    mutate: setSellerInfo,
    loading: loadingSellerInfo,
  } = useRequest(AUTH.getSellerInfo, {
    ready: authState.authed,
    refreshDeps: [authState.access_token],
  });

  selectedShop = sellerInfo?.shops.find(
    (sh) => sh.id === authState.selectedShopId
  );

  // console.log("sellerInfo:", sellerInfo);

  //Version
  useEffect(() => {
    const vers = getPersistedState(
      `${process.env.REACT_APP_PERSIST_AUTH}-version`
    );
    if (vers !== process.env.REACT_APP_PERSIST_VER) {
      localStorage.clear();
      sessionStorage.clear();
      setAuthState({ authed: false });
      persistState(
        `${process.env.REACT_APP_PERSIST_AUTH}-version`,
        process.env.REACT_APP_PERSIST_VER || ''
      );
    }
  }, []);

  useEffect(() => {
    if (!initMount.current) {
      const isSelectedShop =
        authState?.selectedShopId &&
        sellerInfo?.shops.find((shop) => shop.id === authState?.selectedShopId);
      if (!isSelectedShop) {
        setAuthState({
          ...authState,
          selectedShopId: sellerInfo?.shops[0]?.id,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sellerInfo]);

  useEffect(() => {
    if (!initMount.current) {
      if (!authState.authed) {
        !authState.rememberMe &&
          sessionStorage.removeItem(process.env.REACT_APP_PERSIST_AUTH || '');
        authState.rememberMe &&
          localStorage.removeItem(process.env.REACT_APP_PERSIST_AUTH || '');
      } else {
        !authState.rememberMe &&
          persistStateSession(
            process.env.REACT_APP_PERSIST_AUTH || '',
            authState
          );
        authState.rememberMe &&
          persistState(process.env.REACT_APP_PERSIST_AUTH || '', authState);
      }
    } else initMount.current = false;
  }, [authState]);

  return (
    <AuthContext.Provider
      value={{
        loadingSellerInfo,
        selectedShop,
        authState,
        setAuthState,
        sellerInfo,
        setSellerInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
