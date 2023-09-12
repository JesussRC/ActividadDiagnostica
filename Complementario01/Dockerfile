# Archivo DockerFile
FROM node
# Copiamos la ruta app
COPY . /app
WORKDIR /app
# Y asi mismo se copia el contenido de los archivos package.json
COPY package*.json /
# Se instala las respectivas dependencias
RUN npm install
# Ruta 3000
EXPOSE 3000
CMD ["node","Dist/Index.js"]
