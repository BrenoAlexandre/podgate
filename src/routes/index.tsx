import React from 'react';
import { Routes as Switch, Route, Navigate } from 'react-router-dom';
import { routes } from '../routes/routes';

import Loader from '../components/Loader';

const Routes: React.FunctionComponent = () => {
  const renderRoutes = (): React.ReactNode =>
    routes.map((route) => <Route key={route.path} element={<route.component />} {...route} />);

  return (
    <div className='d-flex'>
      <div className='d-flex flex-column p-0 w-100'>
        <main>
          <React.Suspense fallback={<Loader />}>
            <Switch>{renderRoutes()}</Switch>
          </React.Suspense>
        </main>
      </div>
    </div>
  );
};

export default Routes;
