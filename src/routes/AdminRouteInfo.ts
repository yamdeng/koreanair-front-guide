import MessageList from '@/components/admin/message/MessageList';
import MessageForm from '@/components/admin/message/MessageForm';
import MessageDetail from '@/components/admin/message/MessageDetail';

const AdminRouteInfo: any = {};

AdminRouteInfo.list = [
  {
    Component: MessageList,
    path: 'messages',
  },
  {
    Component: MessageDetail,
    path: 'messages/:id',
  },
  {
    Component: MessageForm,
    path: 'messages/:id/edit',
  },
];

export default AdminRouteInfo;
