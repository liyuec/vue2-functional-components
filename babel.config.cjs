module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}
/* module.exports = api => {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          useBuiltIns: 'usage',
          corejs: '3.0.0'
        }
      ]
    ],
    plugins: [
      '@babel/plugin-transform-runtime'
    ]
  };
}; */