const AdminMenuList = [
  {
    name: '관리자메뉴',
    iconClass: 'menu1',
    isExpend: false,
    childs: [
      {
        name: '사용자 목록',
        routeUrl: '/users',
      },
    ],
  },
  {
    name: '퍼블리싱',
    iconClass: 'menu2',
    isExpend: false,
    childs: [
      {
        name: 'PBoardForm',
        routeUrl: '/publish/PBoardForm',
      },
      {
        name: 'PBoardDetail',
        routeUrl: '/publish/PBoardDetail',
      },
      {
        name: 'PDocContentCheckArround',
        routeUrl: '/publish/PDocContentCheckArround',
      },
      {
        name: 'PCheckItemList1',
        routeUrl: '/publish/PCheckItemList1',
      },
      {
        name: 'PCheckItemList2',
        routeUrl: '/publish/PCheckItemList2',
      },
      {
        name: 'PCheckResultForm',
        routeUrl: '/publish/PCheckResultForm',
      },
      {
        name: 'PCheckResultList',
        routeUrl: '/publish/PCheckResultList',
      },
      {
        name: 'PConfinedSpaceForm1',
        routeUrl: '/publish/PConfinedSpaceForm1',
      },
      {
        name: 'PConfinedSpaceForm2',
        routeUrl: '/publish/PConfinedSpaceForm2',
      },
      {
        name: 'PConfinedSpaceForm3',
        routeUrl: '/publish/PConfinedSpaceForm3',
      },
    ],
  },
];

export default AdminMenuList;
