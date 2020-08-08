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
    if(typeof fn !== "function") {
        throw new ReferenceError("cannot bind non_function");
    }
    return function (){
        var args2 = slice.call(arguments, 0)
        return fn.apply(context, args2.concat(args1))
    }
}
