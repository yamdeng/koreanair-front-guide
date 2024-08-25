import { Route } from 'react-router-dom';
import OfflineRouteInfo from './OfflineRouteInfo';
import '/src/report.css';

const useOfflineRoute = () => {
  const routes = (
    <>
      {OfflineRouteInfo.list.map((menuInfo, index) => {
        const { Component, path } = menuInfo;
        return <Route key={index} path={path} element={<Component menuInfo={menuInfo} />} />;
      })}
    </>
  );
  return <Route path="/offline">{routes}</Route>;
};

export default useOfflineRoute;
