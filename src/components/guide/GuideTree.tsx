import AppNavigation from '@/components/common/AppNavigation';
import ApiService from '@/services/ApiService';
import CommonUtil from '@/utils/CommonUtil';
import { Tree } from 'antd';
import { useEffect, useState } from 'react';
import Config from '@/config/Config';

/*

  onChange
  value
  treeData
  fieldNames
  treeDefaultExpandAll : true / false

*/
function GuideTree() {
  const [treeData, setTreeData] = useState([]);
  const [selectValue, setSelectValue] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [checkedInfoList, setCheckedInfoList] = useState([]);

  const init = async () => {
    const apiUrl = import.meta.env.VITE_API_URL_DEPTS;
    const apiResult = await ApiService.get(apiUrl, {
      pageNum: 1,
      pageSize: 100000,
    });
    const list = apiResult.data;
    // [], 키, 상위폴더키, root 상위 기준 키
    const treeData = CommonUtil.listToTreeData(list, 'deptId', 'upperDeptCd', '-1');
    setTreeData(treeData);
  };

  const onSelect = (selectedKeys, info) => {
    // selectedKeys는 항상 [] 형식으로 전달됨
    // if(selectedKeys && selectedKeys.length) { selectedKeys[0] }
    // info.node 실제 선택된 값임
    if (selectedKeys && selectedKeys.length) {
      console.log(`selectedKeys : ${selectedKeys}`);
      console.log(`info.node : ${JSON.stringify(info.node)}`);
      setSelectValue(selectedKeys);
    }

    if (!selectedKeys || !selectedKeys.length) {
      setSelectValue(selectedKeys);
    }
  };

  const onCheck = (checkedInfo, treeInfo) => {
    const { checked } = checkedInfo;
    const deptList = treeInfo.checkedNodes || [];
    deptList.forEach((listInfo) => {
      listInfo.selectedType = 'D';
    });
    setCheckedKeys(checked || []);
    setCheckedInfoList(deptList);
  };

  const save = () => {
    console.log(`selectValue : ${JSON.stringify(selectValue)}`);
    console.log(`checkedKeys : ${JSON.stringify(checkedKeys)}`);
    console.log(`checkedInfoList : ${checkedInfoList}`);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <AppNavigation />
      <div className="conts-title">
        <h2>
          Tree :{' '}
          <a style={{ fontSize: 20 }} href={Config.hrefBasePath + `GuideTree.tsx`}>
            GuideTree
          </a>
        </h2>
      </div>
      <div className="editbox">
        <div className="form-table">
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <h3>single</h3>
              <Tree
                checkStrictly
                treeData={treeData}
                fieldNames={{ title: 'nameKor', key: 'deptCd' }}
                onSelect={onSelect}
              />
            </div>
          </div>
          <div className="form-cell wid50">
            <div className="form-group wid100">
              <h3>multiple(check)</h3>
              <Tree
                checkStrictly
                multiple={true}
                checkable={true}
                treeData={treeData}
                fieldNames={{ title: 'nameKor', key: 'deptCd' }}
                onSelect={onSelect}
                onCheck={onCheck}
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
export default GuideTree;
