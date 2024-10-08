-- public.tb_avn_report definition

-- Drop table

-- DROP TABLE public.tb_avn_report;

CREATE TABLE public.tb_avn_report (
	report_id int4 NOT NULL,
	report_docno varchar(20) NULL,
	report_type_cd varchar(50) NOT NULL,
	emp_no varchar(50) NOT NULL,
	subject_nm varchar(200) NULL,
	timezone_cd varchar(50) NULL,
	report_phase_cd varchar(50) NOT NULL,
	report_status_cd varchar(50) NOT NULL,
	reg_dt varchar(8) NOT NULL,
	change_dt varchar(8) NOT NULL,
	del_dttm timestamp(6) NULL,
	final_submitted_yn varchar(1) DEFAULT 'Y'::character varying NOT NULL,
	final_submitted_dttm timestamp(6) NULL,
	view_sn int4 NULL,
	occur_dttm date NULL,
	occur_timezone_cd varchar(50) NULL,
	occur_place_nm varchar(200) NULL,
	occur_airport_cd varchar(50) NULL,
	description_txtcn text NULL,
	file_group_seq int4 NULL,
	work_scope_cd varchar(50) NULL,
	risk_assessment_notes_cn varchar(1000) NULL,
	reg_user_id varchar(20) NOT NULL,
	reg_dttm timestamp(6) NOT NULL,
	upd_user_id varchar(20) NULL,
	upd_dttm timestamp(6) NULL,
	spi_year varchar(4) NULL,
	spi_cd varchar(50) NULL,
	risk_level_cd varchar(50) NULL,
	color_cd varchar(50) NULL,
	spi_type_cd varchar(50) NULL,
	offline_yn varchar(1) DEFAULT 'N'::character varying NULL,
	CONSTRAINT tb_avn_report_pkey PRIMARY KEY (report_id)
);


-- public.tb_avn_report_foqa_limitation definition

-- Drop table

-- DROP TABLE public.tb_avn_report_foqa_limitation;

CREATE TABLE public.tb_avn_report_foqa_limitation (
	id serial4 NOT NULL,
	event_type_id int4 NOT NULL,
	fleet_code varchar(3) NOT NULL,
	limit_txtcn varchar(1000) NULL,
	reg_dttm timestamp NOT NULL,
	reg_user_id varchar(10) NOT NULL,
	upd_dttm timestamp NOT NULL,
	upd_user_id varchar(10) NOT NULL,
	CONSTRAINT pk_tb_avn_report_foqa_limitation PRIMARY KEY (id)
);
CREATE UNIQUE INDEX tb_avn_report_foqa_limitation_id ON public.tb_avn_report_foqa_limitation USING btree (id);


-- public.tb_avn_risk_level_matrix definition

-- Drop table

-- DROP TABLE public.tb_avn_risk_level_matrix;

CREATE TABLE public.tb_avn_risk_level_matrix (
	risk_level_cd varchar(50) NOT NULL,
	color_cd varchar(50) NULL,
	score_co int4 NULL,
	reg_user_id varchar(20) NULL,
	reg_dttm timestamp(6) NULL,
	upd_user_id varchar(20) NULL,
	upd_dttm timestamp(6) NULL,
	risk_level varchar(10) NULL,
	CONSTRAINT tb_avn_risk_level_matrix_pkey PRIMARY KEY (risk_level_cd)
);


-- public.tb_avn_report_asr definition

-- Drop table

-- DROP TABLE public.tb_avn_report_asr;

