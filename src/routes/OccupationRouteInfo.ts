import OccupationTestForm from '@/components/occupation/test/OccupationTestForm';
import OccupationTestList from '@/components/occupation/test/OccupationTestList';

const OccupationRouteInfo: any = {};

OccupationRouteInfo.list = [
  {
    Component: OccupationTestList,
    path: 'test-list',
  },
  {
    Component: OccupationTestForm,
    path: 'test-form',
  },
];

export default OccupationRouteInfo;
