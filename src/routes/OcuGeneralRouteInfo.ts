import NoticeList from '@/components/occupation/general/notice/NoticeList';
import NoticeForm from '@/components/occupation/general/notice/NoticeForm';
import NoticeDetail from '@/components/occupation/general/notice/NoticeDetail';
import CommitteeList from '@/components/occupation/general/committee/CommitteeList';
import CommitteeForm from '@/components/occupation/general/committee/CommitteeForm';
import CommitteeDetail from '@/components/occupation/general/committee/CommitteeDetail';

import RegulationsList from '@/components/occupation/general/regulations/RegulationsList';
import RegulationsForm from '@/components/occupation/general/regulations/RegulationsForm';
import RegulationsDetail from '@/components/occupation/general/regulations/RegulationsDetail';

import HsCommitteeList from '@/components/occupation/general/hsCommittee/HsCommitteeList';

import HsCommitteeForm from '@/components/occupation/general/hsCommittee/HsCommitteeForm';

import HsCommitteeDetail from '@/components/occupation/general/hsCommittee/HsCommitteeDetail';

import ZeroHzdGoalList from '@/components/occupation/general/zeroHzdGoal/ZeroHzdGoalList';

import ZeroHzdGoalDetail from '@/components/occupation/general/zeroHzdGoal/ZeroHzdGoalDetail';

import ZeroHzdGoalForm from '@/components/occupation/general/zeroHzdGoal/ZeroHzdGoalForm';

import ZeroHzdGoalInsert from '@/components/occupation/general/zeroHzdGoal/ZeroHzdGoalInsert';

const RouteInfo: any = {};

RouteInfo.list = [
  // 공지사항 목록
  {
    Component: NoticeList,
    path: 'notice',
  },
  // 공지사항 상세
  {
    Component: NoticeDetail,
    path: 'notice/:detailId',
  },
  // 공지사항 입력,수정
  {
    Component: NoticeForm,
    path: 'notice/:detailId/edit',
  },
  /**  산업안전보건위원회 **/

  // 산업안전보건위원회 목록
  {
    Component: CommitteeList,
    path: 'committee',
  },

  // 산업안전보건위원회 상세
  {
    Component: CommitteeDetail,
    path: 'committee/:detailId',
  },

  // 산업안전보건위원회 입력,수정
  {
    Component: CommitteeForm,
    path: 'committee/:detailId/edit',
  },

  /** 규정/지침/매뉴얼/양식 **/

  // 규정/지침/매뉴얼/양식 목록
  {
    Component: RegulationsList,
    path: 'regulations',
  },

  // 규정/지침/매뉴얼/양식 상세
  {
    Component: RegulationsDetail,
    path: 'regulations/:detailId',
  },

  // 규정/지침/매뉴얼/양식 입력,수정
  {
    Component: RegulationsForm,
    path: 'regulations/:detailId/edit',
  },

  /** 안전보건협의체 **/

  // 안전보건협의체 목록
  {
    Component: HsCommitteeList,
    path: 'hsCommittee',
  },

  // 안전보건협의체 상세
  {
    Component: HsCommitteeDetail,
    path: 'hsCommittee/:detailId',
  },

  // 안전보건협의체 입력/수정
  {
    Component: HsCommitteeForm,
    path: 'hsCommittee/:detailId/edit',
  },

  /** 무재해운동 **/

  // 안전보건협의체 목록
  {
    Component: ZeroHzdGoalList,
    path: 'zeroHzdGoal',
  },

  // 안전보건협의체 목표 등록
  {
    Component: ZeroHzdGoalInsert,
    path: 'zeroHzdGoal/insert',
  },

  // 안전보건협의체 상세
  {
    Component: ZeroHzdGoalDetail,
    path: 'zeroHzdGoal/:detailId',
  },

  // 안전보건협의체 입력/수정
  {
    Component: ZeroHzdGoalForm,
    path: 'zeroHzdGoal/:detailId/edit',
  },
];

export default RouteInfo;
