# ---------- Base Image ----------
FROM mcr.microsoft.com/dotnet/sdk:8.0

# Install curl and Node.js 20
RUN apt-get update && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

WORKDIR /app

# ==============================
# Next.js
# ==============================

# Copy package files
COPY package*.json ./

# Install npm dependencies
RUN npm install

# ==============================
# .NET
# ==============================

# Copy csproj first (أفضل للـ caching)
COPY cs/*.csproj ./cs/

RUN dotnet restore ./cs/*.csproj

# Copy rest of project
COPY . .

# Build .NET project
RUN dotnet build ./cs/*.csproj -c Release

# Build Next.js
RUN npm run build

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]