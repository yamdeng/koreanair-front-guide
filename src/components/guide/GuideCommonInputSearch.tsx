import { useState } from 'react';
import AppNavigation from '../common/AppNavigation';
import AppAutoComplete from '@/components/common/AppAutoComplete';
import AppCheckbox from '@/components/common/AppCheckbox';
import AppCheckboxGroup from '@/components/common/AppCheckboxGroup';
import AppCodeSelect from '@/components/common/AppCodeSelect';
import AppDatePicker from '@/components/common/AppDatePicker';
import AppDeptSelectInput from '@/components/common/AppDeptSelectInput';
import AppRadioGroup from '@/components/common/AppRadioGroup';
import AppRangeDatePicker from '@/components/common/AppRangeDatePicker';
import AppSearchInput from '@/components/common/AppSearchInput';
import AppSelect from '@/components/common/AppSelect';
import AppTextInput from '@/components/common/AppTextInput';
import AppTreeSelect from '@/components/common/AppTreeSelect';
import AppUserSelectInput from '@/components/common/AppUserSelectInput';
import Config from '@/config/Config';

const basicCheckboxOptions = [
  {
    label: '홈',
    value: 'home',
  },
  {
    label: '항공안전',
    value: 'aviation',
  },
  {
    label: '산업안전',
    value: 'occupation',
  },
];

function GuideCommonInputSearch() {
  const [isExpandDetailSearch, setIsExpandDetailSearch] = useState(true);
  const searchParam: any = {};

  const {
    deptCd,
    nameKor,
    nameEng,
    nameChn,
    nameJpn,
    nameEtc,
    upperDeptCd,
    treeType,
    sortOrder,
    rprsnUserId,
    compCd,
    eaiYn,
  } = searchParam;

  const toggleExpandDetailSearch = () => {
    setIsExpandDetailSearch(!isExpandDetailSearch);
  };

  return (
    <>
      <AppNavigation />
      <div className="conts-title">
        <h2>
          검색 form에서 공통 input :{' '}
          <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `GuideCommonInputSearch.tsx`}>
            GuideCommonInputSearch
          </a>
        </h2>
      </div>
      <div className="boxForm">
        <div className={isExpandDetailSearch ? 'area-detail active' : 'area-detail'}>
          <div className="form-table">
            <div className="form-cell wid50">
              <div className="form-group wid100">
                <AppTextInput label="AppTextInput" value={deptCd} />
              </div>
            </div>
            <div className="form-cell wid50">
              <div className="form-group wid100">
                <AppSearchInput label="AppSearchInput" value={nameKor} />
              </div>
            </div>
          </div>
          <div className="form-table">
            <div className="form-cell wid50">
              <div className="form-group wid100">
                <AppSelect label="AppSelect" value={nameEng} options={[]} />
              </div>
            </div>
            <div className="form-cell wid50">
              <div className="form-group wid100">
                <AppCodeSelect codeGrpId="" label="AppCodeSelect" value={nameChn} />
              </div>
            </div>
          </div>
          <div className="form-table">
            <div className="form-cell wid50">
              <div className="form-group wid100">
                <AppDatePicker label="AppDatePicker" value={nameJpn} />
              </div>
            </div>
            <div className="form-cell wid50">
              <div className="form-group wid100">
                <AppRangeDatePicker label="AppRangeDatePicker" value={nameEtc} />
              </div>
            </div>
          </div>
          <div className="form-table">
            <div className="form-cell wid50">
              <div className="group-box-wrap wid100">
                <AppCheckbox label="AppCheckbox" value={upperDeptCd} />
              </div>
            </div>
            <div className="form-cell wid50">
              <div className="group-box-wrap wid100">
                <AppCheckboxGroup label="AppCheckboxGroup" options={basicCheckboxOptions} value={treeType} />
              </div>
            </div>
          </div>
          <div className="form-table">
            <div className="form-cell wid50">
              <div className="group-box-wrap wid100">
                <AppRadioGroup label="AppRadioGroup" options={basicCheckboxOptions} />
              </div>
            </div>
            <div className="form-cell wid50">
              <div className="form-group wid100">
                <AppUserSelectInput label="AppUserSelectInput" value={sortOrder} />
              </div>
            </div>
          </div>
          <div className="form-table">
            <div className="form-cell wid50">
              <div className="form-group wid100">
                <AppDeptSelectInput label="AppDeptSelectInput" value={rprsnUserId} />
              </div>
            </div>
            <div className="form-cell wid50">
              <div className="form-group wid100">
                <AppAutoComplete
                  label="AppAutoComplete"
                  value={compCd}
                  apiUrl="TODO: apiUrl"
                  labelKey="TODO: labelKey"
                  valueKey="TODO: valueKey"
                />
              </div>
            </div>
          </div>
          <div className="form-table">
            <div className="form-cell wid50">
              <div className="form-group wid100">
                <AppTreeSelect
                  label="AppTreeSelect"
                  fieldNames={{ label: '라벨키', value: 'value키' }}
                  treeData={[]}
                  treeDefaultExpandAll={false}
                  treeCheckable={false}
                  value={eaiYn}
                />
              </div>
            </div>
          </div>
          <div className="btn-area">
            <button type="button" name="button" className="btn-sm btn_text btn-darkblue-line">
              조회
            </button>
            <button type="button" name="button" className="btn-sm btn_text btn-darkblue-line">
              초기화
            </button>
          </div>
        </div>
        <button
          type="button"
          name="button"
          className={isExpandDetailSearch ? 'arrow button _control active' : 'arrow button _control'}
          onClick={toggleExpandDetailSearch}
        >
          <span className="hide">접기</span>
        </button>
      </div>
    </>
  );
}

export default GuideCommonInputSearch;
