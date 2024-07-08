import TemplateTestList from '@/components/guide/template/TemplateTestList';
import TemplateTestListRaw from '@/components/guide/template/TemplateTestList?raw';
import TemplateTestView from '@/components/guide/template/TemplateTestView';
import TemplateTestViewRaw from '@/components/guide/template/TemplateTestView?raw';
import TemplateTestForm from '@/components/guide/template/TemplateTestForm';
import TemplateTestFormRaw from '@/components/guide/template/TemplateTestForm?raw';

import TemplateUserList from '@/components/guide/template/TemplateUserList';
import TemplateUserListRaw from '@/components/guide/template/TemplateUserList?raw';
import TemplateUserView from '@/components/guide/template/TemplateUserView';
import TemplateUserViewRaw from '@/components/guide/template/TemplateUserView?raw';
import TemplateUserForm from '@/components/guide/template/TemplateUserForm';
import TemplateUserFormRaw from '@/components/guide/template/TemplateUserForm?raw';

const TemplatePageInfo: any = {};

TemplatePageInfo.list = [
  {
    title: '테스트 목록(예시)',
    Component: TemplateTestList,
    fileName: 'TemplateTestList',
    path: 'tests',
    moduleDirectory: 'template',
    description: '',
    success: false,
    fileRawString: TemplateTestListRaw,
  },
  {
    title: '테스트상세',
    Component: TemplateTestView,
    fileName: 'TemplateTestView',
    path: 'tests/:detailId',
    moduleDirectory: 'template',
    description: '',
    success: false,
    fileRawString: TemplateTestViewRaw,
    exclude: true,
  },
  {
    title: '테스트폼',
    Component: TemplateTestForm,
    fileName: 'TemplateTestForm',
    path: 'tests/:detailId/form',
    moduleDirectory: 'template',
    description: '',
    success: false,
    fileRawString: TemplateTestFormRaw,
    exclude: true,
  },
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
