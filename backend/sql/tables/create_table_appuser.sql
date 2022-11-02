CREATE TABLE IF NOT EXISTS public.app_user
(
    person_id character varying(10) COLLATE pg_catalog."default" NOT NULL,
    numberplate character varying(10) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT app_user_pkey PRIMARY KEY (person_id),
    CONSTRAINT app_user_person_id_fkey FOREIGN KEY (person_id)
    REFERENCES public.person (person_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.app_user
    OWNER to g4;