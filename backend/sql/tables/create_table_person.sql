CREATE TABLE person (
    id UUID DEFAULT gen_random_uuid() NOT NULL,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    phone_number VARCHAR NULL,
    numberplate VARCHAR NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE NOT NULL
);