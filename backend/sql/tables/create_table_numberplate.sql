CREATE TABLE numberplate (
    id SERIAL PRIMARY KEY,
    str VARCHAR UNIQUE,
    person_id INT NOT NULL,
    CONSTRAINT fk_numberplate
        FOREIGN KEY (person_id)
            REFERENCES person (id)
);