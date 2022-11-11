CREATE TABLE IF NOT EXISTS public.determine
(
    parking_id character varying(10) COLLATE pg_catalog."default" NOT NULL,
    person_id character varying(10) COLLATE pg_catalog."default" NOT NULL,
    distance double precision NOT NULL DEFAULT 0,
    CONSTRAINT determine_pkey PRIMARY KEY (parking_id, person_id),
    CONSTRAINT determine_parking_id_fkey FOREIGN KEY (parking_id)
    REFERENCES public.parking (parking_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,
    CONSTRAINT determine_person_id_fkey FOREIGN KEY (person_id)
    REFERENCES public.person (person_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.determine
    OWNER to g4;