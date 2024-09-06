import ReportASREditForm from '@/components/aviation/report/edit/ReportASREditForm';
import ReportCSREditForm from '@/components/aviation/report/edit/ReportCSREditForm';
import ReportDSREditForm from '@/components/aviation/report/edit/ReportDSREditForm';
import ReportFOQAEditForm from '@/components/aviation/report/edit/ReportFOQAEditForm';
import ReportGSREditForm from '@/components/aviation/report/edit/ReportGSREditForm';
import ReportHZREditForm from '@/components/aviation/report/edit/ReportHZREditForm';
import ReportMSREditForm from '@/components/aviation/report/edit/ReportMSREditForm';
import ReportRSREditForm from '@/components/aviation/report/edit/ReportRSREditForm';

import ReportWriteFormMenu from '@/components/aviation/report/ReportWriteFormMenu';
import ReportWriteFormCategoryMenu from '@/components/aviation/report/ReportWriteFormCategoryMenu';

const ReportEditFormRouteInfo: any = {};

ReportEditFormRouteInfo.list = [
  {
    Component: ReportASREditForm,
    path: 'report-form/ASR/:detailId',
  },
  {
    Component: ReportCSREditForm,
    path: 'report-form/CSR/:detailId',
  },
  {
    Component: ReportDSREditForm,
    path: 'report-form/DSR/:detailId',
  },
  {
    Component: ReportFOQAEditForm,
    path: 'report-form/FOQA/:detailId',
  },
  {
    Component: ReportGSREditForm,
    path: 'report-form/GSR/:detailId',
  },
  {
    Component: ReportHZREditForm,
    path: 'report-form/HZR/:detailId',
  },
  {
    Component: ReportMSREditForm,
    path: 'report-form/MSR/:detailId',
  },
  {
    Component: ReportRSREditForm,
    path: 'report-form/RSR/:detailId',
  },

  {
    Component: ReportWriteFormMenu,
    path: 'report-form',
  },
  {
    Component: ReportWriteFormCategoryMenu,
    path: 'report-form/:reportKind',
  },
];

export default ReportEditFormRouteInfo;