CREATE TABLE public.tb_avn_report_asr (
	report_id int4 NOT NULL,
	report_dtl_type_cd varchar(50) NULL,
	runway_nm varchar(200) NULL,
	flight_phase_cd varchar(50) NULL,
	altitude_co int4 NULL,
	altitude_unit_cd varchar(50) NULL,
	speed_co int4 NULL,
	speed_unit_cd varchar(50) NULL,
	met_cd varchar(50) NULL,
	wind_one_co int4 NULL,
	wind_two_co int4 NULL,
	gust_co int4 NULL,
	visibility_nm varchar(200) NULL,
	cloud_cd varchar(50) NULL,
	altimeter_co int4 NULL,
	altimeter_unit_cd varchar(50) NULL,
	temp_co int4 NULL,
	weather_cdarr varchar(4000) NULL,
	bird_type_nm varchar(200) NULL,
	bird_size_cd varchar(50) NULL,
	bird_co_cd varchar(50) NULL,
	struck_bird_co_cd varchar(50) NULL,
	time_type_cd varchar(50) NULL,
	landing_light_yn varchar(1) DEFAULT 'Y'::character varying NOT NULL,
	pilot_warned_yn varchar(1) DEFAULT 'Y'::character varying NOT NULL,
	impact_time_nm varchar(200) NULL,
	bird_description_cn varchar(1000) NULL,
	reg_user_id varchar(20) NOT NULL,
	reg_dttm timestamp(6) NOT NULL,
	upd_user_id varchar(20) NULL,
	upd_dttm timestamp(6) NULL,
	CONSTRAINT tb_avn_report_asr_pkey PRIMARY KEY (report_id),
	CONSTRAINT fk_avn_report_asr_1 FOREIGN KEY (report_id) REFERENCES public.tb_avn_report(report_id)
);


-- public.tb_avn_report_csr definition

-- Drop table

-- DROP TABLE public.tb_avn_report_csr;

CREATE TABLE public.tb_avn_report_csr (
	report_id int4 NOT NULL,
	report_dtl_type_cd varchar(50) NULL,
	patient_type_cd varchar(50) NULL,
	occur_time_cd varchar(50) NULL,
	main_symptom_cd varchar(50) NULL,
	doctor_treatment_cd varchar(50) NULL,
	document_cd varchar(50) NULL,
	inflight_occur_location_cd varchar(50) NULL,
	injury_part_cdarr varchar(4000) NULL,
	seatbelt_view_yn varchar(1) DEFAULT 'Y'::character varying NOT NULL,
	main_cause_cd varchar(50) NULL,
	act_kind_cd varchar(50) NULL,
	pax_cls_cd varchar(50) NULL,
	cabin_occur_time varchar(4) NULL,
	cabin_occur_timezone_cd varchar(50) NULL,
	safety_inspection_type_cd varchar(50) NULL,
	check_authority_base_cd varchar(200) NULL,
	check_authority_cd varchar(50) NULL,
	finding_cd varchar(50) NULL,
	inspector_nm varchar(200) NULL,
	ciga_kind_cdarr varchar(4000) NULL,
	evidence_seized_yn varchar(1) DEFAULT 'Y'::character varying NOT NULL,
	police_called_yn varchar(1) DEFAULT 'Y'::character varying NOT NULL,
	clue_cd varchar(50) NULL,
	smoke_detector_alarm_activate_cd varchar(50) NULL,
	cabin_log_yn varchar(1) DEFAULT 'Y'::character varying NOT NULL,
	voluntary_deplane_yn varchar(1) DEFAULT 'Y'::character varying NOT NULL,
	deplane_cause_cd varchar(50) NULL,
	accompanied_pax_yn varchar(1) DEFAULT 'Y'::character varying NOT NULL,
	delayed_yn varchar(1) DEFAULT 'Y'::character varying NOT NULL,
	maintenance_defect_kind_cd varchar(50) NULL,
	etc_briefing_kind_cd varchar(50) NULL,
	etc_briefing_item_cd varchar(50) NULL,
	fire_smoke_smell_cd varchar(50) NULL,
	etc_cause_cd varchar(50) NULL,
	use_medical_equip_cdarr varchar(4000) NULL,
	car_cdarr varchar(4000) NULL,
	add_car_cdarr varchar(4000) NULL,
	use_emergency_equip_cdarr varchar(4000) NULL,
	reg_user_id varchar(20) NOT NULL,
	reg_dttm timestamp(6) NOT NULL,
	upd_user_id varchar(20) NULL,
	upd_dttm timestamp(6) NULL,
	CONSTRAINT tb_avn_report_csr_pkey PRIMARY KEY (report_id),
	CONSTRAINT fk_avn_report_csr_1 FOREIGN KEY (report_id) REFERENCES public.tb_avn_report(report_id)
);


