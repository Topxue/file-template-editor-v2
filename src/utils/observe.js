/** Created by xwp on 2021-11-25 **/

/**
 * 监听选项设置数据变化
 * @returns {(function(...[*]=): any)|any}
 */
export const observeMap = () => {
  const optionsMap = new Map([['param_no_delete', '请输入选项名称']]);

  const interceptors = {
    get(target, name) {
      if (typeof target[name] === "function") {
        return (...args) => Reflect.apply(target[name], target, args);
      }

      return optionsMap.get(target);
    },
    set(key, value) {
      optionsMap.set(key, value);
    },
  };

  return new Proxy(optionsMap, {
    get(target, key, receiver) {
      target = interceptors.hasOwnProperty(key) ? interceptors : target;
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      return Reflect.set(target, key, value);
    }
  });
}


export class watcher {
  constructor(opts) {
    this.$data = this.getBaseType(opts.data) === 'Object' ? opts.data : {};
    this.$watch = this.getBaseType(opts.watch) === 'Object' ? opts.watch : {};
    for (let key in opts.data) {
      this.setData(key)
    }
  }

  getBaseType(target) {
    const typeStr = Object.prototype.toString.apply(target);

    return typeStr.slice(8, -1);
  }

  setData(_key) {
    Object.defineProperty(this, _key, {
      get: function () {
        return this.$data[_key];
      },
      set: function (val) {
        const oldVal = this.$data[_key];
        if (oldVal === val) return val;
        this.$data[_key] = val;
        this.$watch[_key] && typeof this.$watch[_key] === 'function' && (
          this.$watch[_key].call(this, val, oldVal)
        );
        return val;
      },
    });
  }
}
