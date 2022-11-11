CREATE TABLE IF NOT EXISTS public.show_entry_exit
(
    parking_id character varying(10) COLLATE pg_catalog."default" NOT NULL,
    person_id character varying(10) COLLATE pg_catalog."default" NOT NULL,
    reservation_date date NOT NULL,
    start_time time without time zone NOT NULL,
    end_time time without time zone NOT NULL,
    CONSTRAINT show_entry_exit_pkey PRIMARY KEY (parking_id, person_id),
    CONSTRAINT show_entry_exit_parking_id_fkey FOREIGN KEY (parking_id)
    REFERENCES public.parking (parking_id) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION,
    CONSTRAINT show_entry_exit_person_id_fkey FOREIGN KEY (person_id)
    REFERENCES public.person (person_id) MATCH SIMPLE
                    ON UPDATE NO ACTION
                    ON DELETE NO ACTION
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.show_entry_exit
    OWNER to g4;