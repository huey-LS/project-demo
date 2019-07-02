module.exports = {
  "presets": [
    [
      "@babel/preset-env", {
        "targets": {
          "node": "current",
          "ie": "9",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        },
        "useBuiltIns": "entry",
        "corejs": "3.0.1"
      }
    ]
  ],
  "plugins": [
    [ "@babel/transform-runtime", { corejs: 3 } ],
    // Stage 2
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    "@babel/plugin-proposal-function-sent",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-numeric-separator",
    "@babel/plugin-proposal-throw-expressions",

    // Stage 3
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-syntax-import-meta",
    ["@babel/plugin-proposal-class-properties", { "loose": false }],
    "@babel/plugin-proposal-json-strings",
    // ["module-resolver", {
    //   "root": ["./"],
    //   "alias": {
    //     "@": "./src"
    //   }
    // }]
  ]
}
