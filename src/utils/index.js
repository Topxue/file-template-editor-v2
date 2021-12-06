/** Created by xwp on 2021-11-11 **/
import db from "@/utils/db";

/**
 * 生成随机 ID
 * @type {function(): string}
 */
export const randomId = (num = 32) => {
  let returnStr = "", charStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < num; i++) {
    const index = Math.round(Math.random() * (charStr.length - 1));
    returnStr += charStr.substring(index, index + 1);
  }
  return returnStr;

  // return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
}


/**
 * RGB颜色转换为十六进制
 * @param color
 * @returns {string|*}
 */
export const colorHex = (color) => {
  let that = color;
  //十六进制颜色值的正则表达式
  let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  // 如果是rgb颜色表示
  if (/^(rgb|RGB)/.test(that)) {
    let aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    let strHex = "#";
    for (let i = 0; i < aColor.length; i++) {
      let hex = Number(aColor[i]).toString(16);
      if (hex.length < 2) {
        hex = '0' + hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = that;
    }
    return strHex;
  } else if (reg.test(that)) {
    let aNum = that.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return that;
    } else if (aNum.length === 3) {
      let numHex = "#";
      for (let i = 0; i < aNum.length; i += 1) {
        numHex += (aNum[i] + aNum[i]);
      }
      return numHex;
    }
  }
  return that;
}

/**
 * 将数据库实例 改为Promise
 * @param request
 * @returns {Promise<unknown>}
 */
export const promisify = (request) => {
  return new Promise((resolve, reject) => {
    request.onsuccess = resolve
    request.onerror = reject
  })
}

/**
 * 参数插入富文本校验
 * @returns {boolean}
 */
export const insertParameterVerify = () => {
  const anchorNode = window?.getSelection()?.anchorNode;
  if (anchorNode?.tagName) {
    const isExistTable = ['td', 'th'].includes(anchorNode?.tagName.toLowerCase()),
      isParameter = anchorNode?.getAttribute('data-param-type');

    return isParameter || isExistTable ? false : true;
  } else {
    return true;
  }
}

/**
 * 获取参数名称
 * @returns {string}
 */
export const getParameterName = () => {
  return `参数_${randomId(5).toLocaleLowerCase()}`;
}

/**
 * 实时更新富文本模板数据
 * @param froala
 */
const getCurrentTime = (time = +new Date()) => {
  const date = new Date(time + 8 * 3600 * 1000);
  return date.toJSON().substr(0, 19).replace('T', ' ').replace(/-/g, '-');
}

/**
 * 定时更新模板
 * @param froala
 */
export const liveUpdateFroalaTemplate = (froala) => {
  setInterval(async () => {
    await db.setItemTmp({template: froala.html.get()})
    console.log(`%c 模板保存成功✔ 更新时间: ${getCurrentTime()}`, 'color:#0f0');
  }, 60000)
}
