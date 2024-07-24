import MessageList from '@/components/admin/message/MessageList';
import MessageForm from '@/components/admin/message/MessageForm';
import MessageDetail from '@/components/admin/message/MessageDetail';
import CodeList from '@/components/admin/code/CodeList';
import CodeDetail from '@/components/admin/code/CodeDetail';
import CodeForm from '@/components/admin/code/CodeForm';
import MenuForm from '@/components/admin/menu/MenuForm';

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
    Component: CodeList,
    path: 'codes',
  },
  {
    Component: CodeDetail,
    path: 'codes/:detailId',
  },
  {
    Component: CodeForm,
    path: 'codes/:detailId/edit',
  },
  {
    Component: MenuForm,
    path: 'menus',
  },
];

export default AdminRouteInfo;
