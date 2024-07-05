import { Routes, Route } from 'react-router-dom';
// import PageConfig2 from './PageConfig2';
// import PNewHome from 'publish/page/PNewHome';
import SideBar from './SideBar';
import AdminHome from './components/admin/AdminHome';

function AdminMain() {
  const pageList = PageConfig2.list;
  return (
    <>
      <SideBar />
      <div className="content_area_wrap home">
        <Routes>
          <Route path="/" element={<AdminHome />} />
          {pageList.map((pageInfo) => {
            return <Route exact path={pageInfo.url} component={pageInfo.component} />;
          })}
        </Routes>
      </div>
    </>
  );
}

export default AdminMain;
