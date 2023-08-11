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