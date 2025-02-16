```shell

sudo docker run \
    --name postgres \
    -e POSTGRES_PASSWORD=postgres \
    -e POSTGRES_USER=postgres \
    -e POSTGRES_DB=postgres \
    -p 5432:5432 \
    -d \
    postgres

sudo docker run \
    --name adminer \
    -p 8080:8080 \
    --link postgres:postgres \
    -d \
    adminer


```
