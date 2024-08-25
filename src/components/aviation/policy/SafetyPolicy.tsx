import ApiService from '@/services/ApiService';
import AppNavigation from '@/components/common/AppNavigation';
import { useEffect, useState } from 'react';

function SafetyPolicy() {
  const [imgUrl, setImgUrl] = useState<string>('');

  useEffect(() => {
    ApiService.get(`avn/policy/safety-policys`).then(async (result) => {
      const fileGroupSeq = result.data.fileGroupSeq;
      const fileDataInfo = await ApiService.get(`${import.meta.env.VITE_API_URL_FIEL_GROUPS}/${fileGroupSeq}`);
      setImgUrl(`/api/v1/${import.meta.env.VITE_API_URL_FIEL_GROUPS}/file/${fileDataInfo.data[0].fileSeq}`);
    });
  }, []);

  return (
    <>
      <AppNavigation />
      <div className="conts-title">
        <h2>안전정책</h2>
      </div>
      {/*상세페이지*/}
      <div className="editbox NoLine">
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <div className="img">
                {imgUrl === '' ? (
                  <p>
                    이미지가 존재하지 않습니다.<br></br>
                    안전정책 이미지를 등록해주세요.
                  </p>
                ) : (
                  <img src={imgUrl} className="img-thumbnail" alt="Safety Policy" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*//상세페이지*/}
    </>
  );
}

export default SafetyPolicy;
