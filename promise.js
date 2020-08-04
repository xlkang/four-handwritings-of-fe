/**
 * 完整版规范参考 Promises/A+
 * 
 * 核心功能：
 * 1. new Promise(fn) 其中 fn 只能为函数，且要立即执行
 * 2. promise.then(success)中的 success 会在 resolve 被调用的时候执行
 */

const STATUS = {
    pending: "pending",
    fulfilled: "fulfilled",
    rejected: "rejected",
}

function Promise2 (cb) {
    if(typeof cb !== 'function') {
        throw new TypeError('Promise resolver undefined is not a function')
    }
    // 初始化实例属性
    this.status = STATUS.pending
    this.value = undefined
    // 回调函数队列
    this.cbs = []
    // 调用参数回调函数
    cb(this._resolve.bind(this), this._resolve.bind(this))
}

// 原型方法
// then: 接收成功失败两个回调函数
Promise2.prototype.then = function (succeed, fail) {
    if(this.status === STATUS.pending) return new Promise(()=>{})
    if(this.status === STATUS.rejected) return new Promise2((_, reject) => reject(this.value))

    const handle = [];
    if (typeof succeed === "function") {
      handle[0] = succeed;
    }
    if (typeof fail === "function") {
      handle[1] = fail;
    }
    // 放好回调
    this.cbs.push(handle);
    return this;
}

Promise2.prototype.catch = function(error) {
    if(this.status !== STATUS.rejected) return this;

    if(typeof error === 'function') error(this.value)
    
    // return new Promise2(resolve => resolve(this.value))
    this.status = STATUS.fulfilled
    return this;
}

Promise2.prototype.finally = function(error) {}

// 实例内部方法
Promise2.prototype._resolve = function (res) {
    if(this.status !== STATUS.pending) return;
    // 修改状态
    this.status = STATUS.fulfilled;
    // 执行回调
    nextTick(()=>{
        this.cbs.forEach((handle) => {
            if (typeof handle[0] === "function") {
                handle[0].call(null, this.value);
            }
        });
    })
}

Promise2.prototype._reject = function (res) {
    if(this.status !== STATUS.pending) return;
    
    // 修改状态
    this.state = STATUS.rejected;
    // 执行回调
    nextTick(()=>{
        this.cbs.forEach((handle) => {
            if (typeof handle[1] === "function") {
                handle[1].call(null, this.value);
            }
        });
    })
}

// 静态方法
Promise2.resolve = function () {}
// Promise2.reject = function () {}
// Promise2.all = function () {}
// Promise2.allSettled = function () {}
// Promise2.race = function () {}

/**
 * @name nextTick
 * @description nextTick实现
 * @param {Function} fn 
 */
function nextTick(fn) {
    if (typeof process !== 'undefined' && typeof process.nextTick === "function") {
        // node环境
        return process.nextTick(fn);
    } else {
        // 实现浏览器上的nextTick，使用MutationObserver实现
        var counter = 1;
        var observer = new MutationObserver(fn);
        // 创建一个文本节点
        var textNode = document.createTextNode(String(counter));

        // 配置MutationObserver在DOM更改匹配给定选项时，通过其回调函数开始接收通知。
        observer.observe(textNode, {
            characterData: true,
        });
        // 发起一个通知
        counter += 1;
        textNode.data = String(counter);
    }
}


// 测试
// const promise1 = new Promise((resolve, reject)=>{
//     console.log('cb')
//     resolve(2)
// }).then(res=> {
//     console.log(1)
// }).then(res=> {
//     console.log(res)
//     console.log(2)
// }).then(res=> {
//     console.log(3)
// }).then(res=> {
//     console.log(4)
// }).catch(err=>{
//     console.log(err)
// }).then(res => {
//     console.log(1)
// })

// const promise2 = new Promise2((resolve, reject)=>{
//     console.log('cb')
//     resolve(2)
// }).then(res=> {
//     console.log(1)
// }).then(res=> {
//     console.log(res)
//     console.log(2)
// }).then(res=> {
//     console.log(3)
// }).then(res=> {
//     console.log(4)
// }).catch(err=>{
//     console.log(err)
// }).then(res => {
//     console.log(1)
// })

// console.log(promise1)
// console.log(promise2)

// const promise2 = Promise.resolve('aaa')
// console.log(promise2)

// console.log(promise2.then((res)=>{
//     console.log('res===', res) 
//     return 1
// }))
