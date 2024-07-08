import { Route } from 'react-router-dom';
import CommonComponentPageInfo from '@/config/CommonComponentPageInfo';
import GuideSourceLayout from './GuideSourceLayout';

const useCommonComponentRoute = () => {
  const routes = (
    <>
      {CommonComponentPageInfo.list.map((menuInfo, index) => {
        const { Component, path } = menuInfo;
        return <Route key={index} path={path} element={<Component menuInfo={menuInfo} />} />;
      })}
    </>
  );

  return (
    <Route path="/component" element={<GuideSourceLayout />}>
      {routes}
    </Route>
  );
};

export default useCommonComponentRoute;
