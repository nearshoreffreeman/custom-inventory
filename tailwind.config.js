module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: { 
   
    extend: {
     
      gridTemplateColumns: {
        // Simple 16 column grid
      

        // Complex site-specific column configuration
        'sidebar': '300px minmax(900px, 1fr)',
      },
      colors: {
        'main-dark': '#13417d',
      },  
      
    },
  },
  plugins: [],
}
