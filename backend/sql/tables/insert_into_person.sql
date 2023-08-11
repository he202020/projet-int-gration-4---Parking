INSERT INTO person (first_name, last_name, company, email, hash, is_admin)
VALUES
    ('John', 'Doe', 'Ephec', 'john@doe.be', crypt('ephec456', gen_salt('md5')), TRUE);

INSERT INTO person (first_name, last_name, company, email, hash)
VALUES
    ('Noé', 'Libon', 'UCL', 'noe@libon.be', crypt('ucl456', gen_salt('md5'))),
    ('Pauline', 'Vanderhulst', 'ULB', 'pauline@vanderhulst.be', crypt('ulb456', gen_salt('md5')));