# Exemple de contenu d'un Dockerfile simple
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "run", "web"]
EXPOSE 8080
