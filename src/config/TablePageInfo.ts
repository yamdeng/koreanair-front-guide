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
import AppTableLoadingBar from '@/components/guide/table/AppTableLoadingBar';
import AppTableLoadingBarRaw from '@/components/guide/table/AppTableLoadingBar?raw';
import AppTableTotalCountMessage from '@/components/guide/table/AppTableTotalCountMessage';
import AppTableTotalCountMessageRaw from '@/components/guide/table/AppTableTotalCountMessage?raw';
import AppTableCSVExport from '@/components/guide/table/AppTableCSVExport';
import AppTableCSVExportRaw from '@/components/guide/table/AppTableCSVExport?raw';

import AppTableDoubleClick from '@/components/guide/table/AppTableDoubleClick';
import AppTableDoubleClickRaw from '@/components/guide/table/AppTableDoubleClick?raw';
import AppTableCheckBox from '@/components/guide/table/AppTableCheckBox';
import AppTableCheckBoxRaw from '@/components/guide/table/AppTableCheckBox?raw';
import AppTablePagination from '@/components/guide/table/AppTablePagination';
import AppTablePaginationRaw from '@/components/guide/table/AppTablePagination?raw';
import AppTableCustomColumn from '@/components/guide/table/AppTableCustomColumn';
import AppTableCustomColumnRaw from '@/components/guide/table/AppTableCustomColumn?raw';

import AppTableLinkColumn from '@/components/guide/table/AppTableLinkColumn';
import AppTableLinkColumnRaw from '@/components/guide/table/AppTableLinkColumn?raw';
import AppTableCommonActionButton from '@/components/guide/table/AppTableCommonActionButton';
import AppTableCommonActionButtonRaw from '@/components/guide/table/AppTableCommonActionButton?raw';
import AppTableColumnLabelAlign from '@/components/guide/table/AppTableColumnLabelAlign';
import AppTableColumnLabelAlignRaw from '@/components/guide/table/AppTableColumnLabelAlign?raw';
import AppTableToolTip from '@/components/guide/table/AppTableToolTip';
import AppTableToolTipRaw from '@/components/guide/table/AppTableToolTip?raw';

import AppTableColumnLock from '@/components/guide/table/AppTableColumnLock';
import AppTableColumnLockRaw from '@/components/guide/table/AppTableColumnLock?raw';
import AppTableRowSpan from '@/components/guide/table/AppTableRowSpan';
import AppTableRowSpanRaw from '@/components/guide/table/AppTableRowSpan?raw';
import AppTableColumnDynamic from '@/components/guide/table/AppTableColumnDynamic';
import AppTableColumnDynamicRaw from '@/components/guide/table/AppTableColumnDynamic?raw';
import AppTableServerPage from '@/components/guide/table/AppTableServerPage';
import AppTableServerPageRaw from '@/components/guide/table/AppTableServerPage?raw';
import AppTableServerPage2 from '@/components/guide/table/AppTableServerPage2';
import AppTableServerPage2Raw from '@/components/guide/table/AppTableServerPage2?raw';

const TablePageInfo: any = {};

