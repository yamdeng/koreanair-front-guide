.ag-grid-rowspan-korean {
    vertical-align: 'center' // middle
  }
  
  
  function applyGroupingRowSpan(data, columnName)  {
  
    let applyRowIndex = 0;
    let rowSpanGroupCount = 1;
    let diffValue = '';
  
    for(let index=0; index<data.length; index++) {
      const dataInfo = data[index];
      const currentValue = dataInfo[columnName];
      if(diffValue === currentValue) {
        rowSpanGroupCount++;
      } else {
        data[applyRowIndex].rowSpanGroupCount = rowSpanGroupCount;
        rowSpanGroupCount = 1;
        applyRowIndex = index;
      }
      diffValue = currentValue;
    }
  
  }
  
  function applyGroupingRowSpanByPageSize(data, columnName, pageSize)  {
  
    let applyRowIndex = 0;
    let rowSpanGroupCount = 1;
    let diffValue = '';
  
    for(let index=0; index<data.length; index++) {
      const dataInfo = data[index];
      const currentValue = dataInfo[columnName];
      if(index !== 0 && (index % pageSize === 0)) {
        data[applyRowIndex].rowSpanGroupCount = rowSpanGroupCount;
        rowSpanGroupCount = 1;
        applyRowIndex = index;
      } else {
        if(diffValue === currentValue) {
          rowSpanGroupCount++;
        } else {
          data[applyRowIndex].rowSpanGroupCount = rowSpanGroupCount;
          rowSpanGroupCount = 1;
          applyRowIndex = index;
        }
      }    
      diffValue = currentValue;
    }
  
  }
  
  
  var data = [
    {name: 'yamdeng', age: 10},
    {name: 'yamdeng1', age: 10},
    {name: 'yamdeng', age: 10},
    {name: 'yamdeng', age: 10},
    {name: 'yamdeng3', age: 10},
    {name: 'yamdeng3', age: 10},
    {name: 'yamdeng', age: 10},
    {name: 'yamdeng5', age: 10},
    {name: 'yamdeng5', age: 10},
    {name: 'yamdeng5', age: 10},
    {name: 'yamdeng5', age: 10},
    {name: 'yamdeng7', age: 10},
    {name: 'yamdeng7', age: 10},
    {name: 'yamdeng7', age: 10},
    {name: 'yamdeng7', age: 10},
    {name: 'yamdeng7', age: 10},
    {name: 'yamdeng7', age: 10},
    {name: 'yamdeng6', age: 10},
    {name: 'yamdeng7', age: 10},
    {name: 'yamdeng7', age: 10},
    {name: 'yamdeng7', age: 10},
    {name: 'yamdeng8', age: 10},
    {name: 'yamdeng8', age: 10},
    {name: 'yamdeng9', age: 10},
  ];
  
  applyGroupingRowSpanByPageSize(data, 'name', 10);