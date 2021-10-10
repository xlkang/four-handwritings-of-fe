function isPlainObject (target) {
  return Object.prototype.toString.call(target).slice(8, -1) === "Object"
}

/**
 * 深拷贝函数
 */
function deepClone (target) {
  if(!isPlainObject(target)) {
    // 不是普通对象直接返回
    return target;
  }

  const cloneObj = {}

  function track(_target, res) {
    Object.keys(_target).forEach((key) => {
      console.log(_target[key])
      if(isPlainObject(_target[key])) {
        // 创建新对象
        res[key] = {}
        // 继续复制
        track(_target[key], res[key])
      } else {
        // 直接赋值
        res[key] = _target[key]
      }
    })
  }

  track(target, cloneObj)

  return cloneObj
}

export {
  deepClone,
}