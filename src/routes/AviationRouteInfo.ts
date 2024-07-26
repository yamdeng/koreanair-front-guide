import ASR from '@/components/aviation/report/ASR';
import RiskForm from '@/components/aviation/report/RiskForm';
import RiskForm2 from '@/components/aviation/report/RiskForm2';
import OfflineMain from '@/components/offline/OfflineMain';
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
    Component: ASR,
    path: 'report'
  },
  {
    Component: OfflineSplash,
    path: 'splash'
  },
  {
    Component: OfflineMain,
    path: 'main'
  }
];

export default AviationRouteInfo;
