import ComponentGuideEdit from '@/components/guide/component/ComponentGuideEdit';
import ComponentGuideEditRaw from '@/components/guide/component/ComponentGuideEdit?raw';

const CommonComponentPageInfo: any = {};

CommonComponentPageInfo.list = [
  {
    title: '에디터',
    Component: ComponentGuideEdit,
    path: 'ComponentGuideEdit',
    moduleDirectory: 'component',
    description: '',
    success: false,
    fileRawString: ComponentGuideEditRaw,
  },
];

export default CommonComponentPageInfo;
