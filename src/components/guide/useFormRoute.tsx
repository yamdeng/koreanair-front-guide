import { Route } from 'react-router-dom';
import FormPageInfo from '@/config/FormPageInfo';
import GuideSourceLayout from './GuideSourceLayout';

const useFormRoute = () => {
  const routes = (
    <>
      {FormPageInfo.list.map((menuInfo, index) => {
        const { Component, path } = menuInfo;
        return <Route key={index} path={path} element={<Component menuInfo={menuInfo} />} />;
      })}
    </>
  );

  return (
    <Route path="/form" element={<GuideSourceLayout />}>
      {routes}
    </Route>
  );
};

export default useFormRoute;
