import withSourceView from '@/hooks/withSourceView';
import { useParams } from 'react-router-dom';

function TemplateTestForm() {
  const { detailId } = useParams();
  console.log(`TemplateUserForm detailId : ${detailId}`);
  return (
    <div>
      <div className="grid-one-container">
        <div className="div-label">ID :</div>
        <div className="div-input">
          <input type="text" placeholder="ID" />
          {/* {errors && errors.id ? (
            <span className="error_message">{errors.id.message ? errors.id.message : 'id error'}</span>
          ) : null} */}
        </div>

        <div className="div-label">이름 :</div>
        <div className="div-input">
          <input type="text" placeholder="NAME" />
        </div>

        <div className="div-label">나이 :</div>
        <div className="div-input">
          <input type="number" placeholder="AGE" />
        </div>

        <div className="div-label">이메일 :</div>
        <div className="div-input">
          <input type="text" placeholder="EMAIL" />
        </div>

        <div className="div-label">암호 :</div>
        <div className="div-input">
          <input type="password" placeholder="PASSWORD" />
        </div>

        <div className="div-label">암호확인 :</div>
        <div className="div-input">
          <input type="password" placeholder="confirm PASSWORD" />
        </div>

        <div className="div-label">남/여 :</div>
        <div className="div-input radio">
          <input type="radio" id="sex_male" value="male" />
          <label htmlFor="sex_male">남</label>
          <input type="radio" id="sex_female" value="female" />
          <label htmlFor="sex_female">여</label>
        </div>

        <div className="div-label">직업 :</div>
        <div className="div-input radio">
          <select>
            <option value="">선택하세요</option>
            <option value="developer">Developer</option>
            <option value="pm">PM</option>
            <option value="pl">PL</option>
            <option value="owner">Owner</option>
          </select>
        </div>

        <div className="div-label">알림 :</div>
        <div className="div-input radio">
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
        </div>

        <div className="div-label">설명 :</div>
        <div className="div-input">
          <textarea className="textarea"></textarea>
          {/* {errors && errors.description ? (
            <span className="error_message">
              {errors.description.message ? errors.description.message : 'description error'}
            </span>
          ) : null} */}
        </div>

        <div className="right" style={{ width: 580 }}>
          <button className="button button-cancel">취소</button>
          <button type="submit" className="button button-info">
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

export default withSourceView(TemplateTestForm);
