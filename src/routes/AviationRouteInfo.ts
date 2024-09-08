import SafetyList from '@/components/aviation/admin/board/SafetyList';
import SafetyEdit from '@/components/aviation/admin/board/SafetyEdit';
import SafetyDetail from '@/components/aviation/admin/board/SafetyDetail';
import AdminSafetyManualList from '@/components/aviation/admin/board/AdminSafetyManualList';
import AdminSafetyManualEdit from '@/components/aviation/admin/board/AdminSafetyManualEdit';
import AdminSafetyManualDetail from '@/components/aviation/admin/board/AdminSafetyManualDetail';
import SafetyPolicy from '@/components/aviation/policy/SafetyPolicy';
import SafetyManual from '@/components/aviation/policy/SafetyManual';
import SafetyManualDetail from '@/components/aviation/policy/SafetyManualDetail';
import PotentialConList from '@/components/aviation/admin/hazardmanage/PotentialConList';
import PotentialConEdit from '@/components/aviation/admin/hazardmanage/PotentialConEdit';
import PotentialConDetail from '@/components/aviation/admin/hazardmanage/PotentialConDetail';
import TaxonomyList from '@/components/aviation/admin/hazardmanage/TaxonomyList';
import TaxonomyEdit from '@/components/aviation/admin/hazardmanage/TaxonomyEdit';
import TaxonomyDetail from '@/components/aviation/admin/hazardmanage/TaxonomyDetail';
import EventTypeList from '@/components/aviation/admin/EventTypeList';
import EventTypeDetail from '@/components/aviation/admin/EventTypeDetail';
import EventTypeEdit from '@/components/aviation/admin/EventTypeEdit';
import '/src/report.css';

const AviationRouteInfo: any = {};

AviationRouteInfo.list = [
  // 관리자 > 게시판 관리 > 안전정책 목록
  {
    Component: SafetyList,
    path: 'board-manage/safety-policy',
  },
  // 관리자 > 게시판 관리 > 안전정책 신규
  {
    Component: SafetyEdit,
    path: 'board-manage/safety-policy/add/edit',
  },
  // 관리자 > 게시판 관리 > 안전정책 상세
  {
    Component: SafetyDetail,
    path: 'board-manage/safety-policy/:detailId',
  },
  // 관리자 > 게시판 관리 > 안전정책 수정
  {
    Component: SafetyEdit,
    path: 'board-manage/safety-policy/:detailId/edit',
  },
  // 관리자 > 게시판 관리 > 안전 메뉴얼
  {
    Component: AdminSafetyManualList,
    path: 'board-manage/safety-manual',
  },
  // 관리자 > 게시판 관리 > 안전 매뉴얼 신규
  {
    Component: AdminSafetyManualEdit,
    path: 'board-manage/safety-manual/add/edit',
  },
  // 관리자 > 게시판 관리 > 안전정책 상세
  {
    Component: AdminSafetyManualDetail,
    path: 'board-manage/safety-manual/:detailId',
  },
  // 관리자 > 게시판 관리 > 안전 매뉴얼 수정
  {
    Component: AdminSafetyManualEdit,
    path: 'board-manage/safety-manual/:detailId/edit',
  },
  // 안전정책 > 안전정책
  {
    Component: SafetyPolicy,
    path: 'policy/safety-policy',
  },
  // 안전정책 > 안전 매뉴얼
  {
    Component: SafetyManual,
    path: 'policy/safety-manual',
  },
  // 안전정책 > 안전 매뉴얼 상세
  {
    Component: SafetyManualDetail,
    path: 'policy/safety-manual/:detailId',
  },
  // 관리자 > Hazard관리 > consequence 관리
  {
    Component: PotentialConList,
    path: 'hazard-manage/potential-consequence',
  },
  // 관리자 > Hazard관리 > consequence 신규
  {
    Component: PotentialConEdit,
    path: 'hazard-manage/potential-consequence/add/edit',
  },
  // 관리자 > Hazard관리 > consequence 상세
  {
    Component: PotentialConDetail,
    path: 'hazard-manage/potential-consequence/:detailId',
  },
  // 관리자 > Hazard관리 > consequence 상세
  {
    Component: PotentialConEdit,
    path: 'hazard-manage/potential-consequence/:detailId/edit',
  },
  //관리자 > Hazard관리 > Taxonomy 목록
  {
    Component: TaxonomyList,
    path: 'hazard-manage/taxonomy',
  },
  // 관리자 > Hazard관리 > Taxonomy 신규
  {
    Component: TaxonomyEdit,
    path: 'hazard-manage/taxonomy/add/edit',
  },
  // 관리자 > Hazard관리 > Taxonomy 상세
  {
    Component: TaxonomyDetail,
    path: 'hazard-manage/taxonomy/:detailId',
  },
  // 관리자 > Hazard관리 > Taxonomy 수정
  {
    Component: TaxonomyEdit,
    path: 'hazard-manage/taxonomy/:detailId/edit',
  },
  // 관리자 > Event Type 관리 목록
  {
    Component: EventTypeList,
    path: 'eventtype-manage',
  },
  // 관리자 > Event Type 관리 신규
  {
    Component: EventTypeEdit,
    path: 'eventtype-manage/add/edit',
  },
  // 관리자 > Event Type 관리 상세
  {
    Component: EventTypeDetail,
    path: 'eventtype-manage/:detailId',
  },
  // 관리자 > Event Type 관리 수정
  {
    Component: EventTypeEdit,
    path: 'eventtype-manage/:detailId/edit',
  },
];

export default AviationRouteInfo;
