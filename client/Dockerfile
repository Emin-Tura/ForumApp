FROM node:lts-buster as builder

WORKDIR /client

COPY package.json package-lock.json ./

RUN npm install --save --legacy-peer-deps

COPY . .

RUN npm run build


EXPOSE 3000

#
# Stage 2: Nginx as a proxy & static file server
#
FROM nginx

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default nginx configuration
RUN rm /etc/nginx/conf.d/*

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy static assets from builder stage
COPY --from=builder /client/build .

# Update the nginx config with our own config file
COPY --from=builder /client/mern-template.conf /etc/nginx/conf.d/

EXPOSE 80

RUN useradd -ms /bin/bash nonroot

RUN chown -R nonroot:nonroot /etc/nginx/conf.d/ /var/cache/nginx/ /var/run/

USER nonroot

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]