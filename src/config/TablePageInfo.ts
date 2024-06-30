import TableGuideBasic from '@/components/guide/table/TableGuideBasic';
import TableGuideBasicRaw from '@/components/guide/table/TableGuideBasic?raw';
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
