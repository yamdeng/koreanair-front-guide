import MyReportListScreen from '@/components/aviation/report/MyReportListScreen';
import MyReportWriteScreen from '@/components/aviation/report/MyReportWriteScreen';
import RiskForm from '@/components/aviation/report/RiskForm';
import RiskForm2 from '@/components/aviation/report/RiskForm2';
import OfflineSplash from '@/components/offline/OfflineSplash';
import GuideCodeSelect from '@/components/guide/GuideCodeSelect';
import GuideModal from '@/components/guide/GuideModal';
import GuideMemberInput from '@/components/guide/GuideMemberInput';

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
  {
    Component: GuideCodeSelect,
    path: 'guides/code-locale',
  },
  {
    Component: GuideModal,
    path: 'guides/modal',
  },
  {
    Component: GuideMemberInput,
    path: 'guides/member-input',
  },
];

export default AviationRouteInfo;
