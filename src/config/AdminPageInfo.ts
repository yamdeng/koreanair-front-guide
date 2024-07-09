import PBoardDetail from '@/components/admin/publish/PBoardDetail';
import PBoardForm from '@/components/admin/publish/PBoardForm';
import PDocContentCheckArround from '@/components/admin/publish/PDocContentCheckArround';

import PCheckItemList1 from '@/components/admin/publish/PCheckItemList1';
import PCheckItemList2 from '@/components/admin/publish/PCheckItemList2';
import PCheckResultForm from '@/components/admin/publish/PCheckResultForm';
import PCheckResultList from '@/components/admin/publish/PCheckResultList';
import PConfinedSpaceForm1 from '@/components/admin/publish/PConfinedSpaceForm1';
import PConfinedSpaceForm2 from '@/components/admin/publish/PConfinedSpaceForm2';
import PConfinedSpaceForm3 from '@/components/admin/publish/PConfinedSpaceForm3';

const AdminPageInfo: any = {};

AdminPageInfo.list = [
  {
    Component: PBoardForm,
    path: '/publish/PBoardForm',
  },
  {
    Component: PBoardDetail,
    path: '/publish/PBoardDetail',
  },
  {
    Component: PDocContentCheckArround,
    path: '/publish/PDocContentCheckArround',
  },
  {
    Component: PCheckItemList1,
    path: '/publish/PCheckItemList1',
  },
  {
    Component: PCheckItemList2,
    path: '/publish/PCheckItemList2',
  },
  {
    Component: PCheckResultForm,
    path: '/publish/PCheckResultForm',
  },
  {
    Component: PCheckResultList,
    path: '/publish/PCheckResultList',
  },
  {
    Component: PConfinedSpaceForm1,
    path: '/publish/PConfinedSpaceForm1',
  },
  {
    Component: PConfinedSpaceForm2,
    path: '/publish/PConfinedSpaceForm2',
  },
  {
    Component: PConfinedSpaceForm3,
    path: '/publish/PConfinedSpaceForm3',
  },
];

export default AdminPageInfo;
