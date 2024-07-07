import RouterGuideBasic from '@/components/guide/router/RouterGuideBasic';
import RouterGuideBasicRaw from '@/components/guide/router/RouterGuideBasic?raw';
import RouterGuideQueryString from '@/components/guide/router/RouterGuideQueryString';
import RouterGuideQueryStringRaw from '@/components/guide/router/RouterGuideQueryString?raw';
import RouterGuidePathParam from '@/components/guide/router/RouterGuidePathParam';
import RouterGuidePathParamRaw from '@/components/guide/router/RouterGuidePathParam?raw';
import RouterGuideNestedRouting from '@/components/guide/router/RouterGuideNestedRouting';
import RouterGuideNestedRoutingRaw from '@/components/guide/router/RouterGuideNestedRouting?raw';

import RouteTestReportList from '@/components/guide/router/test/RouteTestReportList';
import RouteTestReportView from '@/components/guide/router/test/RouteTestReportView';
import RouteTestReportForm from '@/components/guide/router/test/RouteTestReportForm';
import RouteTestReportProcess from '@/components/guide/router/test/RouteTestReportProcess';

const RouterPageInfo: any = {};

RouterPageInfo.list = [
  {
    title: 'router basic : Link, a, span',
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
  {
    title: '중첩 라우팅',
    Component: RouterGuideNestedRouting,
    path: 'RouterGuideNestedRouting',
    moduleDirectory: 'router',
    description: '',
    success: false,
    fileRawString: RouterGuideNestedRoutingRaw,
  },
  {
    Component: RouteTestReportList,
    path: 'test/reports',
    moduleDirectory: 'router',
    description: '',
    success: false,
    exclude: true,
  },
  {
    Component: RouteTestReportView,
    path: 'test/reports/:detailId',
    moduleDirectory: 'router',
    description: '',
    success: false,
    exclude: true,
  },
  {
    Component: RouteTestReportForm,
    path: 'test/reports/:detailId/form',
    moduleDirectory: 'router',
    description: '',
    success: false,
    exclude: true,
  },
  {
    Component: RouteTestReportProcess,
    path: 'test/reports/process/*',
    moduleDirectory: 'router',
    description: '',
    success: false,
    exclude: true,
  },
];

export default RouterPageInfo;
