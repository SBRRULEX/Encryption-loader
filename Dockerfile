# Use Node base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy backend files
COPY backend ./backend
WORKDIR /app/backend

# Install backend dependencies
RUN npm install

# Start server
CMD ["node", "index.js"]
