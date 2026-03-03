FROM mcr.microsoft.com/dotnet/sdk:8.0

WORKDIR /app

RUN apt update && apt install -y nodejs npm

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npm start"]