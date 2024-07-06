import ModalGuideAlert from '@/components/guide/modal/ModalGuideAlert';
import ModalGuideAlertRaw from '@/components/guide/modal/ModalGuideAlert?raw';
import ModalGuideConfirm from '@/components/guide/modal/ModalGuideConfirm';
import ModalGuideConfirmRaw from '@/components/guide/modal/ModalGuideConfirm?raw';

const ModalPageInfo: any = {};

ModalPageInfo.list = [
  {
    title: 'alert modal',
    Component: ModalGuideAlert,
    path: 'ModalGuideAlert',
    moduleDirectory: 'modal',
    description: '',
    success: false,
    fileRawString: ModalGuideAlertRaw,
  },
  {
    title: 'confirm modal',
    Component: ModalGuideConfirm,
    path: 'ModalGuideConfirm',
    moduleDirectory: 'modal',
    description: '',
    success: false,
    fileRawString: ModalGuideConfirmRaw,
  },
];

export default ModalPageInfo;
