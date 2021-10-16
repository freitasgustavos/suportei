const User = require("./User")
// @ponicode
describe("User.default.init", () => {
    test("0", () => {
        let callFunction = () => {
            User.default.init("sqlite")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            User.default.init("postgres")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            User.default.init("mysql")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            User.default.init("mongo")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            User.default.init(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("checkPassword", () => {
    let inst

    beforeEach(() => {
        inst = new User.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.checkPassword("$p3onyycat")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.checkPassword("!Lov3MyPianoPony")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.checkPassword("YouarenotAllowed2Use")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.checkPassword("accessdenied4u")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.checkPassword("NoWiFi4you")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.checkPassword(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
