# ---------- Base Image ----------
FROM mcr.microsoft.com/dotnet/sdk:8.0

# Install curl and Node.js 18
RUN apt-get update && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project
COPY . .

# Build Next.js
RUN npm run build

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]