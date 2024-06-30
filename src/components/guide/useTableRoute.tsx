import { Route } from 'react-router-dom';
import TablePageInfo from '@/config/TablePageInfo';
import GuideSourceLayout from './GuideSourceLayout';

const useTableRoute = () => {
  const routes = (
    <>
      {TablePageInfo.list.map((menuInfo, index) => {
        const { Component, path } = menuInfo;
        return <Route key={index} path={path} element={<Component menuInfo={menuInfo} />} />;
      })}
    </>
  );

  return (
    <Route path="/table" element={<GuideSourceLayout />}>
      {routes}
    </Route>
  );
};

export default useTableRoute;
