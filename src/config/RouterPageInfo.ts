import RouterGuideBasic from '@/components/guide/router/RouterGuideBasic';
import RouterGuideBasicRaw from '@/components/guide/router/RouterGuideBasic?raw';
import RouterGuideQueryString from '@/components/guide/router/RouterGuideQueryString';
import RouterGuideQueryStringRaw from '@/components/guide/router/RouterGuideQueryString?raw';
import RouterGuidePathParam from '@/components/guide/router/RouterGuidePathParam';
import RouterGuidePathParamRaw from '@/components/guide/router/RouterGuidePathParam?raw';

const RouterPageInfo: any = {};

RouterPageInfo.list = [
  {
    title: 'router basic',
    Component: RouterGuideBasic,
    path: 'RouterGuideBasic',
    moduleDirectory: 'router',
    description: '',
    success: false,
    fileRawString: RouterGuideBasicRaw,
  },
  {
    title: 'router 쿼리스트링 사용',
    Component: RouterGuideQueryString,
    path: 'RouterGuideQueryString',
    moduleDirectory: 'router',
    description: '',
    success: false,
    fileRawString: RouterGuideQueryStringRaw,
  },
  {
    title: 'router {id} path 사용법',
    Component: RouterGuidePathParam,
    path: 'RouterGuidePathParam',
    moduleDirectory: 'router',
    description: '',
    success: false,
    fileRawString: RouterGuidePathParamRaw,
  },
];

export default RouterPageInfo;
