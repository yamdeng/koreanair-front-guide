import ZustandGuideAppContext from '@/components/guide/zustand/ZustandGuideAppContext';
import ZustandGuideAppContextRaw from '@/components/guide/zustand/ZustandGuideAppContext?raw';
import ZustandGuideAppStore from '@/components/guide/zustand/ZustandGuideAppStore';
import ZustandGuideAppStoreRaw from '@/components/guide/zustand/ZustandGuideAppStore?raw';
import ZustandGuideCreateFunction from '@/components/guide/zustand/ZustandGuideCreateFunction';
import ZustandGuideCreateFunctionRaw from '@/components/guide/zustand/ZustandGuideCreateFunction?raw';
import ZustandGuideCreateStoreFunction from '@/components/guide/zustand/ZustandGuideCreateStoreFunction';
import ZustandGuideCreateStoreFunctionRaw from '@/components/guide/zustand/ZustandGuideCreateStoreFunction?raw';
import ZustandGuideUseShallow from '@/components/guide/zustand/ZustandGuideUseShallow';
import ZustandGuideUseShallowRaw from '@/components/guide/zustand/ZustandGuideUseShallow?raw';
import ZustandGuideNestedPropsUpdate from '@/components/guide/zustand/ZustandGuideNestedPropsUpdate';
import ZustandGuideNestedPropsUpdateRaw from '@/components/guide/zustand/ZustandGuideNestedPropsUpdate?raw';

/*

  TODO
   1.NestedPropsChange : ZustandGuideUseShallow

*/

const ZustandPageInfo: any = {};

ZustandPageInfo.list = [
  {
    title: 'zustand create function',
    Component: ZustandGuideCreateFunction,
    path: 'ZustandGuideCreateFunction',
    moduleDirectory: 'zustand',
    description: '',
    success: false,
    fileRawString: ZustandGuideCreateFunctionRaw,
  },
  {
    title: 'zustand createStore function',
    Component: ZustandGuideCreateStoreFunction,
    path: 'ZustandGuideCreateStoreFunction',
    moduleDirectory: 'zustand',
    description: '',
    success: false,
    fileRawString: ZustandGuideCreateStoreFunctionRaw,
  },
  {
    title: 'useShallow 예시',
    Component: ZustandGuideUseShallow,
    path: 'ZustandGuideUseShallow',
    moduleDirectory: 'zustand',
    description: '',
    success: false,
    fileRawString: ZustandGuideUseShallowRaw,
  },
  {
    title: '내부 속성 변경 예시(여러방법)',
    Component: ZustandGuideNestedPropsUpdate,
    path: 'ZustandGuideNestedPropsUpdate',
    moduleDirectory: 'zustand',
    description: '',
    success: false,
    fileRawString: ZustandGuideNestedPropsUpdateRaw,
  },
  {
    title: '전역 store 사용 방법(context)',
    Component: ZustandGuideAppContext,
    path: 'ZustandGuideAppContext',
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
