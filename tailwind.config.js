module.exports = {
  theme: {
    extend: {
        colors: {
            red: '#d05353',
        },
    }
  },
  variants: {
    display: ['group-hover'],
  },
  plugins: [],
  purge: {
    // Filenames to scan for classes
    content: [
      './src/**/*.html',
      './src/**/*.js',
      './src/**/*.jsx',
      './src/**/*.ts',
      './src/**/*.tsx',
      './public/index.html',
    ],
  },
}
