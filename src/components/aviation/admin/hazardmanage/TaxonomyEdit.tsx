import { useEffect } from 'react';
// import AppNavigation from '@/components/common/AppNavigation';
import { useFormDirtyCheck } from '@/hooks/useFormDirtyCheck';
import { useParams } from 'react-router-dom';
import AppTextInput from '@/components/common/AppTextInput';

/* TODO : store 경로를 변경해주세요. */
// import HazardTaxonomyEditStore from '@/stores/guide/useKeHazardLv3FormStore';

import { create } from 'zustand';
import { formBaseState, createFormSliceYup } from '@/stores/slice/formSlice';
import * as yup from 'yup';
import AppNavigation from '@/components/common/AppNavigation';
import AppSelect from '@/components/common/AppSelect';
import Code from '@/config/Code';

/* yup validation */
const yupFormSchema = yup.object({
  hazardLv1Id: yup.string().required('Level1은 필수 값 입니다.'),
  hazardLv2Id: yup.string().required('Level2는 필수 값 입니다.'),
  hazardLv3Id: yup.string().required('Level3는 필수 값 입니다.'),
  hazardDetail: yup.string(),
  sources: yup.string(),
  potentialConsequence: yup.string(),
  useYn: yup.string().required('사용여부는 필수 값 입니다.'),
  notes: yup.string(),
  viewOrder: yup.string(),
});

/* TODO : form 초기값 상세 셋팅 */
/* formValue 초기값 */
const initFormValue = {
  hazardLv1Id: '',
  hazardLv2Id: '',
  hazardLv3Id: '',
  lvText1: '',
  lvText2: '',
  lvText3: '',
  hazardDetail: '',
  sources: '',
  potentialConsequence: '',
  useYn: '',
  notes: '',
  viewOrder: '',
};

/* form 초기화 */
const initFormData = {
  ...formBaseState,

  formApiPath: 'avn/admin/criteria/taxonomies',
  baseRoutePath: '/aviation/hazard-manage/taxonomy',
  formName: 'HazardTaxonomyEditStore',
  formValue: {
    ...initFormValue,
  },
};

/* zustand store 생성 */
const HazardTaxonomyEditStore = create<any>((set, get) => ({
  ...createFormSliceYup(set, get),

  ...initFormData,

  yupFormSchema: yupFormSchema,

  clear: () => {
    set({ ...formBaseState, formValue: { ...initFormValue } });
  },
}));

/* TODO : 컴포넌트 이름을 확인해주세요 */
function TaxonomyEdit() {
  /* formStore state input 변수 */
  const { errors, changeInput, getDetail, formType, formValue, isDirty, save, remove, cancel, clear } =
    HazardTaxonomyEditStore();

  const {
    // hazardLv1Id,
    // hazardLv2Id,
    // hazardLv3Id,
    lvText1,
    lvText2,
    lvText3,
    hazardDetail,
    sources,
    potentialConsequence,
    useYn,
    notes,
    viewOrder,
  } = formValue;

  const { detailId } = useParams();

  useFormDirtyCheck(isDirty);

  useEffect(() => {
    if (detailId && detailId !== 'add') {
      getDetail(detailId);
    }
    return clear;
  }, []);

  return (
    <>
      <AppNavigation />
      <div className="conts-title">
        <h2>Taxonomy 신규</h2>
      </div>
      <div className="editbox">
        <div className="form-table line">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppSelect
                id="HazardTaxonomyEditStorelvText1"
                name="lvText1"
                label={'Level1'}
                //options={}
                value={lvText1}
                onChange={(value) => changeInput('lvText1', value)}
                errorMessage={errors.lvText1}
                required
              />
            </div>
          </div>
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppTextInput label="Level1" disabled />
            </div>
          </div>
        </div>
        <hr className="line dp-n"></hr>

        <div className="form-table line">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppSelect
                id="HazardTaxonomyEditStorelvText2"
                name="lvText2"
                label={'Level2'}
                //options={}
                value={lvText2}
                onChange={(value) => changeInput('lvText2', value)}
                errorMessage={errors.lvText2}
                required
              />
            </div>
          </div>
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppTextInput label="Level2" disabled />
            </div>
          </div>
        </div>
        <hr className="line dp-n"></hr>

        <div className="form-table line">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                id="HazardTaxonomyEditStorelvText3"
                name="lvText3"
                label={'Level3'}
                value={lvText3}
                onChange={(value) => changeInput('lvText3', value)}
                errorMessage={errors.lvText3}
                required
              />
            </div>
          </div>
        </div>

        <hr className="line dp-n"></hr>
        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                id="HazardTaxonomyEditStorehazardDetail"
                name="hazardDetail"
                label={'위해요인 내용'}
                value={hazardDetail}
                onchange={(value) => changeInput('hazardDetail', value)}
                errorMessage={errors.hazardDetail}
              />
            </div>
          </div>
        </div>

        <hr className="line"></hr>
        <div className="form-table line">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                id="HazardTaxonomyEditStoresources"
                name="sources"
                label={'출처'}
                value={sources}
                onchange={(value) => changeInput('sources', value)}
                errorMessage={errors.sources}
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                id="HazardTaxonomyEditStorepotentialConsequence"
                name="potentialConsequence"
                label={'잠재결과'}
                value={potentialConsequence}
                onchange={(value) => changeInput('potentialConsequence', value)}
                errorMessage={errors.potentialConsequence}
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppSelect
                id="HazardTaxonomyEditStoreuseYn"
                name="useYn"
                label={'사용여부'}
                options={Code.useYn}
                value={useYn}
                onchange={(value) => changeInput('useYn', value)}
                errorMessage={errors.useYn}
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                id="HazardTaxonomyEditStorenotes"
                name="notes"
                label={'비고'}
                value={notes}
                onchange={(value) => changeInput('notes', value)}
                errorMessage={errors.notes}
              />
            </div>
          </div>
        </div>
        <hr className="line dp-n"></hr>
        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <AppTextInput
                id="HazardTaxonomyEditStoreviewOrder"
                name="viewOrder"
                label={'정렬순서'}
                value={viewOrder}
                onchange={(value) => changeInput('viewOrder', value)}
                errorMessage={errors.viewOrder}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>
      </div>
      {/* 하단 버튼 영역 */}
      <div className="contents-btns">
        <button className="btn_text text_color_neutral-10 btn_confirm" onClick={save}>
          저장
        </button>
        <button
          className="btn_text text_color_darkblue-100 btn_close"
          onClick={remove}
          style={{ display: formType !== 'add' ? '' : 'none' }}
        >
          삭제
        </button>
        <button className="btn_text text_color_darkblue-100 btn_close" onClick={cancel}>
          취소
        </button>
      </div>
    </>
  );
}
export default TaxonomyEdit;
