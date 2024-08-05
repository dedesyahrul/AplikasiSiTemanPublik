# Menggunakan image Node.js v22 sebagai base image
FROM node:22

# Menginstal Watchman dan dependensi lainnya
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    git \
    wget \
    gnupg2 \
    unzip \
    openjdk-17-jdk \
    watchman \
    && rm -rf /var/lib/apt/lists/*

# Menginstal Android SDK
RUN wget https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip -O commandlinetools-linux.zip \
    && mkdir -p /usr/local/android-sdk/cmdline-tools \
    && unzip commandlinetools-linux.zip -d /usr/local/android-sdk/cmdline-tools \
    && mv /usr/local/android-sdk/cmdline-tools/cmdline-tools /usr/local/android-sdk/cmdline-tools/tools \
    && rm commandlinetools-linux.zip

# Mengatur variabel lingkungan untuk Android SDK
ENV ANDROID_SDK_ROOT /usr/local/android-sdk
ENV PATH $PATH:$ANDROID_SDK_ROOT/cmdline-tools/tools/bin:$ANDROID_SDK_ROOT/platform-tools

# Menginstal komponen SDK yang diperlukan
RUN yes | sdkmanager --licenses \
    && sdkmanager "platforms;android-31" "platform-tools" "build-tools;31.0.0"

# Membuat direktori kerja dan menyalin proyek React Native ke dalam container
WORKDIR /app
COPY . /app

# Menginstal dependensi proyek
RUN yarn install

# Membuka port yang diperlukan
EXPOSE 8081

# Menjalankan React Native packager
CMD ["yarn", "start"]
