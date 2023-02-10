# Flora App

Flora explorer is a PWA designed for flora data collection.

## Installation

First complete environmet variables in a .env

```sh
pnpm i
npx prisma db pull
npx prisma generate
```

## Run

### Development

```sh
pnpm dev
```

### Production

```sh
pnpm build
pnpm start
```

## DOCKER

## Build

```
docker build -t app_flora_frontend:1.0.1 .
```

## Run

```
docker run -p 4000:4000 -d app_flora_frontend:1.0.1 --env-file ./env
```
