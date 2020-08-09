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

// es6实现
Function.prototype.myBindES6 = function (context, ...args1) {
    var fn = this;
    if(typeof fn !== "function") {
        throw new ReferenceError("cannot bind non_function");
    }
    return function (...args2){
        return fn.apply(context, [...args2, ...args1])
    }
}

// 高级：支持 new，例如 new (funcA.bind(thisArg, args))
Function.prototype.myBindES6SupprotNew = function (context) {
    var slice = Array.prototype.slice
    var args1 = slice.call(arguments, 1)
    var fn = this;
    if(typeof fn !== "function") {
        throw new ReferenceError("cannot bind non_function");
    }
    function resultFn (){
        var args2 = slice.call(arguments, 0)
        
        return fn.apply(
            // 判断构造函数调用
            resultFn.prototype.isPrototypeOf(this) ? this : context, 
            args2.concat(args1)
        )
    }
    // 让new调用创建实例的原型，指向fn.prototype
    resultFn.prototype = fn.prototype

    return resultFn
}
