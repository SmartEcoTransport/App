FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . ./

# Build the web app
RUN npm run build:web

# Use a lightweight web server for serving the built web app
FROM nginx:alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static files
RUN rm -rf ./*

# Copy the built app from the builder stage
COPY --from=builder /app/web-build ./

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Set environment variables for writable directories
ENV EXPO_CLI_WORKSPACE_DIR=/tmp/.expo

# Expose port 8080
EXPOSE 8080

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
