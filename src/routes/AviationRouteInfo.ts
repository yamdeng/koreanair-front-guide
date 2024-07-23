import RiskForm from '@/components/aviation/report/RiskForm';
import RiskForm2 from '@/components/aviation/report/RiskForm2';

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
];

export default AviationRouteInfo;
