# Use a Node.js image for building the Next.js app
FROM node:18 AS builder

# Define build-time environment variables
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy the rest of the app files
COPY . .


# Build the Next.js app
RUN npm run build

# Use a lightweight Node.js image for serving the built app
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the built files from the builder stage
COPY --from=builder /app/.next .next
COPY --from=builder /app/package.json .  
COPY --from=builder /app/node_modules node_modules

# Define runtime environment variables
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY

# Expose the Next.js default port
EXPOSE 3000

# Run Next.js in production mode
CMD ["npm", "start"]
