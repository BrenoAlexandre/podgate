import React from 'react';
import { Routes as Switch, Route, Navigate } from 'react-router-dom';
import { Ring } from '@uiball/loaders';
import { routes } from '../routes/routes';

const Routes: React.FunctionComponent = () => {
  const renderRoutes = (): React.ReactNode =>
    routes.map((route) => <Route key={route.path} element={<route.component />} {...route} />);

  return (
    <div className='d-flex'>
      <div className='d-flex flex-column p-0 w-100'>
        <main>
          <React.Suspense
            fallback={
              <div style={{ position: 'absolute', top: '36%', left: '56%' }}>
                <Ring color='white' />
              </div>
            }
          >
            <Switch>{renderRoutes()}</Switch>
          </React.Suspense>
        </main>
      </div>
    </div>
  );
};

export default Routes;
