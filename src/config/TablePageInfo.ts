import TableGuideBasic from '@/components/guide/table/TableGuideBasic';
import TableGuideBasicRaw from '@/components/guide/table/TableGuideBasic?raw';
import TableGuideBasicTypeScript from '@/components/guide/table/TableGuideBasicTypeScript';
import TableGuideBasicTypeScriptRaw from '@/components/guide/table/TableGuideBasicTypeScript?raw';

import TableGuideBasicServer from '@/components/guide/table/TableGuideBasicServer';
import TableGuideBasicServerRaw from '@/components/guide/table/TableGuideBasicServer?raw';
import TableGuideBasicServerTypeScript from '@/components/guide/table/TableGuideBasicServerTypeScript';
import TableGuideBasicServerTypeScriptRaw from '@/components/guide/table/TableGuideBasicServerTypeScript?raw';

import TableGuidePagination from '@/components/guide/table/TableGuidePagination';
import TableGuidePaginationRaw from '@/components/guide/table/TableGuidePagination?raw';

const TablePageInfo: any = {};

TablePageInfo.list = [
  {
    title: 'table basic',
    Component: TableGuideBasic,
    path: 'TableGuideBasic',
    moduleDirectory: 'table',
    description: '',
    success: false,
    fileRawString: TableGuideBasicRaw,
    url: 'https://www.ag-grid.com/react-data-grid/getting-started/',
  },
  {
    title: 'table basic : typescript',
    Component: TableGuideBasicTypeScript,
    path: 'TableGuideBasicTypeScript',
    moduleDirectory: 'table',
    description: '',
    success: false,
    fileRawString: TableGuideBasicTypeScriptRaw,
    url: 'https://www.ag-grid.com/react-data-grid/getting-started/',
  },
  {
    title: 'table basic(server)',
    Component: TableGuideBasicServer,
    path: 'TableGuideBasicServer',
    moduleDirectory: 'table',
    description: '',
    success: false,
    fileRawString: TableGuideBasicServerRaw,
    url: 'https://www.ag-grid.com/react-data-grid/getting-started/',
  },
  {
    title: 'table basic(server) : typescript',
    Component: TableGuideBasicServerTypeScript,
    path: 'TableGuideBasicServerTypeScript',
    moduleDirectory: 'table',
    description: '',
    success: false,
    fileRawString: TableGuideBasicServerTypeScriptRaw,
    url: 'https://www.ag-grid.com/react-data-grid/getting-started/',
  },
  {
    title: 'table pagination(client)',
    Component: TableGuidePagination,
    path: 'TableGuidePagination',
    moduleDirectory: 'table',
    description: '',
    success: false,
    fileRawString: TableGuidePaginationRaw,
  },
];

export default TablePageInfo;
