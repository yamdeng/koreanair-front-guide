import ReactUtil from '@/utils/ReactUtil';

function CommonInputToolTip(props) {
  const { toolTipMessage } = props;
  return (
    <>
      {toolTipMessage ? (
        <div className="tooltip">
          <span
            className="tooltiptext tooltip-right"
            dangerouslySetInnerHTML={{ __html: ReactUtil.convertEnterStringToBrTag(toolTipMessage) }}
          />
        </div>
      ) : null}
    </>
  );
}

export default CommonInputToolTip;
