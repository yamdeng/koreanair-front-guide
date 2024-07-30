import MessageList from '@/components/admin/message/MessageList';
import MessageForm from '@/components/admin/message/MessageForm';
import MessageDetail from '@/components/admin/message/MessageDetail';
import CodeGroupList from '@/components/admin/code/CodeGroupList';
import CodeGroupDetail from '@/components/admin/code/CodeGroupDetail';
import CodeGroupForm from '@/components/admin/code/CodeGroupForm';
import MenuForm from '@/components/admin/menu/MenuForm';
import AdminUserList from '@/components/admin/user/AdminUserList';
import AdminUserDetail from '@/components/admin/user/AdminUserDetail';
import AdminDeptList from '@/components/admin/dept/AdminDeptList';

const AdminRouteInfo: any = {};

AdminRouteInfo.list = [
  {
    Component: MessageList,
    path: 'messages',
  },
  {
    Component: MessageDetail,
    path: 'messages/:detailId',
  },
  {
    Component: MessageForm,
    path: 'messages/:detailId/edit',
  },
  {
    Component: CodeGroupList,
    path: 'codes',
  },
  {
    Component: CodeGroupDetail,
    path: 'codes/:detailId',
  },
  {
    Component: CodeGroupForm,
    path: 'codes/:detailId/edit',
  },
  {
    Component: MenuForm,
    path: 'menus',
  },
  {
    Component: AdminUserList,
    path: 'users',
  },
  {
    Component: AdminUserDetail,
    path: 'users/:detailId',
  },
  {
    Component: AdminDeptList,
    path: 'depts',
  },
];

export default AdminRouteInfo;
