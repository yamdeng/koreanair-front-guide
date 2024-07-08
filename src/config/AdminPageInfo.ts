import PBoardForm from '@/components/admin/publish/PBoardForm';
import PBoardDetail from '@/components/admin/publish/PBoardDetail';
import PDocContentCheckArround from '@/components/admin/publish/PDocContentCheckArround';

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
  {
    Component: PDocContentCheckArround,
    path: '/publish/PDocContentCheckArround',
  },
];

export default AdminPageInfo;
