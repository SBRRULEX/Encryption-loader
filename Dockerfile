# Build frontend
FROM node:18 as frontend
WORKDIR /app
COPY frontend ./frontend
WORKDIR /app/frontend
RUN npm install && npm run build

# Build backend
FROM node:18
WORKDIR /app
COPY backend ./backend
WORKDIR /app/backend
RUN npm install

# Copy built frontend to backend (if serving it from Express)
COPY --from=frontend /app/frontend/build ./public

# Start server
CMD ["node", "index.js"]
