FROM mcr.microsoft.com/dotnet/sdk:8.0

WORKDIR /app

RUN apt update && apt install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
RUN apt install -y nodejs

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npm start"]
