# Use official Node.js image for frontend
FROM node:18

# Set working directory inside container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install all dependencies (forcefully to handle optional dependencies)
RUN npm install --force

# Copy the rest of the frontend files
COPY . .

# Expose port for Vite's development server (default is 5173)
EXPOSE 5173

# Start Vite development server
CMD ["npm", "run", "dev"]