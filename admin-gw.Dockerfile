FROM ubuntu:latest

USER root

EXPOSE 8080

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get dist-upgrade -y
RUN apt-get install curl -y
#htop git zip nano ncdu build-essential chrpath libssl-dev libxft-dev pkg-config glib2.0-dev libexpat1-dev gobject-introspection python-gi-dev apt-transport-https libgirepository1.0-dev libtiff5-dev libjpeg-turbo8-dev libgsf-1-dev fail2ban nginx -y

# Install Node.js
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash
RUN apt-get install --yes nodejs
RUN node -v
RUN npm -v

# Cleanup
RUN apt-get update && apt-get upgrade -y && apt-get autoremove -y

RUN npm config set package-lock false
RUN npm i yarn -g --yes

WORKDIR /app

COPY ./src/admin-gw/src ./src/admin-gw/src
COPY ./src/admin-gw/.env.production ./src/admin-gw/
COPY ./src/admin-gw/package.json ./src/admin-gw/
COPY ./packages ./packages
COPY ./package.json ./
COPY ./lerna.json ./
COPY ./yarn.lock ./

RUN yarn

WORKDIR ./src/admin-gw

ENTRYPOINT ["yarn", "run", "start"]
