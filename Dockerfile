# ---------- Base Image ----------
# استخدم نسخة .NET runtime لتشغيل ملفات DLL فقط
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

# Node.js لتشغيل Next.js (إذا مشروعك يستخدم Next.js)
RUN apt-get update && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# إنشاء مجلد التطبيق
WORKDIR /app

# نسخ ملفات الـ DLL وملفات المشروع المبنية سابقًا
# إذا الملفات تُنشأ ديناميكيًا عند run، يمكنك فقط ترك Docker لتشغيل الكود عند الطلب
# COPY ./bin/Debug/net8.0/Shard.dll ./  # لا حاجة إذا تنشأ ديناميكيًا

# نسخ ملفات Next.js (إن وجدت)
COPY package*.json ./
RUN npm install
COPY . .

# بناء Next.js
RUN npm run build

# إعداد المنفذ
ENV PORT=3000
EXPOSE 3000

# نقطة الدخول لتشغيل Next.js و/أو .NET runtime
# إذا تريد تشغيل DLL ديناميكي، فهو يتم داخل الـ API الخاص بك
CMD ["npm", "start"]

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
