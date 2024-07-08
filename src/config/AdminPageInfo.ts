import PBoardForm from '@/components/admin/publish/PBoardForm';

const AdminPageInfo: any = {};

AdminPageInfo.list = [
  {
    title: '테스트 목록(예시)',
    Component: PBoardForm,
    fileName: 'PBoardForm',
    path: '/template/tests',
  },
];

export default AdminPageInfo;
