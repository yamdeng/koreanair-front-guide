import TemplateUserList from '@/components/guide/template/TemplateUserList';
import TemplateUserListRaw from '@/components/guide/template/TemplateUserList?raw';
import TemplateUserView from '@/components/guide/template/TemplateUserView';
import TemplateUserViewRaw from '@/components/guide/template/TemplateUserView?raw';
import TemplateUserForm from '@/components/guide/template/TemplateUserForm';
import TemplateUserFormRaw from '@/components/guide/template/TemplateUserForm?raw';

const TemplatePageInfo: any = {};

// view route
// edit route

TemplatePageInfo.list = [
  {
    title: '사용자 목록(예시)',
    Component: TemplateUserList,
    fileName: 'TemplateUserList',
    path: 'users',
    moduleDirectory: 'template',
    description: '',
    success: false,
    fileRawString: TemplateUserListRaw,
  },
  {
    title: '사용자상세',
    Component: TemplateUserView,
    fileName: 'TemplateUserView',
    path: 'users/:detailId',
    moduleDirectory: 'template',
    description: '',
    success: false,
    fileRawString: TemplateUserViewRaw,
    exclude: true,
  },
  {
    title: '사용자폼',
    Component: TemplateUserForm,
    fileName: 'TemplateUserForm',
    path: 'users/:detailId/form',
    moduleDirectory: 'template',
    description: '',
    success: false,
    fileRawString: TemplateUserFormRaw,
    exclude: true,
  },
];

export default TemplatePageInfo;
