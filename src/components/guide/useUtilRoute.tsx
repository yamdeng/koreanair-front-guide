import { Route } from 'react-router-dom';
import UtilPageInfo from '@/config/UtilPageInfo';
import GuideSourceLayout from './GuideSourceLayout';

const useUtilRoute = () => {
  const routes = (
    <>
      {UtilPageInfo.list.map((menuInfo, index) => {
        const { Component, path } = menuInfo;
        return <Route key={index} path={path} element={<Component menuInfo={menuInfo} />} />;
      })}
    </>
  );

  return (
    <Route path="/util" element={<GuideSourceLayout />}>
      {routes}
    </Route>
  );
};

export default useUtilRoute;
