import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useUserFormStore from '@/stores/admin/useUserFormStore';

function UserForm() {
  const {
    formType,
    loginId,
    name,
    nameEn,
    sabun,
    positionTitle,
    phoneNumber,
    email,
    description,
    address,
    zipcode,
    status,
    joinDate,
    errors,
    changeInput,
    getDetail,
    cancel,
    save,
    clear,
  } = useUserFormStore();

  const { detailId } = useParams();

  useEffect(() => {
    if (detailId !== 'add') {
      getDetail(detailId);
    }
    return clear();
  }, []);

  return (
    <div className="content_area">
      <h3>사용자 폼</h3>
      <div className="write_form">
        <div className="form_table">
          <div className="form_cell f_wid100">
            <span className="form_group wid100 c_mr5">
              <input
                type="text"
                className={errors.loginId ? 'form_tag invalid' : 'form_tag'}
                placeholder="로그인ID"
                name="loginId"
                id="loginId"
                value={loginId}
                onChange={(event) => changeInput('loginId', event.target.value)}
              />
              <label className="f_label" htmlFor="b">
                로그인ID <span className="required">*</span>
              </label>
              {errors.loginId ? <span className="invalid_txt">{errors.loginId}</span> : null}
            </span>
          </div>
        </div>
        <hr className="line" />
        <div className="form_table">
          <div className="form_cell f_wid50">
            <span className="form_group wid100 c_mr5">
              <input
                type="text"
                className={errors.name ? 'form_tag invalid' : 'form_tag'}
                placeholder="이름"
                name="name"
                id="name"
                value={name}
                onChange={(event) => changeInput('name', event.target.value)}
              />
              <label className="f_label" htmlFor="b">
                이름 <span className="required">*</span>
              </label>
              {errors.name ? <span className="invalid_txt">{errors.name}</span> : null}
            </span>
          </div>
          <div className="form_cell f_wid50">
            <span className="form_group wid100 c_mr5">
              <input
                type="text"
                className={errors.nameEn ? 'form_tag invalid' : 'form_tag'}
                placeholder="이름영문"
                name="nameEn"
                id="nameEn"
                value={nameEn}
                onChange={(event) => changeInput('nameEn', event.target.value)}
              />
              <label className="f_label" htmlFor="b">
                이름(영문)
              </label>
              {errors.nameEn ? <span className="invalid_txt">{errors.nameEn}</span> : null}
            </span>
          </div>
        </div>
        <hr className="line" />

        <div className="form_table">
          <div className="form_cell f_wid50">
            <span className="form_group wid100 c_mr5">
              <input
                type="text"
                className={errors.sabun ? 'form_tag invalid' : 'form_tag'}
                placeholder="사번"
                name="sabun"
                id="sabun"
                value={sabun}
                onChange={(event) => changeInput('sabun', event.target.value)}
              />
              <label className="f_label" htmlFor="b">
                사번 <span className="required">*</span>
              </label>
              {errors.sabun ? <span className="invalid_txt">{errors.sabun}</span> : null}
            </span>
          </div>
          <div className="form_cell f_wid50">
            <span className="form_group f_wid100 c_mr5">
              <select
                className={errors.positionTitle ? 'form_tag_select invalid' : 'form_tag_select'}
                name="positionTitle"
                id="positionTitle"
                value={positionTitle}
                onChange={(event) => changeInput('positionTitle', event.target.value)}
              >
                <option value=""> </option>
                <option value="">전체1</option>
                <option value="">전체2</option>
              </select>
              <label className="f_label" htmlFor="b">
                직위
              </label>
              {errors.positionTitle ? <span className="invalid_txt">{errors.positionTitle}</span> : null}
            </span>
          </div>
        </div>
        <hr className="line" />

        <div className="form_table">
          <div className="form_cell f_wid50">
            <span className="form_group wid100 c_mr5">
              <input
                type="text"
                className={errors.email ? 'form_tag invalid' : 'form_tag'}
                placeholder="이름"
                name="email"
                id="email"
                value={email}
                onChange={(event) => changeInput('email', event.target.value)}
              />
              <label className="f_label" htmlFor="b">
                이메일 <span className="required">*</span>
              </label>
              {errors.email ? <span className="invalid_txt">{errors.email}</span> : null}
            </span>
          </div>
          <div className="form_cell f_wid50">
            <span className="form_group wid100 c_mr5">
              <input
                type="text"
                className={errors.phoneNumber ? 'form_tag invalid' : 'form_tag'}
                placeholder=""
                name="phoneNumber"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(event) => changeInput('phoneNumber', event.target.value)}
              />
              <label className="f_label" htmlFor="b">
                핸드폰번호 <span className="required">*</span>
              </label>
              {errors.phoneNumber ? <span className="invalid_txt">{errors.phoneNumber}</span> : null}
            </span>
          </div>
        </div>
        <hr className="line" />

        <div className="form_table">
          <div className="form_cell f_wid50">
            <span className="form_group wid100 c_mr5">
              <input
                type="text"
                className={errors.address ? 'form_tag invalid' : 'form_tag'}
                placeholder="주소"
                name="address"
                id="address"
                value={address}
                onChange={(event) => changeInput('address', event.target.value)}
              />
              <label className="f_label" htmlFor="b">
                주소
              </label>
              {errors.address ? <span className="invalid_txt">{errors.address}</span> : null}
            </span>
          </div>
          <div className="form_cell f_wid50">
            <span className="form_group wid100 c_mr5">
              <input
                type="text"
                className={errors.zipcode ? 'form_tag invalid' : 'form_tag'}
                placeholder=""
                name="zipcode"
                id="zipcode"
                value={zipcode}
                onChange={(event) => changeInput('zipcode', event.target.value)}
              />
              <label className="f_label" htmlFor="b">
                우편번호
              </label>
              {errors.zipcode ? <span className="invalid_txt">{errors.zipcode}</span> : null}
            </span>
          </div>
        </div>
        <hr className="line" />
        <div className="form_table">
          <div className="form_cell f_wid50">
            <span className="form_group wid100 c_mr5">
              <input
                type="text"
                className={errors.joinDate ? 'form_tag invalid' : 'form_tag'}
                placeholder=""
                name="joinDate"
                id="joinDate"
                value={joinDate}
                onChange={(event) => changeInput('joinDate', event.target.value)}
              />
              <label className="f_label" htmlFor="b">
                가입일
              </label>
              {errors.joinDate ? <span className="invalid_txt">{errors.joinDate}</span> : null}
            </span>
          </div>
          <div className="form_cell f_wid50">
            <span className="form_group f_wid100 c_mr5">
              <select
                className={errors.status ? 'form_tag_select invalid' : 'form_tag_select'}
                name="status"
                id="status"
                value={status}
                onChange={(event) => changeInput('status', event.target.value)}
              >
                <option value=""> </option>
                <option value="">전체1</option>
                <option value="">전체2</option>
              </select>
              <label className="f_label" htmlFor="status">
                상태
              </label>
              {errors.status ? <span className="invalid_txt">{errors.status}</span> : null}
            </span>
          </div>
        </div>
      </div>

      <p className="c_pt15 right">
        <button className="btn_text btn_green  c_mr5" data-tip="hello world" onClick={save}>
          저장
        </button>
        <button className="btn_text btn_white " data-tip data-for="cancel" onClick={cancel}>
          취소
        </button>
      </p>
    </div>
  );
}

export default UserForm;
