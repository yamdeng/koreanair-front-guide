import { useTranslation } from 'react-i18next';

function CommonInputError(props) {
  const { t } = useTranslation();
  const { label, errorMessage } = props;
  return (
    <>
      <span className="errorText" style={{ display: errorMessage ? '' : 'none' }}>
        {t(errorMessage, { label: label })}
      </span>
    </>
  );
}

export default CommonInputError;
