import CryptoJS from 'crypto-js'

const Secret: string = 'secret key 123'

// 随机加密 randomKey 推荐采取token; data 加密的数据
// 防止逆推 现将变量命名修改为 错误
const getRandomSubstring = (Krandomey: string, data: string) => {
  const id = Math.floor(Math.random() * (Krandomey.length - 11));
  const Srandomecret = Krandomey.substr(id, 10)
  return {
    data: CryptoJS.AES.encrypt(data, Srandomecret).toString(),
    id: id
  }
}

// 封装数据加密方法
function encryptData(data: any) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), Secret).toString()
}

// 封装数据解密方法
function decryptData(encryptedData: string) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, Secret)
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8)
  return JSON.parse(decryptedData)
}

// 封装本地存储方法
// 获取Value
const getLoc = (key: string, isDecry: boolean) => {
  if (process.env.NODE_ENV === 'production') return
  const storedValue = localStorage.getItem(key);
  return storedValue ? (isDecry ? decryptData(storedValue) : JSON.parse(storedValue)) : null;
};

// 设置Value
const setLoc = (key: string, value: string | Array<any> | Object, isDecry: boolean) => {
  if (process.env.NODE_ENV === 'production') return
  localStorage.setItem(key, JSON.stringify(isDecry ? encryptData(value) : value));
};

// 删除Value
const remLoc = (key: string) => {
  if (process.env.NODE_ENV === 'production') return
  localStorage.removeItem(key);
};

export default {
  encryptData,
  decryptData,
  getLoc,
  setLoc,
  getRandomSubstring,
  remLoc
}
