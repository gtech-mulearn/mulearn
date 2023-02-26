FROM node:16.15.1 as builder

# Working dir
WORKDIR /usr/src/app


# Install dependencies
COPY package.json .
RUN npm install

# Copy whole source code
COPY . .

# Build application
RUN npm run build


FROM nginx:1.23.3-alpine
EXPOSE 80
COPY --from=builder ./usr/src/app/build /usr/share/nginx/html