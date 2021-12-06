/** Created by xwp on 2021-11-23 **/
import {
  fontSizeOptions,
  fontFamilyOptions,
  fontWeightOptions,
  layoutTypeOptions,
  optionSettingRender,
  borderExteriorsForCheckbox,
} from "@/template/render";
import {colorHex} from "@/utils";

/**
 * 单选-参数编辑模板
 * @param params
 */
export const radio = ({params}) => {
  // 参数名称
  const paramName = params.name || '';
  // 字体颜色
  const fontColor = colorHex(params.fontConfig.color) || '#181616';
  // 参数说明
  const description = params.description;
  // 是否必填
  const isRequired = params.isRequired;

  return `
      <!--参数名称-->
      <div class="uk-margin">
        <label class="uk-form-label">参数名称</label>
        <div class="uk-form-controls uk-margin-small-top">
          <input class="uk-input uk-form-small uk-text-emphasis accord-attr-input" type="text" name="name" value="${paramName}" placeholder="请输入参数名称">
        </div>
      </div>
       <!--布局-->
       <div class="uk-margin">
        <label class="uk-form-label">布局</label>
        <div class="uk-form-controls uk-margin-small-top">
         <select class="uk-select uk-form-small uk-text-emphasis accord-attr-input" name="layout">
             ${layoutTypeOptions(params)}
           </select>
        </div>
      </div>
       <!--外观-->
      <div class="uk-margin">
        <label class="uk-form-label">外观</label>
        <div class="uk-form-controls uk-margin-small-top">
          ${borderExteriorsForCheckbox(params)}
        </div>
      </div>
        <!--字体粗细-->
       <div class="uk-margin">
        <label class="uk-form-label">字体粗细</label>
        <div class="uk-form-controls uk-margin-small-top">
           <select class="uk-select uk-form-small uk-text-emphasis accord-style-input" name="fontWeight">
            ${fontWeightOptions(params)}
           </select>
        </div>
      </div>
      <!--字体大小-->
      <div class="uk-margin">
        <label class="uk-form-label">字体大小</label>
        <div class="uk-form-controls uk-margin-small-top">
           <select class="uk-select uk-form-small uk-text-emphasis accord-style-input" name="fontSize">
             <option value="none">请选择</option>
             ${fontSizeOptions(params)}
           </select>
        </div>
      </div>
      <!--字体-->
      <div class="uk-margin">
        <label class="uk-form-label">字体</label>
        <div class="uk-form-controls uk-margin-small-top">
           <select class="uk-select uk-form-small uk-text-emphasis accord-style-input" name="fontFamily">
             <option value="none">请选择</option>
             ${fontFamilyOptions(params)}
            </select>
        </div>
      </div>
       <!--字体颜色-->
      <div class="uk-margin">
        <label class="uk-form-label">字体颜色</label>
         <div class="uk-form-controls uk-margin-small-top uk-width-1-3">
          <input class="uk-input accord-style-input" type="color" name="color" value="${fontColor}" colorformat="hexa"/>
        </div>
      </div>
      <!--选项设置-->
      <div class="uk-margin">
        <label class="uk-form-label">选项设置</label>
         <div class="uk-form-controls uk-margin-small-top" id="pg-option-setting-wrapper">
          ${optionSettingRender(params?.options || [])}
        </div>
        <button class="uk-button uk-button-link uk-margin-small-top uk-flex" id="pg-add-option"><span uk-icon="plus"></span><span>添加选项</span></button>
      </div>
      <!--填写说明-->
      <div class="uk-margin">
        <label class="uk-form-label">填写说明</label>
         <div class="uk-form-controls uk-margin-small-top">
         <textarea class="uk-textarea uk-text-emphasis accord-attr-input" name="description" placeholder="对该参数的其他说明(限100字)">${description}</textarea>
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
