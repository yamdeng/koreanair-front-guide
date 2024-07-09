import TemplateTestList from '@/components/guide/template/TemplateTestList';
import TemplateTestListRaw from '@/components/guide/template/TemplateTestList?raw';
import TemplateTestView from '@/components/guide/template/TemplateTestView';
import TemplateTestViewRaw from '@/components/guide/template/TemplateTestView?raw';
import TemplateTestForm from '@/components/guide/template/TemplateTestForm';
import TemplateTestFormRaw from '@/components/guide/template/TemplateTestForm?raw';

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
];

export default TemplatePageInfo;
