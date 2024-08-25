import OccupationLayout from '@/components/layout/OccupationLayout';
import OccupationPortal from '@/components/occupation/OccupationPortal';
import { Route } from 'react-router-dom';

// 산업안전 RouteInfo
import OcuAccidentRouteInfo from './OcuAccidentRouteInfo';
import OcuEducationRouteInfo from './OcuEducationRouteInfo';
import OcuEtcRouteInfo from './OcuEtcRouteInfo';
import OcuGeneralRouteInfo from './OcuGeneralRouteInfo';
import OcuInspectionRouteInfo from './OcuInspectionRouteInfo';
import OcuManagementRouteInfo from './OcuManagementRouteInfo';

// HHC - 삭제? 예정
import OccupationRouteInfo from './OccupationRouteInfo';

const useOccupationRoute = () => {
  const routeInfos = [
    OccupationRouteInfo,
    OcuAccidentRouteInfo,
    OcuEducationRouteInfo,
    OcuEtcRouteInfo,
    OcuGeneralRouteInfo,
    OcuInspectionRouteInfo,
    OcuManagementRouteInfo,
  ];

  const allRoutes = routeInfos.flatMap((routeInfo) =>
    routeInfo.list.map((menuInfo, index) => {
      const { Component, path } = menuInfo;
      return <Route key={`${path}-${index}`} path={path} element={<Component menuInfo={menuInfo} />} />;
    })
  );

  return (
    <Route path="/occupation" element={<OccupationLayout />}>
      <Route path="" index element={<OccupationPortal />} />
      {allRoutes}
    </Route>
  );
};

export default useOccupationRoute;
