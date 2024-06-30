import { Route } from 'react-router-dom';
import RouterPageInfo from '@/config/RouterPageInfo';
import GuideSourceLayout from './GuideSourceLayout';

const useRouterRoute = () => {
  const routes = (
    <>
      {RouterPageInfo.list.map((menuInfo, index) => {
        const { Component, path } = menuInfo;
        return <Route key={index} path={path} element={<Component menuInfo={menuInfo} />} />;
      })}
    </>
  );

  return (
    <Route path="/router" element={<GuideSourceLayout />}>
      {routes}
    </Route>
  );
};

export default useRouterRoute;
