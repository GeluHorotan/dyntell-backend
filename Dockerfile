
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app



# dependencies
RUN npm install

# Expose port 5000
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
