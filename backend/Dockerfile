# Use a Node.js base image with version 22
FROM node:22

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript files (if applicable)
RUN npm run build

# Expose the application port
EXPOSE 3001

# Start the application
CMD ["npm", "run", "start:prod"]