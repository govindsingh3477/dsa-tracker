# Use the official Node.js image as the base image
FROM node:18-alpine AS base

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./ 

# Install dependencies
RUN npm install

# Copy the prisma folder (ensure the prisma schema is included)
COPY prisma ./prisma

# Generate Prisma client (needed to use Prisma with your application)
RUN npx prisma generate

# Copy the rest of the application code
COPY . .


# Expose the port that the Next.js application will run on
EXPOSE 3000

# Start the Next.js application (you will handle migrations separately during runtime)
CMD ["npm", "run", "dev:docker"]