-- public.tb_avn_report_csr_dtl_info definition

-- Drop table

-- DROP TABLE public.tb_avn_report_csr_dtl_info;

CREATE TABLE public.tb_avn_report_csr_dtl_info (
	report_id int4 NOT NULL,
	id int4 NOT NULL,
	report_dtl_info_type_cd varchar(50) NULL,
	emp_no varchar(50) NOT NULL,
	involve_cd varchar(50) NOT NULL,
	pax_nm varchar(200) NOT NULL,
	gender_cd varchar(50) NULL,
	age_co int4 NULL,
	nation_nm varchar(200) NULL,
	seat_nm varchar(200) NULL,
	hidden_find_seat_cd varchar(50) NULL,
	hidden_find_place_cd varchar(50) NULL,
	reg_user_id varchar(20) NOT NULL,
	reg_dttm timestamp(6) NOT NULL,
	upd_user_id varchar(20) NULL,
	upd_dttm timestamp(6) NULL,
	emp_nm varchar(200) NULL,
	CONSTRAINT tb_avn_report_csr_dtl_info_pkey PRIMARY KEY (report_id, id),
	CONSTRAINT fk_avn_report_csr_dtl_info_1 FOREIGN KEY (report_id) REFERENCES public.tb_avn_report_csr(report_id)
);


-- public.tb_avn_report_dsr definition

-- Drop table

-- DROP TABLE public.tb_avn_report_dsr;

CREATE TABLE public.tb_avn_report_dsr (
	report_id int4 NOT NULL,
	report_dtl_type_cd varchar(50) NOT NULL,
	reg_user_id varchar(20) NOT NULL,
	reg_dttm timestamp(6) NOT NULL,
	upd_user_id varchar(20) NULL,
	upd_dttm timestamp(6) NULL,
	category_cd varchar(50) NULL,
	CONSTRAINT tb_avn_report_dsr_pkey PRIMARY KEY (report_id),
	CONSTRAINT fk_avn_report_dsr_1 FOREIGN KEY (report_id) REFERENCES public.tb_avn_report(report_id)
);


-- public.tb_avn_report_flight definition

-- Drop table

-- DROP TABLE public.tb_avn_report_flight;

CREATE TABLE public.tb_avn_report_flight (
	report_id int4 NOT NULL,
	departure_dt varchar(8) NULL,
	flight_no varchar(20) NULL,
	reg_no varchar(20) NULL,
	aircraft_type_cd varchar(50) NULL,
	departure_airport_cd varchar(50) NULL,
	arrival_airport_cd varchar(50) NULL,
	divert_airport_cd varchar(50) NULL,
	std_time varchar(4) NULL,
	sta_time varchar(4) NULL,
	atd_time varchar(4) NULL,
	ata_time varchar(4) NULL,
	delayed_min_co int4 NULL,
	supply_nm varchar(200) NULL,
	checkin_nm varchar(200) NULL,
	departure_loc_dttm timestamp(6) NULL,
	std_loc_time varchar(4) NULL,
	sta_loc_time varchar(4) NULL,
	atd_loc_time varchar(4) NULL,
	ata_loc_time varchar(4) NULL,
	fdm_file_no_nm varchar(200) NULL,
	takeoff_rwy_nm varchar(200) NULL,
	landing_rwy_nm varchar(200) NULL,
	pf_duty_nm varchar(200) NULL,
	pm_duty_nm varchar(200) NULL,
	pf_flight_time_co int4 NULL,
	pm_flight_time_co int4 NULL,
	reg_user_id varchar(20) NOT NULL,
	reg_dttm timestamp(6) NOT NULL,
	upd_user_id varchar(20) NULL,
	upd_dttm timestamp(6) NULL,
	flight_info_na_yn varchar(1) DEFAULT 'N'::character varying NULL,
	CONSTRAINT tb_avn_report_flight_pkey PRIMARY KEY (report_id),
	CONSTRAINT fk_avn_report_flight_1 FOREIGN KEY (report_id) REFERENCES public.tb_avn_report(report_id)
);


