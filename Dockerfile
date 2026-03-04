FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY . .

RUN dotnet restore
RUN dotnet build -c Debug --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

COPY --from=build /app/bin/Debug/net8.0 ./

EXPOSE 3000

ENTRYPOINT ["dotnet", "Shard.dll"]

# FROM mcr.microsoft.com/dotnet/sdk:8.0

# RUN apt-get update && apt-get install -y curl \
#     && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
#     && apt-get install -y nodejs

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# ENV PORT=3000
# EXPOSE 3000

# CMD ["npm", "start"]
