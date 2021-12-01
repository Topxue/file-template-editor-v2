/** Created by xwp on 2021-11-26 **/
import initData from "@/utils/init-data";
import {promisify, randomId} from "@/utils/index";

/**
 * 数据库操作
 */
class DB {
  constructor({dbName = 'PG_DB', version = 1, storeName}) {
    this.dbName = dbName;
    this.storeName = storeName;
    this.version = version;

    DB.compatibleProcessing();
  }

  static compatibleProcessing() {
    const indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
    if (!indexedDB) {
      alert('当前不支持 indexedDB 数据库');
      throw Error('当前不支持 indexed 数据库');
    }
  }

  async initDB() {
    // 优先返回缓存的数据库实例
    if (this.db) return this.db;
    const request = indexedDB.open(this.dbName, this.version);
    request.onupgradeneeded = event => {
      let db = event.target.result;
      if (!db.objectStoreNames.contains(this.storeName)) {
        db.createObjectStore(this.storeName, {keyPath: 'id'});
      }
    }

    const event = await promisify(request);
    this.db = event.target.result;
    return this.db;
  }

  /**
   * 设置数据更新
   * @param key
   * @param data
   * @returns {Promise<minimist.Opts.unknown>}
   */
  async setItem(key, data) {
    // 获取数据库
    const db = await this.initDB();
    const transaction = db.transaction([this.storeName], 'readwrite');
    const objectStore = transaction.objectStore(this.storeName);
    const getResult = objectStore.get(key);

    getResult.onsuccess = (event) => {
      const res = event.target.result;
      const updateRes = {
        ...res,
        ...data,
        fontConfig: {
          ...res?.fontConfig,
          ...data?.fontConfig
        },
      }
      objectStore.put(updateRes)
    }
    // return promisify(request);
  }

  /**
   * 添加数据
   * @param data
   */
  async addItem(data) {
    const db = await this.initDB();
    const transaction = db.transaction([this.storeName], 'readwrite');
    const objectStore = transaction.objectStore(this.storeName);
    const insetData = {...initData[data.paramType], ...data, id: randomId()};
    const request = objectStore.put(insetData);

    return promisify(request);
  }

  /**
   * 获取数据
   * @param key
   * @returns {Promise<*>}
   */
  async getItem(key) {
    // 获取数据库实例
    const db = await this.initDB();
    const transaction = db.transaction([this.storeName], 'readonly');
    const objectStore = transaction.objectStore(this.storeName);
    const request = objectStore.get(key);
    const event = await promisify(request);

    return event.target.result;
  }

  /**
   * 获取所有数据
   */
  async getAll() {
    // 获取数据库实例
    const db = await this.initDB();
    const transaction = db.transaction([this.storeName], 'readonly');
    const objectStore = transaction.objectStore(this.storeName);
    const request = objectStore.getAll();
    const event = await promisify(request);
    const result = event.target.result;
    if (!result || !result.length) return;
    const map = new Map()
    for (let {key, value} of result) {
      map.set(key, value)
    }
    return map
  }

  /**
   * 删除数据
   * @param key
   * @returns {Promise<minimist.Opts.unknown>}
   */
  async removeItem(key) {
    // 获取数据库实例
    const db = await this.initDB();
    const transaction = db.transaction([this.storeName], 'readwrite');
    const objectStore = transaction.objectStore(this.storeName);
    const request = objectStore.delete(key);
    return promisify(request);
  }
}

export default new DB({storeName: 'parameters'});
