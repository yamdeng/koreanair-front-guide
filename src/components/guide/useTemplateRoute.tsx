import { Route } from 'react-router-dom';
import TemplatePageInfo from '@/config/TemplatePageInfo';
import GuideSourceLayout from './GuideSourceLayout';

const useTemplateRoute = () => {
  const routes = (
    <>
      {TemplatePageInfo.list.map((menuInfo, index) => {
        const { Component, path } = menuInfo;
        return <Route key={index} path={path} element={<Component menuInfo={menuInfo} />} />;
      })}
    </>
  );

  return (
    <Route path="/template" element={<GuideSourceLayout />}>
      {routes}
    </Route>
  );
};

export default useTemplateRoute;
