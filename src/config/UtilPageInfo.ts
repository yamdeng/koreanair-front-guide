import UtilGuideImmerListCase from '@/components/guide/util/UtilGuideImmerListCase';
import UtilGuideImmerListCaseRaw from '@/components/guide/util/UtilGuideImmerListCase?raw';
import UtilGuideImmerObjectCase from '@/components/guide/util/UtilGuideImmerObjectCase';
import UtilGuideImmerObjectCaseRaw from '@/components/guide/util/UtilGuideImmerObjectCase?raw';

const UtilPageInfo: any = {};

UtilPageInfo.list = [
  {
    title: 'immer 사용 case1',
    Component: UtilGuideImmerListCase,
    path: 'UtilGuideImmerListCase',
    moduleDirectory: 'util',
    description: '',
    success: false,
    fileRawString: UtilGuideImmerListCaseRaw,
  },
  {
    title: 'immer 사용 case2',
    Component: UtilGuideImmerObjectCase,
    path: 'UtilGuideImmerObjectCase',
    moduleDirectory: 'util',
    description: '',
    success: false,
    fileRawString: UtilGuideImmerObjectCaseRaw,
  },
];

export default UtilPageInfo;
