/**
 * 实现bind函数
 * 
 * 核心功能：
 * 创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
 */

// es5实现
Function.prototype.myBindES5 = function (context) {
    var slice = Array.prototype.slice
    var args1 = slice.call(arguments, 1)
    var fn = this;
    // 注意判断边界条件
    if(typeof fn !== "function") {
        throw new Error("cannot bind non_function");
    }
    return function (){
        var args2 = slice.call(arguments, 0)
        fn.apply(context, args2.concat(args1))
    }
}

// // 测试
// var name = '我是全局的name'

// var o = {
//     name: '我是obj的name'
// }
// function test() {
//     var args = Array.prototype.slice.call(arguments, 0)
//     console.log(this.name)
//     console.log('args', args)
// }

// var bindedTest = test.myBindES5(o, 1111, 2222)
// bindedTest(3333)