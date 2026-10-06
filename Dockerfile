# ==============================================================================
# Multi-Stage Dockerfile for AGV Portfolio (Node 22 -> Nginx Unprivileged Alpine)
# ==============================================================================

# ------------------------------------------------------------------------------
# Stage 1: Build Stage (Node 22)
# ------------------------------------------------------------------------------
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency descriptors first for optimal layer caching
COPY package.json package-lock.json ./

# Deterministic dependency installation
RUN npm ci

# Copy source code and build assets
COPY . .

# Compile TypeScript and build production bundle via Vite
RUN npm run build

# ------------------------------------------------------------------------------
# Stage 2: Production Runtime Stage (Nginx Unprivileged Alpine)
# ------------------------------------------------------------------------------
FROM nginxinc/nginx-unprivileged:alpine AS runtime

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy production static assets from builder stage
COPY --from=builder --chown=nginx:nginx /app/dist /usr/share/nginx/html

# Expose default unprivileged port 8080
EXPOSE 8080

# Health check endpoint verification
HEALTHCHECK --interval=15s --timeout=3s --retries=3 --start-period=5s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

# Non-root user execution
USER nginx

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
