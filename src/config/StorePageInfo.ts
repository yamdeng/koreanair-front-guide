import StoreGuideBasic from '@/components/guide/store/StoreGuideBasic';
import StoreGuideBasicRaw from '@/components/guide/store/StoreGuideBasic?raw';
import StoreGuideMultipleStoreUse from '@/components/guide/store/StoreGuideMultipleStoreUse';
import StoreGuideMultipleStoreUseRaw from '@/components/guide/store/StoreGuideMultipleStoreUse?raw';

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
];

export default StorePageInfo;