-- public.tb_avn_report_flight_crew definition

-- Drop table

-- DROP TABLE public.tb_avn_report_flight_crew;

CREATE TABLE public.tb_avn_report_flight_crew (
	report_id int4 NOT NULL,
	emp_no varchar(50) NOT NULL,
	crew_type_cd varchar(50) NOT NULL,
	reg_user_id varchar(20) NOT NULL,
	reg_dttm timestamp(6) NOT NULL,
	upd_user_id varchar(20) NULL,
	upd_dttm timestamp(6) NULL,
	CONSTRAINT tb_avn_report_flight_crew_pkey PRIMARY KEY (report_id, emp_no),
	CONSTRAINT fk_avn_report_flight_crew_1 FOREIGN KEY (report_id) REFERENCES public.tb_avn_report_flight(report_id)
);


-- public.tb_avn_report_foqa definition

-- Drop table

-- DROP TABLE public.tb_avn_report_foqa;

CREATE TABLE public.tb_avn_report_foqa (
	report_id int4 NOT NULL,
	category varchar(50) NOT NULL,
	de_id_date date NULL,
	runway_nm varchar(3) NULL,
	go_around_yn bpchar(1) DEFAULT 'Y'::bpchar NULL,
	usa_yn bpchar(1) DEFAULT 'N'::bpchar NULL,
	flight_phase_cd varchar(50) NULL,
	event_value varchar(5) NULL,
	event_type_id int4 NULL,
	reg_user_id varchar(20) NOT NULL,
	reg_dttm timestamp(6) NOT NULL,
	upd_user_id varchar(20) NULL,
	upd_dttm timestamp(6) NULL,
	analysis_txtcn text NULL,
	old_data_risk_lev_yn bpchar(1) DEFAULT 'N'::bpchar NULL,
	CONSTRAINT tb_avn_report_foqa_pkey PRIMARY KEY (report_id),
	CONSTRAINT fk_tb_avn_report_foqa_1 FOREIGN KEY (report_id) REFERENCES public.tb_avn_report(report_id)
);


-- public.tb_avn_report_gsr definition

-- Drop table

-- DROP TABLE public.tb_avn_report_gsr;

CREATE TABLE public.tb_avn_report_gsr (
	report_id int4 NOT NULL,
	report_dtl_type_cd varchar(50) NOT NULL,
	find_notify_cd varchar(50) NULL,
	find_type_cd varchar(50) NULL,
	occur_location_cd varchar(50) NULL,
	operation_phase_cd varchar(50) NULL,
	ramp_handling_cd varchar(50) NULL,
	aircraft_damage_cause_cd varchar(50) NULL,
	ramp_status_cd varchar(50) NULL,
	weather_cdarr varchar(4000) NULL,
	injury_yn varchar(1) DEFAULT 'Y'::character varying NOT NULL,
	injury_cn varchar(1000) NULL,
	car_cn varchar(1000) NULL,
	check_kind_cd varchar(50) NULL,
	control_authority_cd varchar(50) NULL,
	reldept_cd varchar(50) NULL,
	inspection_area_cd varchar(50) NULL,
	inspection_result_cd varchar(50) NULL,
	etc_cn varchar(1000) NULL,
	irre_type_cd varchar(50) NULL,
	cgo_yn varchar(1) DEFAULT 'Y'::character varying NOT NULL,
	awb_nbr_nm varchar(200) NULL,
	pc_swt_nm varchar(200) NULL,
	commondity_nm varchar(200) NULL,
	dimension_nm varchar(200) NULL,
	orgstn_nm varchar(200) NULL,
	destination_nm varchar(200) NULL,
	imp_code_nm varchar(200) NULL,
	unid_nbr_nm varchar(200) NULL,
	psn_nm varchar(200) NULL,
	occur_cls_nm varchar(200) NULL,
	uld_nbr_nm varchar(200) NULL,
	loading_pos_nm varchar(200) NULL,
	selft_auth_yn varchar(1) DEFAULT 'Y'::character varying NOT NULL,
	reg_user_id varchar(20) NOT NULL,
	reg_dttm timestamp(6) NOT NULL,
	upd_user_id varchar(20) NULL,
	upd_dttm timestamp(6) NULL,
	CONSTRAINT tb_avn_report_gsr_pkey PRIMARY KEY (report_id),
	CONSTRAINT fk_avn_report_gsr_1 FOREIGN KEY (report_id) REFERENCES public.tb_avn_report(report_id)
);


