import CodeService from '@/services/CodeService';

function CodeLabelComponent(props) {
  const { codeGrpId, value } = props;
  return CodeService.getCodeLabelByValue(codeGrpId, value);
}

export default CodeLabelComponent;
