CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS plpgsql;

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

CREATE OR REPLACE FUNCTION set_default_nbr_free_spaces()
RETURNS TRIGGER AS $$
BEGIN
    NEW.nbr_free_spaces := NEW.max;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_default_nbr_free_spaces
BEFORE INSERT ON parking
FOR EACH ROW
WHEN (NEW.nbr_free_spaces IS NULL)
EXECUTE PROCEDURE set_default_nbr_free_spaces();

CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    company VARCHAR NOT NULL,
    email VARCHAR UNIQUE,
    hash VARCHAR NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE NOT NULL
);

CREATE TABLE numberplate (
    id SERIAL PRIMARY KEY,
    str VARCHAR UNIQUE,
    person_id INT NOT NULL,
    CONSTRAINT fk_numberplate
        FOREIGN KEY (person_id)
            REFERENCES person (id)
);

CREATE TABLE reservation (
    id SERIAL PRIMARY KEY,
    numberplate_id INT NOT NULL,
    parking_id INT NOT NULL,
    day DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    CONSTRAINT fk_reservation_numberplate
            FOREIGN KEY (numberplate_id)
                REFERENCES numberplate (id),
    CONSTRAINT fk_reservation_parking
        FOREIGN KEY (parking_id)
            REFERENCES parking (id)
);

INSERT INTO parking (name, opening, closure, address, max, longitude, latitude)
VALUES
    ('Magritte', '08:30:00', '18:00:00', 'Av. du Ciseau 10, 1348 Ottignies-Louvain-la-Neuve', 50, 4.611498, 50.665886),
    ('Leclercq', '09:00:00', '19:00:00', 'Bd du S, 1348 Ottignies-Louvain-la-Neuve', 60, 4.612858, 50.666845),
    ('Wallons', '07:00:00', '16:30:00', '1348 Ottignies-Louvain-la-Neuve', 55, 4.617058, 50.669534);

INSERT INTO person (first_name, last_name, company, email, hash, is_admin)
VALUES
    ('John', 'Doe', 'Ephec', 'john@doe.be', crypt('ephec456', gen_salt('md5')), TRUE);

INSERT INTO person (first_name, last_name, company, email, hash)
VALUES
    ('Noé', 'Libon', 'UCL', 'noe@libon.be', crypt('ucl456', gen_salt('md5'))),
    ('Pauline', 'Vanderhulst', 'ULB', 'pauline@vanderhulst.be', crypt('ulb456', gen_salt('md5')));

INSERT INTO numberplate (str, person_id)
VALUES
    ('ABC123', 1),
    ('XYZ789', 2),
    ('DEF456', 3);

INSERT INTO reservation (numberplate_id, parking_id, day, start_time, end_time)
VALUES
    (1, 1, '2023-08-07', '12:30:00', '13:30:00'),
    (2, 2, '2023-08-08', '14:45:00', '15:45:00'),
    (3, 3, '2023-08-09', '16:15:00', '17:15:00');