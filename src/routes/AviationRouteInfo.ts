import MyReportListScreen from '@/components/aviation/report/MyReportListScreen';
import MyReportWriteScreen from '@/components/aviation/report/MyReportWriteScreen';
import RiskForm from '@/components/aviation/report/RiskForm';
import RiskForm2 from '@/components/aviation/report/RiskForm2';
import OfflineSplash from '@/components/offline/OfflineSplash';

const AviationRouteInfo: any = {};

AviationRouteInfo.list = [
  {
    Component: RiskForm,
    path: 'risk-form1',
  },
  {
    Component: RiskForm2,
    path: 'risk-form2',
  },
  {
    Component: OfflineSplash,
    path: 'splash',
  },
  {
    Component: MyReportWriteScreen,
    path: 'myreport-write',
  },
  {
    Component: MyReportListScreen,
    path: 'myreport-list',
  },
];

export default AviationRouteInfo;
