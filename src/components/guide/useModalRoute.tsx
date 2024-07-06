import { Route } from 'react-router-dom';
import ModalPageInfo from '@/config/ModalPageInfo';
import GuideSourceLayout from './GuideSourceLayout';

const useModalRoute = () => {
  const routes = (
    <>
      {ModalPageInfo.list.map((menuInfo, index) => {
        const { Component, path } = menuInfo;
        return <Route key={index} path={path} element={<Component menuInfo={menuInfo} />} />;
      })}
    </>
  );

  return (
    <Route path="/modal" element={<GuideSourceLayout />}>
      {routes}
    </Route>
  );
};

export default useModalRoute;
