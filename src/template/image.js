/** Created by xwp on 2021-11-23 **/

/**
 * 图片参数编辑-模板
 * @param params
 * @returns {string}
 */
export const image = ({params}) => {
  // 是否必填
  const isRequired = params.isRequired;

  return `
    <!--参数名称-->
    <div class="uk-margin">
        <label class="uk-form-label">参数名称</label>
        <div class="uk-form-controls uk-margin-small-top">
          <input class="uk-input uk-form-small uk-text-emphasis accord-attr-input" type="text" name="name" value="${params?.name || ''}" placeholder="请输入参数名称">
        </div>
    </div>
     <!--填写说明-->
      <div class="uk-margin">
        <label class="uk-form-label">填写说明</label>
         <div class="uk-form-controls uk-margin-small-top">
         <textarea class="uk-textarea uk-text-emphasis accord-attr-input" name="description" placeholder="对该参数的其他说明(限100字)">${params?.description || ''}</textarea>
        </div>
      </div> 
      <!--是否必填-->
      <div class="uk-margin">
         <div class="uk-form-controls uk-margin-small-top">
          <label><input class="uk-checkbox accord-attr-input" type="checkbox" name="isRequired"  ${isRequired ? 'checked' : ''}> 必填</label>
        </div>
      </div>
  `
}
