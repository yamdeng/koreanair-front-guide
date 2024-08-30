import { useState } from 'react';
import AppNavigation from '../common/AppNavigation';
import Config from '@/config/Config';

function GuideUbiReport() {
  const viewUbiReport = () => {
    alert('TODO: UbiReport 샘플');
  };

  return (
    <>
      <AppNavigation />
      <div className="conts-title">
        <h2>
          UbiReport샘플 :{' '}
          <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `GuideUbiReport.tsx`}>
            GuideUbiReport
          </a>
        </h2>
      </div>
      <div className="editbox">
        <div className="btn-area">
          <button
            type="button"
            name="button"
            className="btn-sm btn_text btn-darkblue-line"
            onClick={() => viewUbiReport()}
          >
            UbiReport 샘플
          </button>
        </div>
      </div>
    </>
  );
}
export default GuideUbiReport;
