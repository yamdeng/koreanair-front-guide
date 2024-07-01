import TableGuideBasic from '@/components/guide/table/TableGuideBasic';
import TableGuideBasicRaw from '@/components/guide/table/TableGuideBasic?raw';
import TableGuideBasicTypeScript from '@/components/guide/table/TableGuideBasicTypeScript';
import TableGuideBasicTypeScriptRaw from '@/components/guide/table/TableGuideBasicTypeScript?raw';

import TableGuideBasicServer from '@/components/guide/table/TableGuideBasicServer';
import TableGuideBasicServerRaw from '@/components/guide/table/TableGuideBasicServer?raw';
import TableGuideBasicServerTypeScript from '@/components/guide/table/TableGuideBasicServerTypeScript';
import TableGuideBasicServerTypeScriptRaw from '@/components/guide/table/TableGuideBasicServerTypeScript?raw';

import AppTableBasic from '@/components/guide/table/AppTableBasic';
import AppTableBasicRaw from '@/components/guide/table/AppTableBasic?raw';
import AppTableBasic2 from '@/components/guide/table/AppTableBasic2';
import AppTableBasic2Raw from '@/components/guide/table/AppTableBasic2?raw';

const TablePageInfo: any = {};

TablePageInfo.list = [
  {
    title: 'ag-grid',
    Component: TableGuideBasic,
    path: 'TableGuideBasic',
    moduleDirectory: 'table',
    description: '',
    success: false,
    fileRawString: TableGuideBasicRaw,
    url: 'https://www.ag-grid.com/react-data-grid/getting-started/',
  },
  {
    title: 'ag-grid : typescript',
    Component: TableGuideBasicTypeScript,
    path: 'TableGuideBasicTypeScript',
    moduleDirectory: 'table',
    description: '',
    success: false,
    fileRawString: TableGuideBasicTypeScriptRaw,
  },
  {
    title: 'ag-grid(server)',
    Component: TableGuideBasicServer,
    path: 'TableGuideBasicServer',
    moduleDirectory: 'table',
    description: '',
    success: false,
    fileRawString: TableGuideBasicServerRaw,
  },
  {
    title: 'ag-grid(server) : typescript',
    Component: TableGuideBasicServerTypeScript,
    path: 'TableGuideBasicServerTypeScript',
    moduleDirectory: 'table',
    description: '',
    success: false,
    fileRawString: TableGuideBasicServerTypeScriptRaw,
  },
  {
    title: '공통테이블 컴포넌트',
    Component: AppTableBasic,
    path: 'AppTableBasic',
    moduleDirectory: 'table',
    description: '',
    success: false,
    fileRawString: AppTableBasicRaw,
  },
  {
    title: '공통테이블 컴포넌트 2',
    Component: AppTableBasic2,
    path: 'AppTableBasic2',
    moduleDirectory: 'table',
    description: '',
    success: false,
    fileRawString: AppTableBasic2Raw,
  },
];

export default TablePageInfo;
