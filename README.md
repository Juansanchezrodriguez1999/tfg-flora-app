# Flora App

Flora explorer is a PWA designed for flora data collection.

## Installation

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
docker build -t app_flora_frontend:1.0.0 .
```

## Run

```
docker run -p 3050:3050 -d app_flora_frontend:1.0.0 
```