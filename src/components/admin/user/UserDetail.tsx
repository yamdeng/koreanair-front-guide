import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useUserFormStore from '@/stores/admin/useUserFormStore';

function UserDetail() {
  const {
    loginId,
    name,
    nameEn,
    sabun,
    positionTitle,
    phoneNumber,
    email,
    address,
    zipcode,
    status,
    joinDate,
    getDetail,
    cancel,
    gorFormPage,
    clear,
  } = useUserFormStore();

  const { detailId } = useParams();

  useEffect(() => {
    getDetail(detailId);
    return clear();
  }, []);

  return (
    <div className="content_area">
      <h3>사용자 상세</h3>
      <div className="detail_form">
        <ul className="detail_list">
          <li className="lists">
            <span className="label">로그인ID</span>
            <div className="cont">{loginId}</div>
          </li>
          <li className="lists">
            <span className="label">이름</span>
            <div className="cont">{name}</div>
          </li>
          <li className="lists">
            <span className="label">이름(영문) </span>
            <div className="cont">{nameEn}</div>
          </li>
          <li className="lists">
            <span className="label">사번 </span>
            <div className="cont">{sabun}</div>
          </li>
          <li className="lists">
            <span className="label">직위 </span>
            <div className="cont">{positionTitle}</div>
          </li>
          <li className="lists">
            <span className="label">이메일 </span>
            <div className="cont">{email}</div>
          </li>
          <li className="lists">
            <span className="label">핸드폰번호 </span>
            <div className="cont">{phoneNumber}</div>
          </li>
          <li className="lists">
            <span className="label">주소 </span>
            <div className="cont">{address}</div>
          </li>
          <li className="lists">
            <span className="label">우편번호 </span>
            <div className="cont">{zipcode}</div>
          </li>
          <li className="lists">
            <span className="label">가입일 </span>
            <div className="cont">{joinDate}</div>
          </li>
          <li className="lists">
            <span className="label">상태 </span>
            <div className="cont">{status}</div>
          </li>
        </ul>
      </div>
      <p className="c_pt15 right">
        <button className="btn_text btn_green  c_mr5" data-tip="hello world" onClick={gorFormPage}>
          수정
        </button>
        <button className="btn_text btn_white " data-tip data-for="cancel" onClick={cancel}>
          취소
        </button>
      </p>
    </div>
  );
}

export default UserDetail;
