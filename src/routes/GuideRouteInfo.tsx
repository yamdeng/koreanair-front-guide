import GuideCodeSelect from '@/components/guide/GuideCodeSelect';
import GuideFileAttach from '@/components/guide/GuideFileAttach';
import GuideMemberInput from '@/components/guide/GuideMemberInput';
import GuideModal from '@/components/guide/GuideModal';
import GuideCommonInputForm from '@/components/guide/GuideCommonInputForm';
import GuideCommonInputSearch from '@/components/guide/GuideCommonInputSearch';
import GuideAppTextInput from '@/components/guide/GuideAppTextInput';
import GuideAppCodeSelect from '@/components/guide/GuideAppCodeSelect';
import GuideAppCheckbox from '@/components/guide/GuideAppCheckbox';
import GuideAppDatePicker from '@/components/guide/GuideAppDatePicker';
import GuideAppRangeDatePicker from '@/components/guide/GuideAppRangeDatePicker';
import GuideAppTimePicker from '@/components/guide/GuideAppTimePicker';
import GuideAppTextEditor from '@/components/guide/GuideAppTextEditor';
import GuideAppMemberInput from '@/components/guide/GuideAppMemberInput';
import GuideAppAutoComplete from '@/components/guide/GuideAppAutoComplete';
import GuideAppFileAttach from '@/components/guide/GuideAppFileAttach';
import GuideAlertModal from '@/components/guide/GuideAlertModal';
import GuideOrgModal from '@/components/guide/GuideOrgModal';
import GuideModalService from '@/components/guide/GuideModalService';
import GuideLocaleBasic from '@/components/guide/GuideLocaleBasic';
import GuideLocaleCode from '@/components/guide/GuideLocaleCode';
import GuideLocaleForm from '@/components/guide/GuideLocaleForm';
import GuideLocaleOrgComponent from '@/components/guide/GuideLocaleOrgComponent';
import GuideToastService from '@/components/guide/GuideToastService';
import GuideApiService from '@/components/guide/GuideApiService';
import GuideAppTreeSelect from '@/components/guide/GuideAppTreeSelect';
import GuideSecondLevelMenu from '@/components/guide/GuideSecondLevelMenu';
import GuideFirstLevelMenu from '@/components/guide/GuideFirstLevelMenu';

// 1.공통 input
// GuideCommonInputForm : common-input-form
// GuideCommonInputSearch : common-input-search
// GuideAppTextInput : app-text-input
// GuideAppCodeSelect : app-code-select
// GuideAppCheckbox : app-checkbox-radio
// GuideAppDatePicker : app-date-picker
// GuideAppRangeDatePicker : app-rangedate-picker
// GuideAppTimePicker : app-time-picker
// GuideAppTextEditor : app-text-editor
// GuideAppMemberInput : app-member-input
// GuideAppTreeSelect : app-tree-select
// GuideAppAutoComplete : app-auto-complete
// GuideAppFileAttach : app-file-attach

// 2.모달
// GuideAlertModal : alert-modal
// GuideOrgModal : org-modal
// GuideModalService : modal-service

// 3.다국어
// GuideLocaleBasic : locale-basic
// GuideLocaleCode : locale-code
// GuideLocaleForm : locale-form
// GuideLocaleOrgComponent : locale-org-component

// 0.로그인

// 99.기타
// GuideToastService : toast-service
// GuideApiService : api-service

const GuideRouteInfo: any = {};

/*

  guides/

  1.공통 input

  #.공통 input 가이드(form) : 공통속성 전체 나열
   -guides/common-input-form
   1.id, name, label, value, onChange, placeholder, required, errorMessage, disabled
    -required, disabled, errorMessage, placeholder, value

  #.공통 input 가이드(search) : 공통속성 전체 나열
   -guides/common-input-search
   1.id, name, label, value, onChange, placeholder, required, errorMessage, disabled
    -required, disabled, errorMessage, placeholder, value

  #.<AppTextInput />, <AppSearchInput /> : AppTextInput, AppSearchInput
   -guides/app-text-input

  #.<AppSelect />, <AppCodeSelect /> : AppSelect, AppCodeSelect
   -guides/app-code-select

  #.<AppCheckbox />, <AppCheckboxGroup />, <AppRadioGroup /> : AppCheckbox, AppCheckboxGroup, AppRadioGroup
   -guides/app-checkbox-radio

  #.<AppDatePicker />, <AppRangeDatePicker />, <AppTimePicker /> : AppDatePicker, AppRangeDatePicker, AppTimePicker
   -guides/app-date-picker
   -guides/app-time-picker
   -guides/app-date-range-pikcer

  #.<AppEditor />, <AppTextArea/> : AppEditor, AppTextArea
   -guides/app-text-editor

  #.<AppDeptSearchInput />, <AppUserSelectInput /> : AppDeptSearchInput, AppUserSelectInput
   -guides/app-member-input

  #.<AppTreeSelect /> : AppTreeSelect
   -guides/app-tree-select

  #.<AppAutoComplete /> : AppAutoComplete
   -guides/app-auto-complete

  #.<AppFileAttach /> : AppFileAttach
   -guides/app-file-attach

  2.공통 모달
   -guides/alert-modal : AlertModal, ConfirmModal
   -guides/organization-modal : OrgTreeSelectModal, UserSelectModal, UserSelectWithOrgTreeModal, MemberSelectModal
   -guides/modal-service : ModalService

  3.다국어 가이드
   #.공통 : 상단에 toggle
   -menu
   -code : CodeService, CodeLabelComponent
   -form yup, 공통 input 컴포넌트에 키값으로 전달
   -table header
   -alert 메시지에 전달 : 다른 레이어에서 사용 방법
   -조직도 공통 컴포넌트 적용

  4.로그인 가이드
   -<select /> : 항공안전, 산업안전
   -<AppTextInput />
   -[로그인]

  0.개발 패턴 가이드

  5.공통 테이블 가이드



  99.기타 가이드
   -ToastService
   -ApiService option

*/

GuideRouteInfo.list = [
  {
    Component: GuideCodeSelect,
    path: 'guides/code-locale',
  },
  {
    Component: GuideModal,
    path: 'guides/modal',
  },
  {
    Component: GuideMemberInput,
    path: 'guides/member-input',
  },
  {
    Component: GuideFileAttach,
    path: 'guides/file',
  },
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
    Component: GuideAppRangeDatePicker,
    path: 'guides/app-rangedate-picker',
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
    Component: GuideLocaleOrgComponent,
    path: 'guides/locale-org-component',
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
