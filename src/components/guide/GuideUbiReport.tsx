import { useState } from 'react';
import AppNavigation from '../common/AppNavigation';
import Config from '@/config/Config';
import CommonUtil from '@/utils/CommonUtil';

function GuideUbiReport() {
  const viewUbiReport = () => {
    // Ubireport 공통함수 호출(단순 샘플)
    CommonUtil.openReportPage('ubi_sample.jrf', 'user#ubireport#');
  };

  const viewUbiReportDB = () => {
    // Ubireport 공통함수 호출(DB)
    CommonUtil.openReportPage('ubi_sample_db.jrf', 'param1#첫번째 파라미터#param2#두번째 파라미터#');
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
            UbiReport 샘플1(단순호출)
          </button>
          <button
            type="button"
            name="button"
            className="btn-sm btn_text btn-darkblue-line"
            onClick={() => viewUbiReportDB()}
          >
            UbiReport 샘플2(DB접속)
          </button>
        </div>
      </div>
    </>
  );
}
export default GuideUbiReport;
