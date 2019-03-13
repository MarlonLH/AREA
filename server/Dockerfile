FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]


# FROM node:8

# # Create app directory
# WORKDIR /usr/src/app

# # Install app dependencies
# # A wildcard is used to ensure both package.json AND package-lock.json are copied
# # where available (npm@5+)
# COPY package*.json ./

# RUN apt-get update

# # To solve add-apt-repository : command not found
# RUN apt-get -y install software-properties-common

# # Install Java
# RUN \
#   echo oracle-java8-installer shared/accepted-oracle-license-v1-1 select true | debconf-set-selections && \
#   add-apt-repository -y ppa:webupd8team/java && \
#   apt-get update && \
#   apt-get install -y oracle-java8-installer --allow-unauthenticated && \
#   rm -rf /var/lib/apt/lists/* && \
#   rm -rf /var/cache/oracle-jdk8-installer


# # Define commonly used JAVA_HOME variable
# ENV JAVA_HOME /usr/lib/jvm/java-8-oracle

# # android sdk|build-tools|image
# ENV ANDROID_TARGET_SDK="android-23,android-25,android-26" \
#   ANDROID_BUILD_TOOLS="build-tools-23.0.1,build-tools-25.0.2,build-tools-26.0.1" \
#   ANDROID_SDK_TOOLS="25.2.3" \
#   ANDROID_HOME=${SDK_HOME}/android-sdk-linux \
#   PATH=${ANDROID_HOME}/tools:${ANDROID_HOME}/platform-tools:$PATH:${ANDROID_HOME}/cmake/bin

# RUN mkdir ${ANDROID_HOME} && wget --quiet --output-document=android-sdk.zip https://dl.google.com/android/repository/tools_r${ANDROID_SDK_TOOLS}-linux.zip \
#   && unzip android-sdk.zip -d ${ANDROID_HOME}

# # Android Cmake
# RUN wget -q https://dl.google.com/android/repository/cmake-3.6.3155560-linux-x86_64.zip -O android-cmake.zip \
#   && unzip -q android-cmake.zip -d ${ANDROID_HOME}/cmake \
#   && chmod u+x ${ANDROID_HOME}/cmake/bin/ -R

# # COPY package_file ${SDK_HOME}/

# RUN chmod 777 android-sdk-linux/tools/android \
#   && echo y | android-sdk-linux/tools/android --silent update sdk --no-ui --all --filter "${ANDROID_TARGET_SDK}" \
#   && echo y | android-sdk-linux/tools/android --silent update sdk --no-ui --all --filter platform-tools \
#   && echo y | android-sdk-linux/tools/android --silent update sdk --no-ui --all --filter "${ANDROID_BUILD_TOOLS}" \
#   && echo y | android-sdk-linux/tools/android --silent update sdk --no-ui --all --filter extra-android-m2repository \
#   && echo y | android-sdk-linux/tools/android --silent update sdk --no-ui --all --filter extra-google-google_play_services \
#   && echo y | android-sdk-linux/tools/android --silent update sdk --no-ui --all --filter extra-google-m2repository
#   # && echo y | android-sdk-linux/tools/bin/sdkmanager --package_file=package_file

# RUN npm install
# # If you are building your code for production
# # RUN npm install --only=production



# # Bundle app source
# COPY . .

# RUN pwd
# RUN ls
# RUN npm install -C ./mobile-client
# RUN ls /home/node
# RUN cd ./mobile-client/android/ && ./gradlew assembleRelease

# EXPOSE 8080
# # CMD [ "cd", "./mobile-client"]
# # CMD [ "npm", "install"]
# # CMD [ "cd", "./android"]
# # CMD [ "./gradlew", "assembleRelease"]
# # CMD [ "cd", "../../"]
# CMD [ "npm", "start" ]