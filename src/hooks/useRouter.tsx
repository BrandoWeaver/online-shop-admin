import { useMemo } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ROUTE_PATH } from 'utils/route-util';

const useRouter = () => {
  const navigate = useNavigate();
  const urlParams = useParams();
  const location = useLocation();

  const query = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const goBack = () => navigate(-1);
  const goHome = () => navigate('/');

  const goTo = (routePath: string, id: string, state: any) => () => {
    let path =
      urlParams.shopId && !isNaN(+urlParams.shopId)
        ? `/${urlParams.shopId}` + routePath
        : routePath;

    if (id) {
      if (routePath.includes(':id')) {
        navigate(path.replace(':id', id), state);
      } else {
        navigate(path + '/' + id, state);
      }
    } else {
      navigate(path, state);
    }
  };

  return {
    navigate,
    urlParams,
    location,
    query,
    goHome,
    goBack,
    goTo,
  };
};

export { ROUTE_PATH };

export default useRouter;
