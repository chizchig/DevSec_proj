# Stage 1: Build the React frontend
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY app/frontend/package*.json ./
RUN npm ci
COPY app/frontend/ ./
RUN npm run build

# Stage 2: Build the Node.js backend
FROM node:20-alpine AS backend-build
WORKDIR /app/backend
COPY app/backend/package*.json ./
RUN npm ci
COPY app/backend/ ./
RUN npm run build

# Stage 3: Production environment
FROM node:20-alpine
WORKDIR /app
COPY --from=backend-build /app/backend ./backend
COPY --from=frontend-build /app/frontend/build ./frontend/build
WORKDIR /app/backend

# Install production dependencies only
RUN npm ci --only=production

# Add a non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001 -G nodejs
USER nodejs

EXPOSE 3000
CMD ["node", "server.js"]