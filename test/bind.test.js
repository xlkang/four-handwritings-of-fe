import { expect, assert } from 'chai'
import '../bind'

// 测试
var name = '我是全局的name'

var o = {
    name: '我是obj的name'
}
function test() {
    var args = Array.prototype.slice.call(arguments, 0)
    console.log(this.name)
    console.log('args', args)
}

var bindedTest = test.myBindES5(o, 1111, 2222)
bindedTest(3333)

describe('测试 bind.js',()=> {
  describe('测试 mybindES5函数', ()=> {
    it('正确 bind', ()=> {
        const fn = undefined.myBindES5(this, 5)
    })
    it('正确添加到Function原型', ()=> {
        expect(Function.prototype.myBindES5).to.not.be.undefined
    })
  })
})