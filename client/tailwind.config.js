/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        celeste : "#3498DB",
        rojo : "#E74C3C",
        verde : "#00A884",//#25D366,
        verde_claro : "#82DAA2",
        verde_wsp : "#228B22"

      },
      backgroundImage:{
        "whatsapp-bg" : "url('/src/whatsapp/public/bg--whatsapp.png')"
      },
    },
  },
  plugins: [],
}