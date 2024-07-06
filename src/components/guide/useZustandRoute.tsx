import { Route } from 'react-router-dom';
import ZustandPageInfo from '@/config/ZustandPageInfo';
import GuideSourceLayout from './GuideSourceLayout';

const useZustandRoute = () => {
  const routes = (
    <>
      {ZustandPageInfo.list.map((menuInfo, index) => {
        const { Component, path } = menuInfo;
        return <Route key={index} path={path} element={<Component menuInfo={menuInfo} />} />;
      })}
    </>
  );

  return (
    <Route path="/zustand" element={<GuideSourceLayout />}>
      {routes}
    </Route>
  );
};

export default useZustandRoute;
