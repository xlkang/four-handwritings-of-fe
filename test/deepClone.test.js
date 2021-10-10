import { expect } from 'chai'
import { deepClone } from '../deepClone'

describe('test deepClone.js', () => {
    testDeepClone('deepClone')
})

function testDeepClone (fnName) {
    // 测试数据
    const ori = {
        a: 1,
        b: {
            c: 1,
            d: {
                f: "aaaa",
                g: function noop() {},
                h: undefined,
                i: null,
            }
        }
    }
    const ori2 = 2

    const cloneObj = deepClone(ori)

    describe(`test ${fnName}函数`, ()=> {
        it(`输入普通对象返回普通对象`, ()=> {
            const isPlainObj = Object.prototype.toString.call(cloneObj).slice(8, -1) === "Object";
            expect(isPlainObj).to.be.true
        })

        it(`输入普通类型直接返回`, ()=> {
            expect(deepClone(ori2)).to.equal(ori2)
        })

        it(`修改返回对像深处的数据不影响原对象`, ()=> {
            cloneObj.b.d.f = "bbbb"
            expect(cloneObj.b.d.f).to.not.equal(ori.b.d.f)
        })
    })
}