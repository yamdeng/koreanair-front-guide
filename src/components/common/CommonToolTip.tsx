import { Tooltip } from 'react-tooltip';

function CommonToolTip({ toolTipId, message }) {
  return (
    <Tooltip id={toolTipId}>
      <div>{message}</div>
    </Tooltip>
  );
}

export default CommonToolTip;
