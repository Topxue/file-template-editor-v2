/** Created by xwp on 2021-12-02 **/


/**
 * 生成表头
 */
const createTableTHeader = (col) => {
  let THeaderTpl = '';
  for (let h = 0; h < col; h++) {
    THeaderTpl += `<th data-pg-th="column${h}"></th>`
  }
  return THeaderTpl;
}

/**
 * 生成table 行、列;
 * @param row
 * @param col
 */
const createTableRowCol = (row, col) => {
  let tbodyContent = '';
  for (let r = 0; r < row; r++) {
    const fragment = document.createElement('div');
    let tr = document.createElement('tr');
    for (let c = 0; c < col; c++) {
      tr.innerHTML += `<td style="width: 10%;"></td>`
    }
    fragment.append(tr);
    tbodyContent += fragment.innerHTML;
  }
  return tbodyContent;
}

export default (row, col) => {
  return `<div class="fr-deletable" data-param-name="表格1">
  <table class="" style="width: 100%;">
    <thead data-qys-table="thead">
      <tr>
       ${createTableTHeader(col)}
      </tr>
    </thead>
    <tbody>
      ${createTableRowCol(row, col)}
    </tbody>
 </table>
</div>`
}
