import FormGuideBasic from '@/components/guide/form/FormGuideBasic';
import FormGuideBasicRaw from '@/components/guide/form/FormGuideBasic?raw';
import FormGuideYup from '@/components/guide/form/FormGuideYup';
import FormGuideYupRaw from '@/components/guide/form/FormGuideYup?raw';

const FormPageInfo: any = {};

FormPageInfo.list = [
  {
    title: 'form 공통 zustand slice 사용',
    Component: FormGuideBasic,
    path: 'FormGuideBasic',
    moduleDirectory: 'form',
    description: '',
    success: false,
    fileRawString: FormGuideBasicRaw,
  },
  {
    title: 'form yup 라이브러리 연동',
    Component: FormGuideYup,
    path: 'FormGuideYup',
    moduleDirectory: 'form',
    description: '',
    success: false,
    fileRawString: FormGuideYupRaw,
  },
];

export default FormPageInfo;
