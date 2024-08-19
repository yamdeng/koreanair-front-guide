import { useTranslation } from 'react-i18next';

function CommonInputError(props) {
  const { t } = useTranslation();
  const { errorMessage } = props;
  return (
    <>
      <span className="errorText" style={{ display: errorMessage ? '' : 'none' }}>
        {t(errorMessage)}
      </span>
    </>
  );
}

export default CommonInputError;
