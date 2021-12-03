/** Created by xwp on 2021-12-02 **/
import {TABLE_SELECTOR_WRAPPER} from "@/config/froala";
import tableRenderTemplate from '@/components/parameters/table';

export default {
  froala: null,
  /**
   * 初始化事件
   * @param froala
   */
  initEvent(froala) {
    this.froala = froala;

    this.getSelectTableActive();
    this.customColumns();
  },

  /**
   * table参数
   * @param next
   * @returns {string}
   */
  getTableParameter(next) {
    return `
      <div class="param-item" data-param-type="${next.type}">
        <i class="fa ${next.icon}"></i>
        <span>${next.label}</span>
      </div>
      <div class="select-table-container" uk-drop="mode: click;pos: bottom-center">
        <div class="select-table">
          <div class="uk-text-muted pg-text-panel" id="inset-table-panel">插入表格</div>
          <div class="pg-table-selector-wrapper" id="${TABLE_SELECTOR_WRAPPER}">${this.renderTableColumns()}</div>
          <hr class="uk-column-divider uk-margin-small" />
          <button class="uk-button uk-button-link custom-row-col" uk-toggle="target: #modal-custom-col">自定义行列数</button>
          <div id="modal-custom-col" class="pg-modal-custom-col" uk-modal>
            <div class="uk-modal-dialog uk-modal-body">
                <div class="uk-text-emphasis" id="custom-col-trigger-wrapper">自定义列数</div>
                <p>
                  <form class="uk-form uk-flex" id="from-custom-col">
                    <div class="uk-flex uk-flex-align-items">
                        <label class="uk-form-label uk-margin-small-right">行数</label>
                        <div class="uk-form-controls"><input class="uk-input uk-form-small" type="text" placeholder="请输入行数" required></div>
                    </div>
                     <div class="uk-flex uk-flex-align-items uk-margin-small-left">
                        <label class="uk-form-label uk-margin-small-right">列数</label>
                        <div class="uk-form-controls"><input class="uk-input uk-form-small" type="text" placeholder="请输入列数"></div>
                    </div>
                </form>
                </p>
                <p class="uk-text-right">
                    <button class="uk-button uk-button-default uk-button-small uk-modal-close" type="button">取消</button>
                    <button class="uk-button uk-button-primary uk-button-small uk-modal-close" type="button" id="submit-custom-col">确定</button>
                </p>
            </div>
        </div>
        </div>
      </div>
  `
  },

  /**
   * 渲染table参数行列
   */
  renderTableColumns() {
    const defaultColRow = 10;
    let tableTpl = '';
    for (let r = 0; r < defaultColRow; r++) {
      for (let c = 0; c < defaultColRow; c++) {
        tableTpl += `<span data-row="${r}" data-col="${c}" class="pg-row-col-item"></span>`
      }
    }
    return tableTpl;
  },

  /**
   * 选择Table行列
   */
  getSelectTableActive() {
    const TABLE_SELECTOR = document.getElementById(TABLE_SELECTOR_WRAPPER);
    const insetTablePanel = document.getElementById('inset-table-panel');

    const tds = [...TABLE_SELECTOR.childNodes];

    const mouseoverEvent = (event) => {
      const target = event.target;
      const row = target.getAttribute('data-row'),
        col = target.getAttribute('data-col');

      insetTablePanel.innerHTML = `${Number(row) + 1} x ${Number(col) + 1}`;

      tds.forEach((element) => {
        const curRow = element.getAttribute('data-row'),
          curCol = element.getAttribute('data-col');

        if (curRow <= row && curCol <= col) {
          element.classList.add('is-active-col');
        } else {
          element.classList.remove('is-active-col');
        }
      })
    }

    const mouseoutEvent = () => {
      insetTablePanel.innerHTML = '插入表格';
      tds.forEach((element) => element.classList.contains('is-active-col') && element.classList.remove('is-active-col'));
    }

    tds.forEach(element => {
      element.addEventListener('mouseover', mouseoverEvent, false);
      element.addEventListener('click', this.insetTableEvent.bind(this), false);
    });

    TABLE_SELECTOR.addEventListener('mouseleave', mouseoutEvent, false);
  },

  /**
   * 插入表格到富文本
   * @param event
   */
  async insetTableEvent(event) {
    const target = event.target;
    const row = +target.getAttribute('data-row') + 1,
      col = +target.getAttribute('data-col') + 1;

    this.froala.html.insert(await tableRenderTemplate(row, col));
  },

  /**
   * 替换table插入内容
   * @param table
   */
  replaceTableContent(table) {
    const cloneTable = table.cloneNode(true);
    table.remove();

    const fragment = document.createElement('div');
    const tableWrapper = document.createElement('div');
    tableWrapper.className = 'fr-deletable';
    tableWrapper.innerHTML = `<table class="" style="width: 100%">${cloneTable.innerHTML}</table>`;
    fragment.append(tableWrapper);

    return fragment.innerHTML;
  },

  /**
   * 自定义行列
   */
  customColumns() {
    const submitCustomBtn = document.querySelector('#submit-custom-col');

    submitCustomBtn.addEventListener('click', async () => {
      const form = document.querySelector('#from-custom-col');
      const inputs = form.getElementsByTagName('input');
      const row = inputs[0].value, col = inputs[1].value;

      this.froala.html.insert(await tableRenderTemplate(row, col))

      inputs[0].value = '';
      inputs[1].value = '';
    }, false)

  }
}
