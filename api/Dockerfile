FROM node:22-alpine as server

ARG PORT=3333
ENV PORT=${PORT}

WORKDIR /usr/src/server
COPY package*.json ./
RUN npm install -g pnpm
COPY . /usr/src/server
RUN pnpm install --frozen-lockfile
RUN pnpm run build
RUN pnpm postinstall

EXPOSE ${PORT}

WORKDIR /usr/src/server
CMD [ "node", "dist/main.js" ]
