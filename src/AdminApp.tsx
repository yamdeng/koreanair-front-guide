import { Routes, Route } from 'react-router-dom';
import SideBar from './components/layout/SideBar';
import AdminPageInfo from './config/AdminPageInfo';
import AdminHome from './components/admin/AdminHome';

function AdminApp() {
  const pageList = AdminPageInfo.list;
  return (
    <div>
      <SideBar />
      <div className="content_area_wrap home">
        <Routes>
          <Route path="/" element={<AdminHome />} />
          {pageList.map((menuInfo, index) => {
            const { Component, path } = menuInfo;
            return <Route key={index} path={path} element={<Component menuInfo={menuInfo} />} />;
          })}
        </Routes>
      </div>
    </div>
  );
}

export default AdminApp;
