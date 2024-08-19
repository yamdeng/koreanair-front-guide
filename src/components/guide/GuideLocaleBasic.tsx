import AppNavigation from '../common/AppNavigation';
import { useTranslation } from 'react-i18next';
import Config from '@/config/Config';

function GuideLocaleBasic() {
  const { t } = useTranslation();
  return (
    <>
      <AppNavigation />
      <div className="conts-title">
        <h2>
          다국어 기본 :{' '}
          <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `GuideLocaleBasic.tsx`}>
            GuideLocaleBasic
          </a>
        </h2>
      </div>
      <div>
        <p>front.text.001 : {t('front.text.001')}</p>
        <p>front.text.002 : {t('front.text.002', { name: 'yamdeng' })}</p>
        <p>front.text.not-message : {t('front.text.not-message', '기본 메시지')}</p>
      </div>
    </>
  );
}
export default GuideLocaleBasic;
