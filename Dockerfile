FROM node:lts-bullseye-slim@sha256:33f306d574d22a441f6473d09c851763ff0d44459af682a2ff23b6ec8a06b03e as base

WORKDIR /usr/app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock ./

RUN npm pkg delete scripts.postinstall

RUN yarn install

COPY . ./

RUN yarn build

FROM  nginx:stable-alpine3.17-slim@sha256:9b36fe8d36d1ad2a402b97bb203709bf5e6e43c8973105fd3947e963d89d666c as production
COPY ./nginx/nginx.conf ./etc/nginx/conf.d/default.conf
COPY --from=base ./usr/app/dist ./usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
