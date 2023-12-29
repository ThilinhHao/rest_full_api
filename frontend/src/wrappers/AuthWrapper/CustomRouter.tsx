import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const CustomRoute = ({ component: Component, Layout, ...rest }: { component: any; Layout: any }) => {
  return (
    <Route
      {...rest}
      element={
        <Layout>
          <Suspense fallback={<div />}>
            <Component />
          </Suspense>
        </Layout>
      }
    />
  );
};

CustomRoute.propTypes = {
  component: PropTypes.object.isRequired,
};

export default CustomRoute;
