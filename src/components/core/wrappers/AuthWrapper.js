import React, { useContext, useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getUser } from 'api/auth.api';
import { actions, AuthContext } from '../../context/auth.context';

export default function AuthWrapper({
  component: Component,
  type = 'multi',
  ...rest
}) {
  const [isLoading, setIsLoading] = useState(true);
  const { state, dispatch } = useContext(AuthContext);
  useEffect(() => {
    if (state.accessToken && !state.user) {
      getUser().then(({ data }) => {
        dispatch(actions.SET_USER(data));
        dispatch(actions.SET_AUTH(true));
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [state.accessToken, state.user, dispatch]);
  const renderComponent = props => {
    if (type === 'multi') {
      return <Component {...props} />;
    }

    if (type === 'guest' && state.isAuthenticated) {
      return <Redirect to="/" />;
    }

    if (type === 'guest' && !state.isAuthenticated) {
      return <Component {...props} />;
    }

    if (!state.isAuthenticated) {
      return <Redirect to="/login" />;
    } else {
      return <Component {...props} />;
    }
  };
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Route {...rest} render={props => <>{renderComponent(props)}</>} />
      )}
    </>
  );
}
