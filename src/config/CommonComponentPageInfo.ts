import ComponentGuideEdit from '@/components/guide/component/ComponentGuideEdit';
import ComponentGuideEditRaw from '@/components/guide/component/ComponentGuideEdit?raw';
import ComponentGuideDatePicker from '@/components/guide/component/ComponentGuideDatePicker';
import ComponentGuideDatePickerRaw from '@/components/guide/component/ComponentGuideDatePicker?raw';
import ComponentGuideTimePicker from '@/components/guide/component/ComponentGuideTimePicker';
import ComponentGuideTimePickerRaw from '@/components/guide/component/ComponentGuideTimePicker?raw';
import ComponentGuideTree from '@/components/guide/component/ComponentGuideTree';
import ComponentGuideTreeRaw from '@/components/guide/component/ComponentGuideTree?raw';

const CommonComponentPageInfo: any = {};

CommonComponentPageInfo.list = [
  {
    title: '에디터',
    Component: ComponentGuideEdit,
    path: 'ComponentGuideEdit',
    moduleDirectory: 'component',
    description: '',
    success: false,
    fileRawString: ComponentGuideEditRaw,
  },
  {
    title: 'date-picker',
    Component: ComponentGuideDatePicker,
    path: 'ComponentGuideDatePicker',
    moduleDirectory: 'component',
    description: '',
    success: false,
    fileRawString: ComponentGuideDatePickerRaw,
  },
  {
    title: 'time-picker',
    Component: ComponentGuideTimePicker,
    path: 'ComponentGuideTimePicker',
    moduleDirectory: 'component',
    description: '',
    success: false,
    fileRawString: ComponentGuideTimePickerRaw,
  },
  {
    title: 'tree',
    Component: ComponentGuideTree,
    path: 'ComponentGuideTree',
    moduleDirectory: 'component',
    description: '',
    success: false,
    fileRawString: ComponentGuideTreeRaw,
  },
];

export default CommonComponentPageInfo;
