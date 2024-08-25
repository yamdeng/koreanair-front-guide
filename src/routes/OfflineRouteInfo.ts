import OfflineMain from '@/components/offline/OfflineMain';
import '/src/report.css';
import OfflineWriteReport from '@/components/offline/OfflineWriteReport';

const OfflineRouteInfo: any = {};

OfflineRouteInfo.list = [
  {
    Component: OfflineMain,
    path: 'main',
  },
  {
    Component: OfflineWriteReport,
    path: 'write-report',
  },
];

export default OfflineRouteInfo;
