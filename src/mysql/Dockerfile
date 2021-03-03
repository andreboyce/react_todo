FROM mysql:5.7
COPY ./rtodo_db.sql /docker-entrypoint-initdb.d/rtodo_db.sql
ENV MYSQL_DATABASE rtodo_db
ENV MYSQL_ROOT_PASSWORD dbr2rt5st0fk
ENV MYSQL_USER rtodo_db
ENV MYSQL_PASSWORD dbr2rt5st0fk
ENV MYSQL_CONTAINER_NAME mysql-server
EXPOSE 3306
