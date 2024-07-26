import { Route, Routes } from 'react-router-dom';
import AviationRouteInfo from './AviationRouteInfo';
import AviationLayout from '@/components/layout/AviationLayout';
import AviationPortal from '@/components/aviation/AviationPortal';
import OfflineSplash from '@/components/offline/OfflineSplash';
import OfflineMain from '@/components/offline/OfflineMain';

const useAviationRoute = (isNetworkOnline: boolean) => {
  const routes = (
    <>
      {AviationRouteInfo.list.map((menuInfo, index) => {
        const { Component, path } = menuInfo;
        return <Route key={index} path={path} element={<Component menuInfo={menuInfo} />} />;
      })}
    </>
  );

  if (isNetworkOnline) {
    return (
      <Route path="/aviation/offline/">
        {routes}
      </Route>
    );
  } else {
    return (
      <Route path="/aviation" element={<AviationLayout />}>
        <Route path="" index element={<AviationPortal />} />
        {routes}
      </Route>
    );
  }
};

export default useAviationRoute;
