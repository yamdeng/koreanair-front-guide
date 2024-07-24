import { Route } from 'react-router-dom';
import AdminRouteInfo from './AdminRouteInfo';
import AdminLayout from '@/components/layout/AdminLayout';
import SysMessageList from '@/components/admin/message/MessageList';

const useAdminRoute = () => {
  const routes = (
    <>
      {AdminRouteInfo.list.map((menuInfo, index) => {
        const { Component, path } = menuInfo;
        return <Route key={index} path={path} element={<Component menuInfo={menuInfo} />} />;
      })}
    </>
  );

  return (
    <Route path="/" element={<AdminLayout />}>
      <Route path="" index element={<SysMessageList />} />
      {routes}
    </Route>
  );
};

export default useAdminRoute;
