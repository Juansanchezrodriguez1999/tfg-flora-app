FROM node:16.4.2-alpine AS builder

WORKDIR .
RUN npm cache clean --force
COPY . .

RUN npm i
RUN npx prisma db pull
RUN npx prisma generate
RUN npm run build

FROM node:16.4.2-alpine AS production

COPY --from=builder . .

CMD ["npm", "run", "start"]
