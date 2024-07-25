import withSourceView from '@/hooks/withSourceView';
import { useEffect } from 'react';
import useReportTestFormStore2 from '@/stores/guide/useReportTestFormStore2';

/*

  form yup 라이브러리 연동 : useReportTestFormStore2.ts 파일 참고

*/
function FormGuideYup() {
  const { id, name, age, email, password, password2, job, description, errors, changeInput, save, clear } =
    useReportTestFormStore2();

  useEffect(() => {
    return clear();
  }, []);

  return (
    <>
      <div className="guide-grid-one-container">
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
          />
          {errors.id ? <span className="error_message">{errors.id}</span> : null}
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

        <div className="div-label">나이 :</div>
        <div className="div-input">
          <input
            type="text"
            className={errors.age ? 'input-not-valid' : ''}
            placeholder="AGE"
            name="age"
            id="age"
            value={age}
            onChange={(event) => changeInput('age', event.target.value)}
          />
          {errors.age ? <span className="error_message">{errors.age}</span> : null}
        </div>

        <div className="div-label">이메일 :</div>
        <div className="div-input">
          <input
            type="text"
            className={errors.email ? 'input-not-valid' : ''}
            placeholder="EMAIL"
            name="email"
            id="email"
            value={email}
            onChange={(event) => changeInput('email', event.target.value)}
          />
          {errors.email ? <span className="error_message">{errors.email}</span> : null}
        </div>

        <div className="div-label">암호 :</div>
        <div className="div-input">
          <input
            type="password"
            className={errors.password ? 'input-not-valid' : ''}
            placeholder="PASSWORD"
            name="password"
            id="password"
            value={password}
            onChange={(event) => changeInput('password', event.target.value)}
          />
          {errors.password ? <span className="error_message">{errors.password}</span> : null}
        </div>

        <div className="div-label">암호확인 :</div>
        <div className="div-input">
          <input
            type="password"
            className={errors.password2 ? 'input-not-valid' : ''}
            placeholder="confirm PASSWORD"
            name="password2"
            id="password2"
            value={password2}
            onChange={(event) => changeInput('password2', event.target.value)}
          />
          {errors.password2 ? <span className="error_message">{errors.password2}</span> : null}
        </div>

        <div className="div-label">직업 :</div>
        <div className="div-input radio">
          <select
            className={errors.job ? 'input-not-valid' : ''}
            name="job"
            id="job"
            value={job}
            onChange={(event) => changeInput('job', event.target.value)}
          >
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
          {errors.job ? <span className="error_message">{errors.job}</span> : null}
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
          <button className="button button-cancel" onClick={clear}>
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

export default withSourceView(FormGuideYup);
