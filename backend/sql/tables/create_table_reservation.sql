CREATE TABLE IF NOT EXISTS public.reservation
(
    reservation_id character varying(10) COLLATE pg_catalog."default" NOT NULL,
    reservation_date date NOT NULL,
    reservation_time time without time zone NOT NULL,
    parking_id character varying(10) COLLATE pg_catalog."default",
    person_id character varying(10) COLLATE pg_catalog."default",
    CONSTRAINT reservation_pkey PRIMARY KEY (reservation_id),
    CONSTRAINT reservation_parking_id_fkey FOREIGN KEY (parking_id)
    REFERENCES public.parking (parking_id) MATCH SIMPLE
                          ON UPDATE NO ACTION
                          ON DELETE NO ACTION,
    CONSTRAINT reservation_person_id_fkey FOREIGN KEY (person_id)
    REFERENCES public.person (person_id) MATCH SIMPLE
                          ON UPDATE NO ACTION
                          ON DELETE NO ACTION
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.reservation
    OWNER to g4;