TablePageInfo.list = [
  {
    title: '서버페이징',
    Component: AppTableServerPage,
    path: 'AppTableServerPage',
    moduleDirectory: 'table',
    description: '',
    success: false,
    fileRawString: AppTableServerPageRaw,
  },
  {
    title: '서버페이징2',
    Component: AppTableServerPage2,
    path: 'AppTableServerPage2',
    moduleDirectory: 'table',
    description: '',
    success: false,
    fileRawString: AppTableServerPage2Raw,
  },
  {
    title: '공통컴포넌트 기본',
    Component: AppTableBasic,
    path: 'AppTableBasic',
    moduleDirectory: 'table',
    description: '',
    success: false,
    fileRawString: AppTableBasicRaw,
  },
  {
    title: '로딩바',
    Component: AppTableLoadingBar,
    path: 'AppTableLoadingBar',
    moduleDirectory: 'table',
    description: '',
    success: false,
    fileRawString: AppTableLoadingBarRaw,
  },
  {
    title: 'totalCount 메시지',
    Component: AppTableTotalCountMessage,
    path: 'AppTableTotalCountMessage',
    moduleDirectory: 'table',
    description: '',
    success: false,
    fileRawString: AppTableTotalCountMessageRaw,
  },
  {
    title: 'csv export',
    Component: AppTableCSVExport,
    path: 'AppTableCSVExport',
    moduleDirectory: 'table',
    description: '',
    success: false,
    fileRawString: AppTableCSVExportRaw,
  },
  {
    title: 'row 더블 클릭',
    Component: AppTableDoubleClick,
    path: 'AppTableDoubleClick',
    moduleDirectory: 'table',
    description: '',
    success: false,
    fileRawString: AppTableDoubleClickRaw,
  },
  {
    title: '체크박스 적용 및 선택한 정보 가져오기',
    Component: AppTableCheckBox,
    path: 'AppTableCheckBox',
    moduleDirectory: 'table',
    description: '',
    success: false,
    fileRawString: AppTableCheckBoxRaw,
  },

  {
    title: '페이징',
    Component: AppTablePagination,
    path: 'AppTablePagination',
    moduleDirectory: 'table',
    description: '',
    success: false,
    fileRawString: AppTablePaginationRaw,
  },

  {
    title: '커스텀 컬럼 컴포넌트',
    Component: AppTableCustomColumn,
    path: 'AppTableCustomColumn',
    moduleDirectory: 'table',
    description: '',
    success: false,
    fileRawString: AppTableCustomColumnRaw,
  },
  {
    title: '링크 컬럼 반영 방법',
    Component: AppTableLinkColumn,
    path: 'AppTableLinkColumn',
    moduleDirectory: 'table',
    description: '',
    success: false,
    fileRawString: AppTableLinkColumnRaw,
    url: 'https://www.ag-grid.com/react-data-grid/getting-started/',
  },
  {
    title: '공통 액션 버튼',
    Component: AppTableCommonActionButton,
    path: 'AppTableCommonActionButton',
    moduleDirectory: 'table',
    description: '',
    success: false,
    fileRawString: AppTableCommonActionButtonRaw,
    url: 'https://www.ag-grid.com/react-data-grid/getting-started/',
  },
  {
    title: '헤더, 컬럼 라벨 정렬',
    Component: AppTableColumnLabelAlign,
    path: 'AppTableColumnLabelAlign',
    moduleDirectory: 'table',
    description: '',
    success: false,
    fileRawString: AppTableColumnLabelAlignRaw,
    url: 'https://www.ag-grid.com/react-data-grid/getting-started/',
  },
  {
    title: '툴팁',
    Component: AppTableToolTip,
    path: 'AppTableToolTip',
    moduleDirectory: 'table',
    description: '',
    success: false,
    fileRawString: AppTableToolTipRaw,
    url: 'https://www.ag-grid.com/react-data-grid/getting-started/',
  },
  {
    title: '열 잠그기',
    Component: AppTableColumnLock,
    path: 'AppTableColumnLock',
    moduleDirectory: 'table',
    description: '',
    success: false,
    fileRawString: AppTableColumnLockRaw,
    url: 'https://www.ag-grid.com/react-data-grid/getting-started/',
  },
  {
    title: '행 rowspan',
    Component: AppTableRowSpan,
    path: 'AppTableRowSpan',
    moduleDirectory: 'table',
    description: '',
    success: false,
    fileRawString: AppTableRowSpanRaw,
    url: 'https://www.ag-grid.com/react-data-grid/getting-started/',
  },
  {
    title: '컬럼 동적 반영 1',
    Component: AppTableColumnDynamic,
    path: 'AppTableColumnDynamic',
    moduleDirectory: 'table',
    description: '',
    success: false,
    fileRawString: AppTableColumnDynamicRaw,
    url: 'https://www.ag-grid.com/react-data-grid/getting-started/',
  },
  {
    title: '컬럼 동적 반영 2',
    Component: AppTableColumnDynamic,
    fileName: 'AppTableColumnDynamic',
    path: 'AppTableColumnDynamic2',
    moduleDirectory: 'table',
    description: '',
    success: false,
    fileRawString: AppTableColumnDynamicRaw,
    url: 'https://www.ag-grid.com/react-data-grid/getting-started/',
  },
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
];

export default TablePageInfo;
