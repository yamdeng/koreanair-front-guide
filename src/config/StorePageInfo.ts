import StoreGuideBasic from '@/components/guide/store/StoreGuideBasic';
import StoreGuideBasicRaw from '@/components/guide/store/StoreGuideBasic?raw';
import StoreGuideMultipleStoreUse from '@/components/guide/store/StoreGuideMultipleStoreUse';
import StoreGuideMultipleStoreUseRaw from '@/components/guide/store/StoreGuideMultipleStoreUse?raw';
import StoreGuideAppContext from '@/components/guide/store/StoreGuideAppContext';
import StoreGuideAppContextRaw from '@/components/guide/store/StoreGuideAppContext?raw';
import StoreGuideAppStore from '@/components/guide/store/StoreGuideAppStore';
import StoreGuideAppStoreRaw from '@/components/guide/store/StoreGuideAppStore?raw';

const StorePageInfo: any = {};

StorePageInfo.list = [
  {
    title: 'store basic',
    Component: StoreGuideBasic,
    path: 'StoreGuideBasic',
    moduleDirectory: 'store',
    description: '',
    success: false,
    fileRawString: StoreGuideBasicRaw,
  },
  {
    title: '2개 이상의 store 사용',
    Component: StoreGuideMultipleStoreUse,
    path: 'StoreGuideMultipleStoreUse',
    moduleDirectory: 'store',
    description: '',
    success: false,
    fileRawString: StoreGuideMultipleStoreUseRaw,
  },
  {
    title: '전역 store 사용 방법(context)',
    Component: StoreGuideAppContext,
    path: 'StoreGuideAppContext',
    moduleDirectory: 'store',
    description: '',
    success: false,
    fileRawString: StoreGuideAppContextRaw,
  },
  {
    title: '전역 store 사용 방법(useStore)',
    Component: StoreGuideAppStore,
    path: 'StoreGuideAppStore',
    moduleDirectory: 'store',
    description: '',
    success: false,
    fileRawString: StoreGuideAppStoreRaw,
  },
];

export default StorePageInfo;
