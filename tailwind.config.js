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
      content: ['./public/index.html', './src/**/*.tsx'],
  },
}
