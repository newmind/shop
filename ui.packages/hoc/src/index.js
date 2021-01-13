
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import React, { Suspense, useEffect, useState } from 'react';


export default function HOC(options) {
  return function(WrapperComponent) {
    return function Component() {
      const dispatch = useDispatch();
      const location = useLocation();
      const params = useParams();
      const [isRendered, setRendered] = useState(false);

      useEffect(() => {
        options['onMount'] && options.onMount({ dispatch, location, params });
        setRendered(true);
        return () => {
          options['onUnmount'] && options.onUnmount({ dispatch, location, params });
        }
      }, []);

      useEffect(function () {
        if (isRendered) {
          if (options['combineEvents']) {
            options['onMount'] && options.onMount({ dispatch, location, params });
          }
          else {
            options['onUpdate'] && options.onUpdate({ dispatch, location, params });
          }
        }
      }, [location])

      return (
        <Suspense fallback={<p>Loading...</p>}>
          <WrapperComponent />
        </Suspense>
      );
    }
  }
}
