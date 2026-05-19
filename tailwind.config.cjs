module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#00d4ff',
        cyan: '#00e5ff',
        accent: '#7c3aed'
      },
      backgroundImage: {
        'cloud-gradient': 'radial-gradient(ellipse at center, rgba(0,212,255,0.06), transparent 40%)'
      }
    }
  },
  plugins: []
}
