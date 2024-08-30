import AppNavigation from '@/components/common/AppNavigation';
import AppTreeSelect from '@/components/common/AppTreeSelect';
import { useEffect, useState } from 'react';
import ApiService from '@/services/ApiService';
import Config from '@/config/Config';

/*

  onChange
  value
  treeData
  fieldNames
  treeDefaultExpandAll : true / false
  treeCheckable : true / false

*/
function GuideAppTreeSelect() {
  const [treeData, setTreeData] = useState([]);
  const [singleSelectValue, setSingleSelectValue] = useState('');
  const [multipleSelectValue, setMultipleSelectValue] = useState([]); // []

  const init = async () => {
    const apiResult = await ApiService.get(import.meta.env.VITE_API_URL_LEFT_MENU);
    const treeData = apiResult.data || [];
    setTreeData(treeData);
  };

  const handleSingleTreeSelect = (selectKey) => {
    setSingleSelectValue(selectKey);
  };

  const handleMultipleTreeSelect = (selectKey) => {
    setMultipleSelectValue(selectKey);
  };

  const save = () => {
    console.log(`singleSelectValue : ${singleSelectValue}`);
    console.log(`multipleSelectValue : ${multipleSelectValue}`);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <AppNavigation />
      <div className="conts-title">
        <h2>
          AppTreeSelect :{' '}
          <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `GuideAppTreeSelect.tsx`}>
            GuideAppTreeSelect
          </a>
        </h2>
      </div>
      <div className="editbox">
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppTreeSelect
                showSearch
                label="AppTreeSelect(single)"
                treeNodeFilterProp="nameKor"
                treeData={treeData}
                fieldNames={{ label: 'nameKor', value: 'menuId' }}
                treeDefaultExpandAll={false}
                treeCheckable={false}
                value={singleSelectValue}
                onChange={handleSingleTreeSelect}
              />
            </div>
          </div>
        </div>
        <hr className="line"></hr>
        <div className="form-table">
          <div className="form-cell wid100">
            <div className="form-group wid100">
              <AppTreeSelect
                showSearch
                label="AppTreeSelect(multiple)"
                treeData={treeData}
                fieldNames={{ label: 'nameKor', value: 'menuId' }}
                treeDefaultExpandAll={false}
                treeCheckable={true}
                maxTagCount={5}
                value={multipleSelectValue}
                onChange={handleMultipleTreeSelect}
              />
            </div>
          </div>
        </div>
      </div>
      {/* 하단 버튼 영역 */}
      <div className="contents-btns">
        <button className="btn_text text_color_neutral-10 btn_confirm" onClick={save}>
          저장
        </button>
      </div>
    </>
  );
}
export default GuideAppTreeSelect;
