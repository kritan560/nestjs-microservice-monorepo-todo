```shell
cd api-2
yarn install
yarn prisma migrate dev
yarn start:dev api-2
yarn start:dev todo

# get Request (get all todos)
http://localhost:3000

# post request
http://localhost:3000

# get unique todo
http://localhost:3000/1

# delete todo
http://localhost:3000/1
```
