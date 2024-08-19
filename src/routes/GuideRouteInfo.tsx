import GuideAlertModal from '@/components/guide/GuideAlertModal';
import GuideApiService from '@/components/guide/GuideApiService';
import GuideAppAutoComplete from '@/components/guide/GuideAppAutoComplete';
import GuideAppAutoCompleteRaw from '@/components/guide/GuideAppAutoCompleteRaw';
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
    Component: GuideAppAutoCompleteRaw,
    path: 'guides/app-auto-complete-raw',
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
];

export default GuideRouteInfo;
