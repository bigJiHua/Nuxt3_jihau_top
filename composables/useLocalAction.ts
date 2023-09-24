export const LoaData = (name: string, val: string, type: string) => {
  let data: null | Object = {}
  switch (type) {
    case 'get' :
      data = JSON.parse(localStorage.getItem(name))
      break;
    case 'set' :
      val = JSON.stringify(val)
      localStorage.setItem(name, val)
      if (localStorage.getItem(name)) return true
      break;
    default:
      break;
  }
}