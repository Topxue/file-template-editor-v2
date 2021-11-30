/** Created by xwp on 2021-11-29 */
import db from './db';

/**
 * 监听富文本删除DOM变化
 * @param target
 * @constructor
 */

export const ObserveFroalaDom = async (froala) => {
  const target = froala.$el[0];
  if (!target) return;

  // 状态锁-第一次不执行;
  let LockState = false;

  const observerOptions = {
    childList: true,  // 观察目标子节点的变化，是否有添加或者删除
    // attributes: true, // 观察属性变动
    subtree: true     // 观察后代节点，默认为 false
  }

  const observer = new MutationObserver((mutationList) => {
    if (!LockState) {
      return LockState = true;
    }
    for (let mutationRecord of mutationList) {
      if (mutationRecord.removedNodes) {
        for (let removedNode of mutationRecord.removedNodes) {
          // 查询为参数的节点-找到 不再遍历节点;
          if (removedNode?.tagName && removedNode?.hasAttribute('data-param-name')) {
            console.log(removedNode, 'removedNode...')
            const id = removedNode.id;
            // 删除数据库为当前id的数据
            db.removeItem(id);
            return;
          }
        }
      }
    }
  });
  observer.observe(target, observerOptions);
}
