{
    "env": {
        "es6": true,
        "node": true,
        "mocha":true,
        "browser":true
    },
    "extends": "airbnb",
    "parser": "babel-eslint",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 6,
        },
    "rules": {
        "no-console": "off",
        "no-restricted-syntax": [
            "error",
            {
                "selector": "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
                "message": "Unexpected property on console object was called"
            }
        ],
        "comma-dangle":1
    }
}