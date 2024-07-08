const AdminMenuList = [
  {
    name: '관리자메뉴',
    iconClass: 'menu1',
    isExpend: false,
    childs: [
      {
        name: '게시판 테스트',
        routeUrl: '/publish/PBoardForm',
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
    ],
  },
];

export default AdminMenuList;
