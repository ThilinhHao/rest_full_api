import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Route, Navigate } from 'react-router-dom';

import { useAppSelector } from '@hooks/useSelector/useAppSelector';

const RenderPrivateComp = ({ children }: { children: any }) => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  return !accessToken ? (
    children
  ) : (
    <Navigate
      to={{
        pathname: '/login',
      }}
    />
  );
};

const PrivateRoute = ({ component: Component, Layout, ...rest }: { component: any; Layout: any }) => {
  return (
    <Route
      {...rest}
      element={
        <RenderPrivateComp>
          <Layout>
            <Suspense fallback={<div />}>
              <Component />
            </Suspense>
          </Layout>
        </RenderPrivateComp>
      }
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.object.isRequired,
};

export default PrivateRoute;
