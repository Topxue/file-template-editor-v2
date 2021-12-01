/** Created by xwp on 2021-11-10 **/
const Dom = {
  /**
   * 创建Dom
   * @param string
   * @returns {ChildNode}
   */
  create(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  },

  /**
   * 节点后插入
   * @param node
   * @param node2
   */
  after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling);
  },
  /**
   * 节点之前插入
   * @param node
   * @param node2
   */
  before(node, node2) {
    node.parentNode.insertBefore(node2, node)
  },
  /**
   * 节点添加到指定容器
   * @param parent
   * @param node
   */
  append(parent, node) {
    parent.appendChild(node)
  },
  wrap(node, parent) {
    Dom.before(node, parent)
    Dom.append(parent, node)
  },
  /**
   * 删除节点
   * @param node
   * @returns {*}
   */
  remove(node) {
    node.parentNode.removeChild(node)
    return node
  },
  /**
   * 清空节点
   * @param node
   * @returns {*[]}
   */
  empty(node) {
    // node.innerHTML = ''
    // const {childNodes}= node //childNodes = node.childNodes 的缩写
    const array = []
    let x = node.firstChild
    while (x) {
      array.push(Dom.remove(node.firstChild))
      x = node.firstChild
    }
    return array
  },
  attr(node, name, value) {
    if (arguments.length === 3) {//重载
      node.setAttribute(name, value)
    } else if (arguments.length === 2) {
      return node.getAttribute(name)
    }
  },
  text(node, string) {//适配
    if (arguments.length === 2) {
      if ('innerText' in node) {
        node.innerText = string;
      } else {
        node.textContent = string;
      }
    } else if (arguments.length === 1) {
      if ('innerText' in node) {
        return node.innerText
      } else {
        return node.textContent
      }
    }

  },
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string
    } else {
      return node.innerHTML
    }
  },
  style(node, name, value) {
    if (arguments.length === 3) {
      node.style[name] = value
    } else if ((arguments.length === 2) && (typeof name === 'string')) {
      return node.style[name]
    } else if (name instanceof Object) {
      for (let key in name) {
        node.style[key] = name[key]
      }
    }
  },
  class: {
    add(node, className) {
      node.classList.add(className)
    },
    remove(node, className) {
      node.classList.remove(className)
    },
    has(node, className) {
      return node.classList.contains(className)
    }
  },
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn)
  },
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn)
  },
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector)
  },
  /**
   * 获取Dom
   * @param elem
   */
  getElem(selector, scope) {
    return (scope || document).querySelector(selector)
  },
  /**
   * 获取Doms
   * @param selector
   * @param scope
   * @returns {NodeListOf<*>}
   */
  getElements(selector, scope) {
    return (scope || document).querySelectorAll(selector)
  },
  /**
   * 获取父节点
   * @param node
   * @returns {(() => (Node | null)) | ActiveX.IXMLDOMNode | (Node & ParentNode)}
   */
  parent(node) {
    return node.parentNode
  },
  /**
   * 获取子节点
   * @param node
   * @returns {any}
   */
  children(node) {
    return node.children
  },
  /**
   * 获取其他节点
   * @param node
   * @returns {Element[]}
   */
  siblings(node) {
    return Array.from(node.parentNode.children).filter(n => n !== node)
  },
  /**
   * 获取下一个节点
   * @param node
   * @returns {ChildNode | (() => (Node | null)) | ActiveX.IXMLDOMNode | Node}
   */
  next(node) {
    let x = node.nextSibling
    while (x && x.nodeType === 3) {
      x = x.nextSibling
    }
    return x
  },
  previous(node) {
    let x = node.previousSibling
    while (x && x.nodeType === 3) {
      x = x.previousSibling
    }
    return x
  },
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i])
    }
  },
  index(node) {
    const list = Dom.children(node.parentNode)
    let i
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break
      }
    }
    return i
  }
}

export {Dom as $}
