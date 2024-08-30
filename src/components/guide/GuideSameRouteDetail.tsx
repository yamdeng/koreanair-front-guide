import ApiService from '@/services/ApiService';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function GuideSameRouteDetail() {
  const { detailId } = useParams();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  const getUserDetail = async (userId) => {
    const apiResult = await ApiService.get(`com/users/${userId}`);
    const data = apiResult.data;
    setUserInfo(data);
  };

  useEffect(() => {
    getUserDetail(detailId);
  }, [detailId]);

  return (
    <>
      <div className="conts-title">
        <h2>GuideTestDetail(상세페이지)</h2>
        <br />
        <p style={{ padding: 20, display: 'block', fontWeight: 'bold' }}>
          사용자 이름 : {userInfo ? `${userInfo.userId}(${userInfo.nameKor})` : ''}
        </p>
        <p
          onClick={() => {
            navigate(`/aviation/guides/route/41262`);
          }}
          style={{ padding: 20, display: 'block', fontWeight: 'bold', border: '2px solid black' }}
        >
          41262 userId로 이동
        </p>
      </div>
    </>
  );
}
export default GuideSameRouteDetail;
