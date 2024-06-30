import FormGuideBasic from '@/components/guide/form/FormGuideBasic';
import FormGuideBasicRaw from '@/components/guide/form/FormGuideBasic?raw';
import FormGuideStoreUse from '@/components/guide/form/FormGuideStoreUse';
import FormGuideStoreUseRaw from '@/components/guide/form/FormGuideStoreUse?raw';

const FormPageInfo: any = {};

FormPageInfo.list = [
  {
    title: 'form basic',
    Component: FormGuideBasic,
    path: 'FormGuideBasic',
    moduleDirectory: 'form',
    description: '',
    success: false,
    fileRawString: FormGuideBasicRaw,
  },
  {
    title: 'form store 연동',
    Component: FormGuideStoreUse,
    path: 'FormGuideStoreUse',
    moduleDirectory: 'form',
    description: '',
    success: false,
    fileRawString: FormGuideStoreUseRaw,
  },
];

export default FormPageInfo;
