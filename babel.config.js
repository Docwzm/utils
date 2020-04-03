module.exports = function (api) {
  api && api.cache(false);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          loose: true,
          modules: false,
          targets: {
            browsers: [
              "iOS 8",
              "Android >= 4.4"
            ]
          },
          // useBuiltIns: "usage",
          useBuiltIns: false,
          // corejs: { version: 2 }
        }
      ],
      '@babel/preset-typescript'
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: false,
          helpers: true,
          regenerator: false,
          useESModules: false,
        }
      ],
      '@babel/plugin-transform-object-assign'
    ]
  };
};