-- public.tb_avn_report_gsr_dtl_info definition

-- Drop table

-- DROP TABLE public.tb_avn_report_gsr_dtl_info;

CREATE TABLE public.tb_avn_report_gsr_dtl_info (
	report_id int4 NOT NULL,
	id int4 NOT NULL,
	report_dtl_info_type_cd varchar(50) NULL,
	aircraft_damage_area_cd varchar(50) NULL,
	aircraft_damage_cn varchar(1000) NULL,
	rel_equip_cd varchar(50) NULL,
	reg_no_nm varchar(200) NULL,
	mntc_hist_nm varchar(200) NULL,
	rel_gsp_cd varchar(50) NULL,
	charge_dept_cd varchar(50) NULL,
	gsr_cn varchar(1000) NULL,
	reg_user_id varchar(20) NOT NULL,
	reg_dttm timestamp(6) NOT NULL,
	upd_user_id varchar(20) NULL,
	upd_dttm timestamp(6) NULL,
	CONSTRAINT tb_avn_report_gsr_dtl_info_pkey PRIMARY KEY (report_id, id),
	CONSTRAINT fk_avn_report_gsr_dtl_info_1 FOREIGN KEY (report_id) REFERENCES public.tb_avn_report_gsr(report_id)
);


-- public.tb_avn_report_hzr definition

-- Drop table

-- DROP TABLE public.tb_avn_report_hzr;

CREATE TABLE public.tb_avn_report_hzr (
	report_id int4 NOT NULL,
	anony_yn varchar(1) DEFAULT 'Y'::character varying NOT NULL,
	feedback_yn varchar(1) DEFAULT 'Y'::character varying NOT NULL,
	email_addr varchar(250) NULL,
	safety_yn varchar(1) DEFAULT 'Y'::character varying NOT NULL,
	kairs_yn varchar(1) DEFAULT 'Y'::character varying NOT NULL,
	reg_user_id varchar(20) NOT NULL,
	reg_dttm timestamp(6) NOT NULL,
	upd_user_id varchar(20) NULL,
	upd_dttm timestamp(6) NULL,
	manual_input_yn varchar(1) DEFAULT 'N'::character varying NULL,
	CONSTRAINT tb_avn_report_hzr_pkey PRIMARY KEY (report_id),
	CONSTRAINT fk_avn_report_hzr_1 FOREIGN KEY (report_id) REFERENCES public.tb_avn_report(report_id)
);


-- public.tb_avn_report_msr definition

-- Drop table

-- DROP TABLE public.tb_avn_report_msr;

CREATE TABLE public.tb_avn_report_msr (
	report_id int4 NOT NULL,
	report_dtl_type_cd varchar(50) NOT NULL,
	msr_type_cd varchar(50) NULL,
	msr_event_type_cd varchar(50) NULL,
	maintenance_scope_cd varchar(50) NULL,
	eng_cd varchar(50) NULL,
	compo_cd varchar(50) NULL,
	etc_cd varchar(50) NULL,
	reg_user_id varchar(20) NOT NULL,
	reg_dttm timestamp(6) NOT NULL,
	upd_user_id varchar(20) NULL,
	upd_dttm timestamp(6) NULL,
	CONSTRAINT tb_avn_report_msr_pkey PRIMARY KEY (report_id),
	CONSTRAINT fk_avn_report_msr_1 FOREIGN KEY (report_id) REFERENCES public.tb_avn_report(report_id)
);


