import { Route, Routes } from 'react-router-dom';
import AviationRouteInfo from './AviationRouteInfo';
import AviationLayout from '@/components/layout/AviationLayout';
import AviationPortal from '@/components/aviation/AviationPortal';

const useAviationRoute = (isNetworkOnline: boolean) => {
  const routes = (
    <>
      {AviationRouteInfo.list.map((menuInfo, index) => {
        const { Component, path } = menuInfo;
        return <Route key={index} path={path} element={<Component menuInfo={menuInfo} />} />;
      })}
    </>
  );

  //MARK: offline으로 가정하고 진행
  if (isNetworkOnline) {
    return (
      <Route path="/aviation">
        <Route path="" index element={<div>{isNetworkOnline ? 'Y' : 'N'}</div>} />
        {routes}
      </Route>
    );
  } else {
    return (
      <Route path="/aviation" element={<AviationLayout />}>
        <Route path="" index element={<div>{isNetworkOnline ? 'Y' : 'N'}</div>} />
        <Route path="" index element={<AviationPortal />} />
        {routes}
      </Route>
    );
  }

};

export default useAviationRoute;
