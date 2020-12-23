
import { Routes, Route } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';

import Error from '../Error';

import ApplicationContext from "../contexts/ApplicationContext";


function checkNotFound(routes) {
  return routes.some((route) => route['path'] === '*');
}

function Router() {
  const { routes, wrappers } = useContext(ApplicationContext);

  const hasNotFound = checkNotFound(routes);

  useEffect(() => {
    console.log('router mount')
    return () => {
      console.log('router destroy')
    }
  }, []);

  return (
    <Routes>
      {routes.map((route, index) => {
        const Wrapper = wrappers[route['wrapper']] || null;
        const Module = route['Module'];

        return (
          <Route key={index} path={route['path']} element={(
            <Wrapper>
              <Module />
            </Wrapper>
          )} />
        );
      })}
      { ! hasNotFound && <Route path="*" element={<Error />} />}
    </Routes>
  );
}

export default Router;
