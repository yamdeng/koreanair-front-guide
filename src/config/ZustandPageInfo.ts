import ZustandGuideAppContext from '@/components/guide/zustand/ZustandGuideAppContext';
import ZustandGuideAppContextRaw from '@/components/guide/store/ZustandGuideAppContext?raw';
import ZustandGuideAppStore from '@/components/guide/zustand/ZustandGuideAppStore';
import ZustandGuideAppStoreRaw from '@/components/guide/store/ZustandGuideAppStore?raw';

const ZustandPageInfo: any = {};

ZustandPageInfo.list = [
  {
    title: '전역 store 사용 방법(context)',
    Component: ZustandGuideAppContext,
    path: 'StoreGuideAppContext',
    moduleDirectory: 'zustand',
    description: '',
    success: false,
    fileRawString: ZustandGuideAppContextRaw,
  },
  {
    title: '전역 store 사용 방법(useStore)',
    Component: ZustandGuideAppStore,
    path: 'ZustandGuideAppStore',
    moduleDirectory: 'zustand',
    description: '',
    success: false,
    fileRawString: ZustandGuideAppStoreRaw,
  },
];

export default ZustandPageInfo;
