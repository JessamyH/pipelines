# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY src/package*.json ./

# Install all dependencies (including dev dependencies for testing)
RUN npm install

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy dependencies from builder
COPY --from=builder /app/node_modules ./node_modules

# Copy application files
COPY src/ .
COPY tests/ ./tests/
COPY wait-for.sh /wait-for.sh

# Make wait-for.sh executable
RUN chmod +x /wait-for.sh

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "app.js"]
