import withSourceView from '@/hooks/withSourceView';
import { Tree } from 'antd';
import { deptList } from '@/data/tree/dept-tree';
import CommonUtil from '@/utils/CommonUtil';

function ComponentGuideTree() {
  const treeData = CommonUtil.listToTreeData(deptList, 'DEPT_ID', 'PRNT_ID', '10073');
  return (
    <>
      <div>
        <Tree defaultExpandAll treeData={treeData} blockNode fieldNames={{ title: 'NAME_KOR', key: 'DEPT_ID' }} />
      </div>
    </>
  );
}

export default withSourceView(ComponentGuideTree);
