import PBoardForm from '@/components/admin/publish/PBoardForm';
import PBoardDetail from '@/components/admin/publish/PBoardDetail';

const AdminPageInfo: any = {};

AdminPageInfo.list = [
  {
    Component: PBoardForm,
    path: '/publish/PBoardForm',
  },
  {
    Component: PBoardDetail,
    path: '/publish/PBoardDetail',
  },
];

export default AdminPageInfo;
