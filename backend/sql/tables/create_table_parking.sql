CREATE TABLE IF NOT EXISTS public.parking
(
    parking_id character varying(10) COLLATE pg_catalog."default" NOT NULL,
    parking_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    parking_opening_hour time without time zone NOT NULL,
    parking_closure_hour time without time zone NOT NULL,
    parking_adress character varying(100) COLLATE pg_catalog."default" NOT NULL,
    parking_maximum_place integer,
    CONSTRAINT parking_pkey PRIMARY KEY (parking_id)
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.parking
    OWNER to g4;