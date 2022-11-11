CREATE TABLE IF NOT EXISTS public.administrator
(
    person_id character varying(10) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT administrator_pkey PRIMARY KEY (person_id),
    CONSTRAINT administrator_person_id_fkey FOREIGN KEY (person_id)
    REFERENCES public.person (person_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.administrator
    OWNER to g4;