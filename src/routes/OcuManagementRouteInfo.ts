import TrainingList from '@/components/occupation/management/training/TrainingList';
import TrainingForm from '@/components/occupation/management/training/TrainingForm';
import TrainingDetail from '@/components/occupation/management/training/TrainingDetail';
import PartnerList from '@/components/occupation/management/partner/PartnerList';
import PartnerForm from '@/components/occupation/management/partner/PartnerForm';
import PartnerDetail from '@/components/occupation/management/partner/PartnerDetail';
import SealSpaceList from '@/components/occupation/management/sealSpace/SealSpaceList';
import SealSpaceForm from '@/components/occupation/management/sealSpace/SealSpaceForm';
import SealSpaceDetail from '@/components/occupation/management/sealSpace/SealSpaceDetail';

const RouteInfo: any = {};

RouteInfo.list = [
  /** 중대재해대응훈련 **/

  // 중대재해대응훈련 목록
  {
    Component: TrainingList,
    path: 'training',
  },
  // 중대재해대응훈련 상세
  {
    Component: TrainingDetail,
    path: 'training/:detailId',
  },
  // 중대재해대응훈련 입력,수정
  {
    Component: TrainingForm,
    path: 'training/:detailId/edit',
  },

  /** 협력업체 **/

  // 협력업체 목록
  {
    Component: PartnerList,
    path: 'partner',
  },
  // 협력업체 상세
  {
    Component: PartnerDetail,
    path: 'partner/:detailId',
  },
  // 협력업체 입력,수정
  {
    Component: PartnerForm,
    path: 'partner/:detailId/edit',
  },

  /** 밀폐공간현황 **/

  // 밀폐공간현황 목록
  {
    Component: SealSpaceList,
    path: 'sealSpace',
  },
  // 밀폐공간현황 상세
  {
    Component: SealSpaceDetail,
    path: 'sealSpace/:detailId',
  },
  // 밀폐공간현황 입력,수정
  {
    Component: SealSpaceForm,
    path: 'sealSpace/:detailId/edit',
  },
];

export default RouteInfo;
