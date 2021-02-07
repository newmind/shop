
import { useDispatch, useSelector } from 'react-redux';
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
        options['onMount'] && options.onMount({ useSelector, dispatch, location, params });
        setRendered(true);
        return () => {
          options['onUnmount'] && options.onUnmount({ useSelector, dispatch, location, params });
        }
      }, []);

      useEffect(function () {
        if (isRendered) {
          if (options['combineEvents']) {
            options['onMount'] && options.onMount({ useSelector, dispatch, location, params });
          }
          else {
            options['onUpdate'] && options.onUpdate({ useSelector, dispatch, location, params });
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
