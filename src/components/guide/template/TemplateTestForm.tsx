import withSourceView from '@/hooks/withSourceView';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useTemplateTestFormStore from '@/stores/guide/useTemplateTestFormStore';

/*

  데이터 등록/수정 예시

*/
function TemplateTestForm() {
  const {
    formType,
    id,
    sabun,
    name,
    nameEn,
    position,
    phone,
    deptName,
    description,
    errors,
    changeInput,
    getDetail,
    cancel,
    save,
    clear,
  } = useTemplateTestFormStore();

  const { detailId } = useParams();

  useEffect(() => {
    if (detailId !== 'add') {
      getDetail(detailId);
    }
    return clear();
  }, []);

  return (
    <>
      <div className="grid-one-container">
        <div className="div-label">ID :</div>
        <div className="div-input">
          <input
            type="text"
            className={errors.id ? 'input-not-valid' : ''}
            placeholder="ID"
            name="id"
            id="id"
            value={id}
            onChange={(event) => changeInput('id', event.target.value)}
            disabled={formType !== 'add'}
          />
          {errors.id ? <span className="error_message">{errors.id}</span> : null}
        </div>

        <div className="div-label">사번 :</div>
        <div className="div-input">
          <input
            type="text"
            className={errors.sabun ? 'input-not-valid' : ''}
            placeholder="사번"
            name="sabun"
            id="sabun"
            value={sabun}
            onChange={(event) => changeInput('sabun', event.target.value)}
          />
          {errors.name ? <span className="error_message">{errors.sabun}</span> : null}
        </div>

        <div className="div-label">이름 :</div>
        <div className="div-input">
          <input
            type="text"
            className={errors.name ? 'input-not-valid' : ''}
            placeholder="NAME"
            name="name"
            id="name"
            value={name}
            onChange={(event) => changeInput('name', event.target.value)}
          />
          {errors.name ? <span className="error_message">{errors.name}</span> : null}
        </div>

        <div className="div-label">이름(영어) :</div>
        <div className="div-input">
          <input
            type="text"
            className={errors.nameEn ? 'input-not-valid' : ''}
            placeholder="NAME(영문)"
            name="nameEn"
            id="nameEn"
            value={nameEn}
            onChange={(event) => changeInput('nameEn', event.target.value)}
          />
          {errors.name ? <span className="error_message">{errors.nameEn}</span> : null}
        </div>

        <div className="div-label">직책 :</div>
        <div className="div-input radio">
          <select
            className={errors.position ? 'input-not-valid' : ''}
            name="position"
            id="position"
            value={position}
            onChange={(event) => changeInput('position', event.target.value)}
          >
            <option value="대리">대리</option>
            <option value="과장">과장</option>
            <option value="차장">차장</option>
          </select>
          {errors.position ? <span className="error_message">{errors.position}</span> : null}
        </div>

        <div className="div-label">핸드폰 번호 :</div>
        <div className="div-input">
          <input
            type="text"
            className={errors.phone ? 'input-not-valid' : ''}
            placeholder="핸드폰"
            name="phone"
            id="phone"
            value={phone}
            onChange={(event) => changeInput('phone', event.target.value)}
          />
          {errors.phone ? <span className="error_message">{errors.phone}</span> : null}
        </div>

        <div className="div-label">부서 :</div>
        <div className="div-input radio">
          <select
            className={errors.deptName ? 'input-not-valid' : ''}
            name="deptName"
            id="deptName"
            value={deptName}
            onChange={(event) => changeInput('deptName', event.target.value)}
          >
            <option value="항공안전">항공안전</option>
            <option value="산업안전">산업안전</option>
            <option value="운항팀">운항팀</option>
            <option value="Audit">Audit</option>
            <option value="IT">IT</option>
          </select>
          {errors.deptName ? <span className="error_message">{errors.deptName}</span> : null}
        </div>

        <div className="div-label">설명 :</div>
        <div className="div-input">
          <textarea
            className={errors.description ? 'textarea input-not-valid' : 'textarea'}
            name="description"
            id="description"
            value={description}
            onChange={(event) => changeInput('description', event.target.value)}
          ></textarea>
          {errors.description ? <span className="error_message">{errors.description}</span> : null}
        </div>

        <div className="right" style={{ width: 580 }}>
          <button className="button button-cancel" onClick={cancel}>
            취소
          </button>
          <button className="button button-info" onClick={save}>
            저장
          </button>
        </div>
      </div>
    </>
  );
}

export default withSourceView(TemplateTestForm);
