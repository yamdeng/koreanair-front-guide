import CodeSerivce from '@/services/CodeService';

function CodeLabelComponent(props) {
  const { codeGrpId, value } = props;
  return CodeSerivce.getCodeLabelByValue(codeGrpId, value);
}

export default CodeLabelComponent;
