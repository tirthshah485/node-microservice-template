# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy the application code to the container
COPY . .

# Install the dependencies
RUN npm install
RUN npm run build

# Expose the port that your Node.js application listens on
EXPOSE 8080

# Define the command to run your Node.js application
ENTRYPOINT [ "npm", "run", "develop" ]