-- public.tb_avn_report_msr_dtl_info definition

-- Drop table

-- DROP TABLE public.tb_avn_report_msr_dtl_info;

CREATE TABLE public.tb_avn_report_msr_dtl_info (
	report_id int4 NOT NULL,
	id int4 NOT NULL,
	report_dtl_info_type_cd varchar(50) NULL,
	nomenclature_nm varchar(200) NULL,
	part_nm varchar(200) NULL,
	serialno_nm varchar(200) NULL,
	reg_user_id varchar(20) NOT NULL,
	reg_dttm timestamp(6) NOT NULL,
	upd_user_id varchar(20) NULL,
	upd_dttm timestamp(6) NULL,
	CONSTRAINT tb_avn_report_msr_dtl_info_pkey PRIMARY KEY (report_id, id),
	CONSTRAINT fk_avn_report_msr_dtl_info_1 FOREIGN KEY (report_id) REFERENCES public.tb_avn_report_msr(report_id)
);


-- public.tb_avn_report_rsr definition

-- Drop table

-- DROP TABLE public.tb_avn_report_rsr;

CREATE TABLE public.tb_avn_report_rsr (
	report_id int4 NOT NULL,
	report_dtl_type_cd varchar(50) NOT NULL,
	rsr_type_cd varchar(50) NULL,
	stn_cd varchar(50) NULL,
	place_cdarr varchar(4000) NULL,
	place_nm varchar(200) NULL,
	weather_cdarr varchar(4000) NULL,
	work_phase_cd varchar(50) NULL,
	main_cls_cd varchar(50) NULL,
	issuer_cd varchar(50) NULL,
	casual_factor_cdarr varchar(4000) NULL,
	occur_type_cdarr varchar(4000) NULL,
	gse_cd varchar(50) NULL,
	gse_reg_no_nm varchar(200) NULL,
	aircraft_cd varchar(50) NULL,
	company_cd varchar(50) NULL,
	rel_dept_cd varchar(50) NULL,
	team_dept_cd varchar(50) NULL,
	grp_cd varchar(50) NULL,
	involve_nm varchar(200) NULL,
	penalty_type_cd varchar(50) NULL,
	penalty_cd varchar(50) NULL,
	penalty_score_nm varchar(200) NULL,
	received_dttm timestamp(6) NULL,
	closed_dttm timestamp(6) NULL,
	issue_dttm timestamp(6) NULL,
	due_dttm timestamp(6) NULL,
	reg_user_id varchar(20) NOT NULL,
	reg_dttm timestamp(6) NOT NULL,
	upd_user_id varchar(20) NULL,
	upd_dttm timestamp(6) NULL,
	submitted_nm varchar(200) NULL,
	description_txtcn text NULL,
	received_timezone_cd varchar(50) NULL,
	closed_timezone_cd varchar(50) NULL,
	CONSTRAINT tb_avn_report_rsr_pkey PRIMARY KEY (report_id),
	CONSTRAINT fk_avn_report_rsr_1 FOREIGN KEY (report_id) REFERENCES public.tb_avn_report(report_id)
);


-- public.tb_avn_report_smr definition

-- Drop table

-- DROP TABLE public.tb_avn_report_smr;

CREATE TABLE public.tb_avn_report_smr (
	report_id int4 NOT NULL,
	report_dtl_type_cd varchar(50) NULL,
	sector varchar(10) NULL,
	question_number_cn varchar(100) NULL,
	reg_dttm timestamp NOT NULL,
	reg_user_id varchar(10) NOT NULL,
	upd_dttm timestamp NOT NULL,
	upd_user_id varchar(10) NOT NULL,
	CONSTRAINT tb_avn_report_smr_pkey PRIMARY KEY (report_id),
	CONSTRAINT fk_avn_report_smr_1 FOREIGN KEY (report_id) REFERENCES public.tb_avn_report(report_id)
);