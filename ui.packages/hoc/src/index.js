
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import React, { Suspense, useEffect, useState } from 'react';


export default function HOC(options) {
  return function(WrapperComponent) {
    return function Component() {
      const dispatch = useDispatch();
      const location = useLocation();
      const [isRendered, setRendered] = useState(false);

      useEffect(() => {
        options['onMount'] && options.onMount({ dispatch, location });
        setRendered(true);
        return () => {
          options['onUnmount'] && options.onUnmount({ dispatch, location });
        }
      }, []);

      useEffect(function () {
        if (isRendered) {
          if (options['combineEvents']) {
            options['onMount'] && options.onMount({ dispatch, location });
          }
          else {
            options['onUpdate'] && options.onUpdate({ dispatch, location });
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
