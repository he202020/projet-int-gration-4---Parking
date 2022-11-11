CREATE TABLE IF NOT EXISTS public.person
(
    person_id character varying(10) COLLATE pg_catalog."default" NOT NULL,
    person_firstname character varying(50) COLLATE pg_catalog."default" NOT NULL,
    person_lastname character varying(50) COLLATE pg_catalog."default" NOT NULL,
    person_email character varying(50) COLLATE pg_catalog."default" NOT NULL,
    person_password character varying(30) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT person_pkey PRIMARY KEY (person_id)
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.person
    OWNER to g4;