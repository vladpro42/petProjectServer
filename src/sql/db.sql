CREATE TABLE person(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    user_name VARCHAR(255),
    password VARCHAR(255),
);

CREATE TABLE todo(
    id SERIAL PRIMARY KEY,
    content VARCHAR(255),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES person (id),
);

CREATE TABLE icon(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    src VARCHAR(255),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES person (id)
);