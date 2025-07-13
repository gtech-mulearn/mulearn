import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const homeRedirect = (path: string) => {
  const redirectUrl = `${import.meta.env.VITE_HOME_MULEARN_URL}${path.replace(/^\/+/, "")}`;
  window.location.href = redirectUrl;
};

const RedirectComponent = () => {
  const params = useParams();
  const path = params['*'];

  useEffect(() => {
      homeRedirect(path || "");
  }, [path]);

  return <></>;
};

export default RedirectComponent;