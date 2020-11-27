
import React, { lazy, Suspense, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Error from '../Error';

import ApplicationContext from "../contexts/ApplicationContext";


function checkNotFound(routes) {
  return routes.some((route) => route['path'] === '*');
}

function Router() {
  const { routes, wrappers } = useContext(ApplicationContext);
  const hasNotFound = checkNotFound(routes);

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => {
          const Module = wrappers[route['wrapper']] || null;
          const Children = lazy(() => route['module']);

          return (
            <Route key={index} path={route['path']} element={(
              <Module>
                <Suspense fallback={null}>
                  <Children />
                </Suspense>
              </Module>
            )} />
          );
        })}
        { ! hasNotFound && <Route path="*" element={<Error />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
