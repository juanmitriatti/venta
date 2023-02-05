# venta
React Venta 

Comandos : 
Instalar dependencias:
yarn 

Ejecutar el proyecto :
yarn vite

Nota importante : 
En el file vite.config.js se agrego la siguiente configuración por que no andaba watch funcionality en WSL2.
server:{
  watch:{
    usePolling:true
  },
},

