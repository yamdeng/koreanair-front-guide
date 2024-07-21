import ComponentGuideEdit from '@/components/guide/component/ComponentGuideEdit';
import ComponentGuideEditRaw from '@/components/guide/component/ComponentGuideEdit?raw';
import ComponentGuideDatePicker from '@/components/guide/component/ComponentGuideDatePicker';
import ComponentGuideDatePickerRaw from '@/components/guide/component/ComponentGuideDatePicker?raw';
import ComponentGuideDatePicker2 from '@/components/guide/component/ComponentGuideDatePicker2';
import ComponentGuideDatePicker2Raw from '@/components/guide/component/ComponentGuideDatePicker2?raw';
import ComponentGuideRangeDatePicker from '@/components/guide/component/ComponentGuideRangeDatePicker';
import ComponentGuideRangeDatePickerRaw from '@/components/guide/component/ComponentGuideRangeDatePicker?raw';
import ComponentGuideRangeDatePicker2 from '@/components/guide/component/ComponentGuideRangeDatePicker2';
import ComponentGuideRangeDatePicker2Raw from '@/components/guide/component/ComponentGuideRangeDatePicker2?raw';
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
    title: 'date-picker2',
    Component: ComponentGuideDatePicker2,
    path: 'ComponentGuideDatePicker2',
    moduleDirectory: 'component',
    description: '',
    success: false,
    fileRawString: ComponentGuideDatePicker2Raw,
  },
  {
    title: 'date-range-picker',
    Component: ComponentGuideRangeDatePicker,
    path: 'ComponentGuideRangeDatePicker',
    moduleDirectory: 'component',
    description: '',
    success: false,
    fileRawString: ComponentGuideRangeDatePickerRaw,
  },
  {
    title: 'date-range-picker2',
    Component: ComponentGuideRangeDatePicker2,
    path: 'ComponentGuideRangeDatePicker2',
    moduleDirectory: 'component',
    description: '',
    success: false,
    fileRawString: ComponentGuideRangeDatePicker2Raw,
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
