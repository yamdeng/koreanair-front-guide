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
import ZustandGuideStoreCommunication from '@/components/guide/zustand/ZustandGuideStoreCommunication';
import ZustandGuideStoreCommunicationRaw from '@/components/guide/zustand/ZustandGuideStoreCommunication?raw';
import ZustandGuideImmer from '@/components/guide/zustand/ZustandGuideImmer';
import ZustandGuideImmerRaw from '@/components/guide/zustand/ZustandGuideImmer?raw';

/*

  TODO
   2.immerMiddleware : ZustandGuideImmerMiddleware
   3.tarnsaction : ZustandGuideTranscation
   4.tuil : ZustandGuideUtilUse
   5.slice : ZustandGuideSlice

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
    title: 'store간의 통신하는 방법',
    Component: ZustandGuideStoreCommunication,
    path: 'ZustandGuideStoreCommunication',
    moduleDirectory: 'zustand',
    description: '',
    success: false,
    fileRawString: ZustandGuideStoreCommunicationRaw,
  },
  {
    title: 'immer 연동 기본 예시',
    Component: ZustandGuideImmer,
    path: 'ZustandGuideImmer',
    moduleDirectory: 'zustand',
    description: '',
    success: false,
    fileRawString: ZustandGuideImmerRaw,
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
