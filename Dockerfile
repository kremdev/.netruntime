FROM mcr.microsoft.com/dotnet/sdk:8.0

# تثبيت curl و Node.js 20
RUN apt-get update && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

WORKDIR /app

# نسخ ملفات Next.js فقط
COPY package*.json ./

RUN npm install

COPY . .

# بناء Next.js فقط
RUN npm run build

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]