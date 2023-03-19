# Base image
FROM node:latest

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install -g nodemon

# Copy the rest of the application code to the working directory
COPY . .

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]