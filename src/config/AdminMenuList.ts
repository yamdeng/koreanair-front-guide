const AdminMenuList = [
  {
    name: '운영 관리',
    iconClass: 'menu1',
    isExpend: false,
    childs: [
      {
        name: '사용자 권한 부여(모달 포함)',
        routeUrl: '/template/tests',
      },
    ],
  },
  {
    name: '안전 서류',
    iconClass: 'menu2',
    isExpend: false,
    childs: [
      {
        name: '순외점검_기본정보',
        routeUrl: '/safe-docs/content/PDocContentCheckArround',
      },
      {
        name: '순외점검/합동점검_점검사항',
        routeUrl: '/safe-docs/content/PDocContentCheckItem',
      },
      {
        name: '합동점검_기본정보',
        routeUrl: '/safe-docs/content/PDocContentCheckCo',
      },
      {
        name: '전자서명 요청',
        routeUrl: '/safe-docs/content/PDocContentSign',
      },
      {
        name: '교육실시내용',
        routeUrl: '/safe-docs/content/PDocContentEducationInfo',
      },
      {
        name: '교육참여자',
        routeUrl: '/safe-docs/content/PDocContentEducationAttendUser',
      },
      {
        name: '보호구 지급대장(모달 포함)',
        routeUrl: '/safe-docs/content/PDocContentInventoryList',
      },
      {
        name: '중량물 작업정보',
        routeUrl: '/safe-docs/content/PDocContentWPlanInfo',
      },
      {
        name: '중량물 점검결과',
        routeUrl: '/safe-docs/content/PDocContentWPlanCheck',
      },
      {
        name: '중량물 작업계획서 생성',
        routeUrl: '/safe-docs/content/PDocContentWPlanFling',
      },
      {
        name: '첨부파일 업로드',
        routeUrl: '/safe-docs/content/PDocContentFileAttach',
      },
      {
        name: '근골격계 조사표 기본',
        routeUrl: '/safe-docs/content/PDocContentWorkInspection',
      },
      {
        name: '근골격계 조사표 상황',
        routeUrl: '/safe-docs/content/PDocContentWorkCondition',
      },
      {
        name: '회의내용',
        routeUrl: '/safe-docs/content/PDocContentMtInfo',
      },
    ],
  },
  {
    name: '안전 점검',
    iconClass: 'menu3',
    isExpend: false,
    childs: [
      {
        name: '점검 항목 관리-공통(모달 포함)',
        routeUrl: '/check/PCheckItemList1',
      },
      {
        name: '점검 항목 관리-공사유형별',
        routeUrl: '/check/PCheckItemList2',
      },
      {
        name: '밀폐공간 작업허가서-작업정보',
        routeUrl: '/check/PConfinedSpaceForm1',
      },
      {
        name: '밀폐공간 작업허가서-안전조치 요구사항',
        routeUrl: '/check/PConfinedSpaceForm2',
      },
      {
        name: '밀폐공간 작업허가서-산소 농도측정',
        routeUrl: '/check/PConfinedSpaceForm3',
      },
      {
        name: '점검 결과 관리',
        routeUrl: '/check/PCheckResultList',
      },
      {
        name: '점검 결과 등록(모달 2개 포함)',
        routeUrl: '/check/PCheckResultForm',
      },
    ],
  },
  {
    name: '기타',
    iconClass: 'menu4',
    isExpend: true,
    childs: [
      {
        name: '작업지시 등록 현황',
        routeUrl: '/etc/PWorkOrderResgistStats',
      },
      {
        name: '작업지시서 등록 집계',
        routeUrl: '/etc/PWorkOrderDashBoard',
      },
      {
        name: '홈',
        routeUrl: '/',
      },
    ],
  },
];

export default AdminMenuList;
