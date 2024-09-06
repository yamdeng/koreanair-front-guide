import GuideUbiReport from '@/components/guide/GuideUbiReport';
import GuideAlertModal from '@/components/guide/GuideAlertModal';
import GuideApiService from '@/components/guide/GuideApiService';
import GuideAppAutoComplete from '@/components/guide/GuideAppAutoComplete';
import GuideAppCheckbox from '@/components/guide/GuideAppCheckbox';
import GuideAppCodeSelect from '@/components/guide/GuideAppCodeSelect';
import GuideAppDatePicker from '@/components/guide/GuideAppDatePicker';
import GuideAppDatePicker2 from '@/components/guide/GuideAppDatePicker2';
import GuideAppFileAttach from '@/components/guide/GuideAppFileAttach';
import GuideAppMemberInput from '@/components/guide/GuideAppMemberInput';
import GuideAppRangeDatePicker from '@/components/guide/GuideAppRangeDatePicker';
import GuideAppRangeDatePicker2 from '@/components/guide/GuideAppRangeDatePicker2';
import GuideAppTextEditor from '@/components/guide/GuideAppTextEditor';
import GuideAppTextInput from '@/components/guide/GuideAppTextInput';
import GuideAppTimePicker from '@/components/guide/GuideAppTimePicker';
import GuideAppTreeSelect from '@/components/guide/GuideAppTreeSelect';
import GuideCommonInputForm from '@/components/guide/GuideCommonInputForm';
import GuideCommonInputSearch from '@/components/guide/GuideCommonInputSearch';
import GuideFirstLevelMenu from '@/components/guide/GuideFirstLevelMenu';
import GuideLocaleBasic from '@/components/guide/GuideLocaleBasic';
import GuideLocaleCode from '@/components/guide/GuideLocaleCode';
import GuideLocaleForm from '@/components/guide/GuideLocaleForm';
import GuideModalService from '@/components/guide/GuideModalService';
import GuideOrgModal from '@/components/guide/GuideOrgModal';
import GuideSecondLevelMenu from '@/components/guide/GuideSecondLevelMenu';
import GuideToastService from '@/components/guide/GuideToastService';
import GuideTree from '@/components/guide/GuideTree';
import GuideDetailPage from '@/components/guide/GuideDetailPage';
import GuideFormUnload from '@/components/guide/GuideFormUnload';
import GuideProfile from '@/components/guide/GuideProfile';
import GuideAuth from '@/components/guide/GuideAuth';
import GuideRoute from '@/components/guide/GuideRoute';
import GuideSameRouteDetail from '@/components/guide/GuideSameRouteDetail';
import GuideFileAttachModal from '@/components/guide/GuideFileAttachModal';
import GuideYupCase1 from '@/components/guide/GuideYupCase1';
import GuideYupCase2 from '@/components/guide/GuideYupCase2';
import GuideTableCase1 from '@/components/guide/GuideTableCase1';
import GuideTableFormCase1 from '@/components/guide/GuideTableFormCase1';
import GuideTableFormCase2 from '@/components/guide/GuideTableFormCase2';
import GuideTableCase2 from '@/components/guide/GuideTableCase2';

const GuideRouteInfo: any = {};

GuideRouteInfo.list = [
  {
    Component: GuideCommonInputForm,
    path: 'guides/common-input-form',
  },
  {
    Component: GuideCommonInputSearch,
    path: 'guides/common-input-search',
  },
  {
    Component: GuideAppTextInput,
    path: 'guides/app-text-input',
  },
  {
    Component: GuideAppCodeSelect,
    path: 'guides/app-code-select',
  },
  {
    Component: GuideAppCheckbox,
    path: 'guides/app-checkbox-radio',
  },
  {
    Component: GuideAppDatePicker,
    path: 'guides/app-date-picker',
  },
  {
    Component: GuideAppDatePicker2,
    path: 'guides/app-date-picker2',
  },
  {
    Component: GuideAppRangeDatePicker,
    path: 'guides/app-rangedate-picker',
  },
  {
    Component: GuideAppRangeDatePicker2,
    path: 'guides/app-rangedate-picker2',
  },
  {
    Component: GuideAppTimePicker,
    path: 'guides/app-time-picker',
  },
  {
    Component: GuideAppTextEditor,
    path: 'guides/app-text-editor',
  },
  {
    Component: GuideAppMemberInput,
    path: 'guides/app-member-input',
  },
  {
    Component: GuideAppTreeSelect,
    path: 'guides/app-tree-select',
  },
  {
    Component: GuideAppAutoComplete,
    path: 'guides/app-auto-complete',
  },
  {
    Component: GuideAppFileAttach,
    path: 'guides/app-file-attach',
  },
  {
    Component: GuideTree,
    path: 'guides/tree',
  },
  {
    Component: GuideUbiReport,
    path: 'guides/ubireport',
  },
  {
    Component: GuideAlertModal,
    path: 'guides/alert-modal',
  },
  {
    Component: GuideOrgModal,
    path: 'guides/org-modal',
  },
  {
    Component: GuideModalService,
    path: 'guides/modal-service',
  },
  {
    Component: GuideLocaleBasic,
    path: 'guides/locale-basic',
  },
  {
    Component: GuideLocaleCode,
    path: 'guides/locale-code',
  },
  {
    Component: GuideLocaleForm,
    path: 'guides/locale-form',
  },
  {
    Component: GuideToastService,
    path: 'guides/toast-service',
  },
  {
    Component: GuideApiService,
    path: 'guides/api-service',
  },
  {
    Component: GuideFirstLevelMenu,
    path: 'guides/first-level-menu',
  },
  {
    Component: GuideSecondLevelMenu,
    path: 'guides/second-level-menu',
  },
  {
    Component: GuideDetailPage,
    path: 'guides/detailpage-editor',
  },
  {
    Component: GuideFormUnload,
    path: 'guides/unload',
  },
  {
    Component: GuideProfile,
    path: 'guides/profile',
  },
  {
    Component: GuideAuth,
    path: 'guides/auth',
  },
  {
    Component: GuideRoute,
    path: 'guides/route',
  },
  {
    Component: GuideSameRouteDetail,
    path: 'guides/route/:detailId',
  },
  {
    Component: GuideFileAttachModal,
    path: 'guides/modal/file',
  },
  {
    Component: GuideYupCase1,
    path: 'guides/yup/case1',
  },
  {
    Component: GuideYupCase2,
    path: 'guides/yup/case2',
  },
  {
    Component: GuideTableCase1,
    path: 'guides/table/case1',
  },
  {
    Component: GuideTableFormCase1,
    path: 'guides/table/case2',
  },
  {
    Component: GuideTableFormCase2,
    path: 'guides/table/case3',
  },
  {
    Component: GuideTableCase2,
    path: 'guides/table/case4',
  },
];

export default GuideRouteInfo;
