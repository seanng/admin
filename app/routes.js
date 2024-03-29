// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';

const errorLoading = err => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = cb => componentModule => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: '/',
      name: 'frontDesk',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/FrontDesk/reducer'),
          import('containers/FrontDesk'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, component]) => {
          injectReducer('frontDesk', reducer.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/paststays',
      name: 'pastStays',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/PastStays/reducer'),
          import('containers/PastStays'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, component]) => {
          injectReducer('pastStays', reducer.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/hotelprofile',
      name: 'hotelProfile',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/HotelProfile/reducer'),
          import('containers/HotelProfile'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, component]) => {
          injectReducer('hotelProfile', reducer.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/teammanagement',
      name: 'teamManagement',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/TeamManagement/reducer'),
          import('containers/TeamManagement'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, component]) => {
          injectReducer('teamManagement', reducer.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/settings',
      name: 'settings',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Settings/reducer'),
          import('containers/Settings'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, component]) => {
          injectReducer('settings', reducer.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
