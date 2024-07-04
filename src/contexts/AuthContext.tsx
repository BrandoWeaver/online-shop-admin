import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  getPersistedState,
  getPersistedStateSession,
  persistState,
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
  authState: IAuthState;
  setAuthState: React.Dispatch<React.SetStateAction<IAuthState>>;
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
    local?.rememberMe ? local : session,
  );
  // console.log("sellerInfo:", sellerInfo);

  //Version
  useEffect(() => {
    const vers = getPersistedState(
      `${process.env.REACT_APP_PERSIST_AUTH}-version`,
    );
    if (vers !== process.env.REACT_APP_PERSIST_VER) {
      localStorage.clear();
      sessionStorage.clear();
      setAuthState({ authed: false });
      persistState(
        `${process.env.REACT_APP_PERSIST_AUTH}-version`,
        process.env.REACT_APP_PERSIST_VER || '',
      );
    }
  }, []);

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
            authState,
          );
        authState.rememberMe &&
          persistState(process.env.REACT_APP_PERSIST_AUTH || '', authState);
      }
    } else initMount.current = false;
  }, [authState]);

  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
