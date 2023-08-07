CREATE TABLE parking (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    opening TIME NULL,
    closure TIME NULL,
    address VARCHAR NOT NULL,
    max INT NOT NULL,
    nbr_free_spaces INT NULL,
    longitude FLOAT NOT NULL,
    latitude FLOAT NOT NULL
);