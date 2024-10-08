-- public.tb_avn_sm_group definition

-- Drop table

-- DROP TABLE public.tb_avn_sm_group;

CREATE TABLE public.tb_avn_sm_group (
	id serial4 NOT NULL,
	report_type varchar(50) NOT NULL,
	phase varchar(50) NOT NULL,
	state_type varchar(50) NOT NULL,
	assessment_notes text NULL,
	is_statistics_only varchar(1) DEFAULT 'N'::character varying NULL,
	ear_no varchar(50) NULL,
	is_hf varchar(1) NULL,
	is_avn_hzd varchar(1) DEFAULT 'N'::character varying NULL,
	is_ocu_hzd varchar(1) DEFAULT 'N'::character varying NULL,
	is_sfty_hzd varchar(1) DEFAULT 'N'::character varying NULL,
	time_zone varchar(50) NOT NULL,
	reg_dttm timestamp NOT NULL,
	reg_user_id varchar(10) NOT NULL,
	upd_dttm timestamp NOT NULL,
	upd_user_id varchar(10) NOT NULL,
	is_lsc_close varchar(1) DEFAULT 'N'::character varying NULL,
	is_ocu_close varchar(1) DEFAULT 'N'::character varying NULL,
	division varchar(10) NULL,
	change_mgmt_id int4 NULL,
	CONSTRAINT pk_tb_avn_sm_group PRIMARY KEY (id)
);
CREATE UNIQUE INDEX tb_avn_sm_group_id ON public.tb_avn_sm_group USING btree (id);


-- public.tb_avn_sm_lsc_group definition

-- Drop table

-- DROP TABLE public.tb_avn_sm_lsc_group;

CREATE TABLE public.tb_avn_sm_lsc_group (
	id serial4 NOT NULL,
	user_id numeric(19) NOT NULL,
	group_name varchar(30) NOT NULL,
	deleted_at timestamp NULL,
	timezone varchar(50) NOT NULL,
	reg_dttm timestamp NOT NULL,
	reg_user_id varchar(10) NOT NULL,
	upd_dttm timestamp NOT NULL,
	upd_user_id varchar(10) NOT NULL,
	CONSTRAINT pk_tb_avn_sm_lsc_group PRIMARY KEY (id)
);
CREATE UNIQUE INDEX tb_avn_sm_lsc_group_id ON public.tb_avn_sm_lsc_group USING btree (id);


-- public.tb_avn_sm_reception definition

-- Drop table

-- DROP TABLE public.tb_avn_sm_reception;

CREATE TABLE public.tb_avn_sm_reception (
	id serial4 NOT NULL,
	group_id int4 NOT NULL,
	emp_no varchar(10) NOT NULL,
	ata_adapter_type varchar(50) DEFAULT ''::character varying NULL,
	event_followup text NULL,
	control_dept_type varchar(20) NULL,
	event_summary text NULL,
	classification varchar(50) DEFAULT ''::character varying NULL,
	is_spi varchar(1) DEFAULT 'N'::character varying NULL,
	deleted_at timestamp(6) NULL,
	timezone varchar(50) NOT NULL,
	receipted_at timestamp NULL,
	is_receipted varchar(1) DEFAULT 'N'::character varying NULL,
	is_asmr varchar(1) DEFAULT 'N'::character varying NULL,
	sector varchar(10) DEFAULT ''::character varying NULL,
	due_date varchar(10) NULL,
	add_category varchar(50) NULL,
	is_ground_accident varchar(1) NULL,
	reg_dttm timestamp NOT NULL,
	reg_user_id varchar(10) NOT NULL,
	upd_dttm timestamp NOT NULL,
	upd_user_id varchar(10) NOT NULL,
	file_group_seq int4 NULL,
	CONSTRAINT pk_tb_avn_sm_reception PRIMARY KEY (id),
	CONSTRAINT tb_avn_sm_reception_un UNIQUE (group_id)
);
CREATE UNIQUE INDEX tb_avn_sm_reception_id ON public.tb_avn_sm_reception USING btree (id);


-- public.tb_avn_sms_inspect definition

-- Drop table

-- DROP TABLE public.tb_avn_sms_inspect;

CREATE TABLE public.tb_avn_sms_inspect (
	check_year varchar(4) NOT NULL,
	final_score numeric(10, 3) NULL,
	safety_policy_target_score numeric(10, 3) NULL,
	aviation_safety_risk_mgmt_score numeric(10, 3) NULL,
	aviation_safety_assurance_score numeric(10, 3) NULL,
	avition_safety_increased_score numeric(10, 3) NULL,
	flight_score numeric(10, 3) NULL,
	maintenance_score numeric(10, 3) NULL,
	total_operations_score numeric(10, 3) NULL,
	cabin_score numeric(10, 3) NULL,
	passenger_score numeric(10, 3) NULL,
	cargo_score numeric(10, 3) NULL,
	oy_score numeric(10, 3) NULL,
	reg_user_id varchar(20) NULL,
	reg_dttm date NULL,
	upd_user_id varchar(20) NULL,
	upd_dttm date NULL,
	CONSTRAINT tb_avn_sms_inspect_pkey PRIMARY KEY (check_year)
);


-- public.tb_avn_sm_approval_log definition

-- Drop table

-- DROP TABLE public.tb_avn_sm_approval_log;

CREATE TABLE public.tb_avn_sm_approval_log (
	id serial4 NOT NULL,
	group_id int4 NOT NULL,
	state_type varchar(50) NOT NULL,
	phase varchar(50) NOT NULL,
	step_code varchar(50) NOT NULL,
	emp_no varchar(10) NOT NULL,
	reason varchar(255) NULL,
	timezone varchar(50) NOT NULL,
	reg_dttm timestamp NOT NULL,
	reg_user_id varchar(10) NOT NULL,
	upd_dttm timestamp NOT NULL,
	upd_user_id varchar(10) NOT NULL,
	CONSTRAINT pk_tb_avn_sm_approval_log PRIMARY KEY (id),
	CONSTRAINT fk_tb_sm_group_report_approval_log FOREIGN KEY (group_id) REFERENCES public.tb_avn_sm_group(id)
);
CREATE UNIQUE INDEX tb_avn_sm_approval_log_id ON public.tb_avn_sm_approval_log USING btree (id);
CREATE INDEX tb_avn_sm_approval_log_report_id_idx ON public.tb_avn_sm_approval_log USING btree (group_id);


-- public.tb_avn_sm_comment definition

-- Drop table

-- DROP TABLE public.tb_avn_sm_comment;

CREATE TABLE public.tb_avn_sm_comment (
	id serial4 NOT NULL,
	group_id int4 NOT NULL,
	hazard_id int4 NULL,
	emp_no varchar(10) NOT NULL,
	"content" text NULL,
	timezone varchar(50) NOT NULL,
	deleted_at timestamp(6) NULL,
	reg_dttm timestamp NOT NULL,
	reg_user_id varchar(10) NOT NULL,
	upd_dttm timestamp NOT NULL,
	upd_user_id varchar(10) NOT NULL,
	CONSTRAINT pk_tb_avn_sm_comment PRIMARY KEY (id),
	CONSTRAINT fk_tb_avn_sm_report_comment FOREIGN KEY (group_id) REFERENCES public.tb_avn_sm_group(id)
);
CREATE UNIQUE INDEX tb_avn_sm_comment_id ON public.tb_avn_sm_comment USING btree (id);


-- public.tb_avn_sm_group_list definition

-- Drop table

-- DROP TABLE public.tb_avn_sm_group_list;

CREATE TABLE public.tb_avn_sm_group_list (
	id serial4 NOT NULL,
	group_id serial4 NOT NULL,
	report_id int4 NOT NULL,
	is_main_report varchar(1) DEFAULT 'N'::character varying NULL,
	time_zone varchar(50) NOT NULL,
	reg_dttm timestamp NOT NULL,
	reg_user_id varchar(10) NOT NULL,
	upd_dttm timestamp NOT NULL,
	upd_user_id varchar(10) NOT NULL,
	CONSTRAINT pk_tb_avn_sm_group_list PRIMARY KEY (id),
	CONSTRAINT fk_tb_avn_sm_group_group_list FOREIGN KEY (group_id) REFERENCES public.tb_avn_sm_group(id)
);
CREATE UNIQUE INDEX tb_avn_sm_group_list_id ON public.tb_avn_sm_group_list USING btree (id);


-- public.tb_avn_sm_lsc definition

-- Drop table

-- DROP TABLE public.tb_avn_sm_lsc;

CREATE TABLE public.tb_avn_sm_lsc (
	id serial4 NOT NULL,
	reception_id int4 NOT NULL,
	emp_no varchar(10) NOT NULL,
	member_type varchar(20) DEFAULT 'member'::character varying NULL,
	timezone varchar(50) NOT NULL,
	deleted_at timestamp NULL,
	reg_dttm timestamp NOT NULL,
	reg_user_id varchar(10) NOT NULL,
	upd_dttm timestamp NOT NULL,
	upd_user_id varchar(10) NOT NULL,
	CONSTRAINT pk_tb_avn_sm_lsc PRIMARY KEY (id),
	CONSTRAINT fk_tb_avn_sm_reception_lsc FOREIGN KEY (reception_id) REFERENCES public.tb_avn_sm_reception(id)
);
CREATE INDEX tb_avn_sm_lsc_reception_id_idx ON public.tb_avn_sm_lsc USING btree (reception_id);


-- public.tb_avn_sm_lsc_group_member definition

-- Drop table

-- DROP TABLE public.tb_avn_sm_lsc_group_member;

CREATE TABLE public.tb_avn_sm_lsc_group_member (
	id serial4 NOT NULL,
	group_id int4 NOT NULL,
	emp_no varchar(10) NOT NULL,
	member_type varchar(20) NOT NULL,
	timezone varchar(50) NOT NULL,
	deleted_at timestamp NULL,
	reg_dttm timestamp NOT NULL,
	reg_user_id varchar(10) NOT NULL,
	upd_dttm timestamp NOT NULL,
	upd_user_id varchar(10) NOT NULL,
	CONSTRAINT pk_tb_avn_sm_lsc_group_member PRIMARY KEY (id),
	CONSTRAINT unique_groupid_empno UNIQUE (group_id, emp_no),
	CONSTRAINT fk_tb_avn_sm_lsc_group_member FOREIGN KEY (group_id) REFERENCES public.tb_avn_sm_lsc_group(id)
);
CREATE UNIQUE INDEX tb_avn_sm_lsc_group_member_id ON public.tb_avn_sm_lsc_group_member USING btree (id);


-- public.tb_avn_sm_reception_foqa definition

-- Drop table

-- DROP TABLE public.tb_avn_sm_reception_foqa;

CREATE TABLE public.tb_avn_sm_reception_foqa (
	id serial4 NOT NULL,
	reception_id int4 NOT NULL,
	foqa_usa bpchar(1) DEFAULT 'Y'::bpchar NULL,
	foqa_metar varchar(200) NOT NULL,
	foqa_go_around bpchar(1) NULL,
	foqa_valid bpchar(1) DEFAULT 'Y'::bpchar NULL,
	CONSTRAINT pk_sm_reception_foqa PRIMARY KEY (id),
	CONSTRAINT fk_sm_reception_foqa FOREIGN KEY (reception_id) REFERENCES public.tb_avn_sm_reception(id)
);
CREATE UNIQUE INDEX tb_avn_sm_reception_foqa_id ON public.tb_avn_sm_reception_foqa USING btree (id);


-- public.tb_avn_sm_reception_foqax_comments definition

-- Drop table

-- DROP TABLE public.tb_avn_sm_reception_foqax_comments;

CREATE TABLE public.tb_avn_sm_reception_foqax_comments (
	id serial4 NOT NULL,
	group_id int4 NOT NULL,
	appoved_type varchar(10) NOT NULL,
	appoved_emp_no varchar(10) NOT NULL,
	decision_type varchar(10) DEFAULT 'I'::bpchar NULL,
	decision_comments varchar(10) NULL,
	reg_user_id varchar(10) NOT NULL,
	reg_dttm timestamp NOT NULL,
	upd_user_id varchar(10) NOT NULL,
	upd_dttm timestamp NOT NULL,
	CONSTRAINT tb_avn_sm_reception_foqax_comments_pk PRIMARY KEY (id),
	CONSTRAINT fk_tb_avn_sm_reception_foqax_comments FOREIGN KEY (group_id) REFERENCES public.tb_avn_sm_group(id)
);
CREATE UNIQUE INDEX tb_avn_sm_reception_foqax_comments_id ON public.tb_avn_sm_reception_foqax_comments USING btree (id);


-- public.tb_avn_sm_reception_hzr definition

-- Drop table

-- DROP TABLE public.tb_avn_sm_reception_hzr;

CREATE TABLE public.tb_avn_sm_reception_hzr (
	hazard_benefit_id int4 NOT NULL,
	reception_id int4 NOT NULL,
	CONSTRAINT fk_tb_avn_sm_reception_hazard_benefit FOREIGN KEY (reception_id) REFERENCES public.tb_avn_sm_reception(id)
);


-- public.tb_avn_sm_reception_ke_event definition

-- Drop table

-- DROP TABLE public.tb_avn_sm_reception_ke_event;

CREATE TABLE public.tb_avn_sm_reception_ke_event (
	reception_id int4 NOT NULL,
	event_id int4 NOT NULL,
	CONSTRAINT fk_tb_avn_sm_reception_ke_event FOREIGN KEY (reception_id) REFERENCES public.tb_avn_sm_reception(id)
);


-- public.tb_avn_sm_reception_msr_email definition

-- Drop table

-- DROP TABLE public.tb_avn_sm_reception_msr_email;

CREATE TABLE public.tb_avn_sm_reception_msr_email (
	id serial4 NOT NULL,
	reception_id int4 NOT NULL,
	emp_no varchar(10) NOT NULL,
	reg_user_id varchar(10) NOT NULL,
	reg_dttm timestamp NOT NULL,
	upd_user_id varchar(10) NOT NULL,
	upd_dttm timestamp NOT NULL,
	CONSTRAINT tb_avn_sm_reception_msr_email_pk PRIMARY KEY (id),
	CONSTRAINT fk_tb_avn_sm_reception_msr_email FOREIGN KEY (reception_id) REFERENCES public.tb_avn_sm_reception(id)
);
CREATE UNIQUE INDEX tb_avn_sm_reception_msr_email_id ON public.tb_avn_sm_reception_msr_email USING btree (id);


-- public.tb_avn_sm_report_fr_account definition

-- Drop table

-- DROP TABLE public.tb_avn_sm_report_fr_account;

CREATE TABLE public.tb_avn_sm_report_fr_account (
	group_id int4 NOT NULL,
	account_acnt_id numeric(19) NOT NULL,
	role_type varchar(50) NOT NULL,
	acnt_type varchar(1) NULL,
	CONSTRAINT uk_tb_avn_sm_report_fr_account UNIQUE (group_id, account_acnt_id, role_type),
	CONSTRAINT fk_tb_avn_sm_report_fr_account FOREIGN KEY (group_id) REFERENCES public.tb_avn_sm_group(id)
);
CREATE INDEX ix_tb_avn_sm_report_fr_account_account_acnt_id ON public.tb_avn_sm_report_fr_account USING btree (account_acnt_id);
CREATE INDEX ix_tb_avn_sm_report_fr_account_reports_id ON public.tb_avn_sm_report_fr_account USING btree (group_id);


-- public.tb_avn_sm_report_hazard_ocu definition

-- Drop table

-- DROP TABLE public.tb_avn_sm_report_hazard_ocu;

CREATE TABLE public.tb_avn_sm_report_hazard_ocu (
	id serial4 NOT NULL,
	group_id int4 NOT NULL,
	hazard_id int4 NOT NULL,
	consequence_id int4 NULL,
	emp_no varchar(10) NOT NULL,
	reg_dttm timestamp NOT NULL,
	reg_user_id varchar(10) NOT NULL,
	upd_dttm timestamp NOT NULL,
	upd_user_id varchar(10) NOT NULL,
	CONSTRAINT pk_tb_avn_sm_report_hazard_ocu PRIMARY KEY (id),
	CONSTRAINT fk_tb_avn_sm_report_report_hazard FOREIGN KEY (group_id) REFERENCES public.tb_avn_sm_group(id)
);
CREATE UNIQUE INDEX tb_avn_sm_report_hazard_ocu_id ON public.tb_avn_sm_report_hazard_ocu USING btree (id);
CREATE INDEX tb_avn_sm_report_hazard_ocu_report_id_idx ON public.tb_avn_sm_report_hazard_ocu USING btree (group_id);


-- public.tb_avn_sm_report_view_log definition

-- Drop table

-- DROP TABLE public.tb_avn_sm_report_view_log;

CREATE TABLE public.tb_avn_sm_report_view_log (
	id serial4 NOT NULL,
	group_id int4 NOT NULL,
	emp_no varchar(10) NOT NULL,
	timezone varchar(50) NOT NULL,
	reg_dttm timestamp NOT NULL,
	reg_user_id varchar(10) NOT NULL,
	upd_dttm timestamp NOT NULL,
	upd_user_id varchar(10) NOT NULL,
	CONSTRAINT pk_tb_avn_sm_report_view_log PRIMARY KEY (id),
	CONSTRAINT fk_tb_avn_sm_report_report_view_log FOREIGN KEY (group_id) REFERENCES public.tb_avn_sm_group(id)
);
CREATE UNIQUE INDEX idx_tb_avn_sm_report_view_log_id ON public.tb_avn_sm_report_view_log USING btree (id);
CREATE INDEX ix_tb_avn_sm_report_view_log_group_id ON public.tb_avn_sm_report_view_log USING btree (group_id);


-- public.tb_avn_sm_assurance definition

-- Drop table

-- DROP TABLE public.tb_avn_sm_assurance;

CREATE TABLE public.tb_avn_sm_assurance (
	id serial4 NOT NULL,
	group_id int4 NOT NULL,
	hazard_id int4 NOT NULL,
	status varchar(10) DEFAULT ''::character varying NULL,
	review varchar(1000) NULL,
	emp_no varchar(50) NULL,
	is_old varchar(1) DEFAULT 'N'::character varying NOT NULL,
	reg_dttm timestamp NOT NULL,
	reg_user_id varchar(10) NOT NULL,
	upd_dttm timestamp NOT NULL,
	upd_user_id varchar(10) NOT NULL,
	CONSTRAINT pk_tb_avn_sm_assurance PRIMARY KEY (id)
);
CREATE UNIQUE INDEX sm_assurance_id ON public.tb_avn_sm_assurance USING btree (id);


-- public.tb_avn_sm_foqa_hazard definition

-- Drop table

-- DROP TABLE public.tb_avn_sm_foqa_hazard;

CREATE TABLE public.tb_avn_sm_foqa_hazard (
	id serial4 NOT NULL,
	risk_mgmt_id int4 NOT NULL,
	hazard_id int4 DEFAULT '-1'::integer NULL,
	foqa_risk_level varchar(20) NULL,
	occur varchar(10) NULL,
	related_doc varchar(255) NULL,
	CONSTRAINT pk_tb_avn_sm_foqa_hazard PRIMARY KEY (id)
);
CREATE UNIQUE INDEX sm_foqa_hazard_id ON public.tb_avn_sm_foqa_hazard USING btree (id);


-- public.tb_avn_sm_foqa_risk_level_event_ke_event definition

-- Drop table

-- DROP TABLE public.tb_avn_sm_foqa_risk_level_event_ke_event;

CREATE TABLE public.tb_avn_sm_foqa_risk_level_event_ke_event (
	foqa_risk_mgmt_id int4 NOT NULL,
	event_id int4 NOT NULL
);


-- public.tb_avn_sm_foqa_risk_mgmt definition

-- Drop table

-- DROP TABLE public.tb_avn_sm_foqa_risk_mgmt;

CREATE TABLE public.tb_avn_sm_foqa_risk_mgmt (
	id serial4 NOT NULL,
	report_id int4 NOT NULL,
	level_type varchar(50) NULL,
	fleet varchar(4) NULL,
	related_doc varchar(1000) NULL,
	risk_level varchar(50) NULL,
	event_occur varchar(10) NULL,
	ttl_hazard varchar(3) NULL,
	high varchar(5) NULL,
	medium varchar(5) NULL,
	low varchar(5) NULL,
	file_group_seq int4 NULL,
	CONSTRAINT pk_tb_avn_sm_foqa_risk_mgmt PRIMARY KEY (id)
);
CREATE UNIQUE INDEX sm_risk_mgmt_id ON public.tb_avn_sm_foqa_risk_mgmt USING btree (id);


-- public.tb_avn_sm_hazard_approval_log definition

-- Drop table

-- DROP TABLE public.tb_avn_sm_hazard_approval_log;

CREATE TABLE public.tb_avn_sm_hazard_approval_log (
	id serial4 NOT NULL,
	hazard_id int4 DEFAULT '-1'::integer NOT NULL,
	state_type varchar(50) NOT NULL,
	phase varchar(50) NOT NULL,
	step_code varchar(50) NOT NULL,
	emp_no varchar(10) NOT NULL,
	reason varchar(255) NULL,
	timezone varchar(50) NOT NULL,
	notes varchar(1000) NULL,
	reg_dttm timestamp NOT NULL,
	reg_user_id varchar(10) NOT NULL,
	upd_dttm timestamp NOT NULL,
	upd_user_id varchar(10) NOT NULL,
	CONSTRAINT pk_tb_avn_sm_hazard_approval_log PRIMARY KEY (id)
);
CREATE INDEX tb_avn_sm_hazard_approval_log_hazard_id_idx ON public.tb_avn_sm_hazard_approval_log USING btree (hazard_id);


-- public.tb_avn_sm_mitigation definition

-- Drop table

-- DROP TABLE public.tb_avn_sm_mitigation;

CREATE TABLE public.tb_avn_sm_mitigation (
	id serial4 NOT NULL,
	hazard_id int4 NOT NULL,
	dept_id numeric(19) NOT NULL,
	emp_no varchar(10) NULL,
	plan varchar(2000) NULL,
	"result" varchar(2000) NULL,
	is_submitted_plan varchar(1) DEFAULT 'N'::character varying NULL,
	is_submitted_result varchar(1) DEFAULT 'N'::character varying NULL,
	leader_emp_no varchar(10) NOT NULL,
	member_emp_no_list varchar(1000) NULL,
	plan_submitted_at timestamp(6) NULL,
	result_submitted_at timestamp(6) NULL,
	timezone varchar(50) NOT NULL,
	deleted_at timestamp(6) NULL,
	plan_due_at timestamp(6) NULL,
	reg_dttm timestamp NOT NULL,
	reg_user_id varchar(10) NOT NULL,
	upd_dttm timestamp NOT NULL,
	upd_user_id varchar(10) NOT NULL,
	real_mitigation_perform varchar(100) NULL,
	mitigation_center_dept_id numeric(19) NULL,
	CONSTRAINT pk_tb_avn_sm_mitigation PRIMARY KEY (id),
	CONSTRAINT tb_avn_sm_mitigation_un UNIQUE (hazard_id)
);
CREATE UNIQUE INDEX tb_avn_sm_mitigation_id ON public.tb_avn_sm_mitigation USING btree (id);


-- public.tb_avn_sm_mitigation_empno definition

-- Drop table

-- DROP TABLE public.tb_avn_sm_mitigation_empno;

CREATE TABLE public.tb_avn_sm_mitigation_empno (
	id serial4 NOT NULL,
	hazard_id int4 DEFAULT '-1'::integer NULL,
	mitigation_emp_type varchar(10) NULL,
	emp_no varchar(10) NOT NULL,
	reg_dttm timestamp NOT NULL,
	reg_user_id varchar(10) NOT NULL,
	upd_dttm timestamp NOT NULL,
	upd_user_id varchar(10) NOT NULL,
	CONSTRAINT pk_tb_avn_sm_mitigation_empno PRIMARY KEY (id)
);
CREATE UNIQUE INDEX tb_avn_sm_mitigation_empno_id ON public.tb_avn_sm_mitigation_empno USING btree (id);


-- public.tb_avn_sm_progress_rate definition

-- Drop table

-- DROP TABLE public.tb_avn_sm_progress_rate;

CREATE TABLE public.tb_avn_sm_progress_rate (
	rate_id int4 NOT NULL,
	rate_mitigation_id int4 NOT NULL,
	startdate_at timestamp(6) NULL,
	enddate_at timestamp(6) NULL,
	"percent" int4 NULL,
	contents varchar(2000) NOT NULL,
	reg_dttm timestamp NOT NULL,
	reg_user_id varchar(10) NOT NULL,
	upd_dttm timestamp NOT NULL,
	upd_user_id varchar(10) NOT NULL,
	CONSTRAINT pk_tb_avn_sm_progress_rate PRIMARY KEY (rate_id)
);
CREATE UNIQUE INDEX tb_avn_sm_progress_rate_id ON public.tb_avn_sm_progress_rate USING btree (rate_id);


-- public.tb_avn_sm_reception_link definition

-- Drop table

-- DROP TABLE public.tb_avn_sm_reception_link;

CREATE TABLE public.tb_avn_sm_reception_link (
	id serial4 NOT NULL,
	reception_id int4 NOT NULL,
	report_id int4 NOT NULL,
	CONSTRAINT fk_sm_reception_asr PRIMARY KEY (id)
);
CREATE UNIQUE INDEX sm_reception_asr_id ON public.tb_avn_sm_reception_link USING btree (id);


-- public.tb_avn_sm_report_hazard definition

-- Drop table

-- DROP TABLE public.tb_avn_sm_report_hazard;

CREATE TABLE public.tb_avn_sm_report_hazard (
	id serial4 NOT NULL,
	group_id int4 NOT NULL,
	hazard_id int4 NOT NULL,
	consequence_id int4 NULL,
	emp_no varchar(10) NOT NULL,
	risk_level1 varchar(2) NOT NULL,
	is_mitigation varchar(1) DEFAULT 'Y'::bpchar NULL,
	view_order int2 DEFAULT 0 NOT NULL,
	phase varchar(50) NOT NULL,
	state_type varchar(50) NOT NULL,
	timezone varchar(50) NOT NULL,
	deleted_at timestamp(6) NULL,
	is_mitigation_validation varchar(1) DEFAULT 'N'::character varying NULL,
	risk_level2 varchar(2) NULL,
	hazard_no varchar(50) NOT NULL,
	risk_level_hm varchar(50) NULL,
	risk_level_hm2 varchar(50) NULL,
	reg_dttm timestamp NOT NULL,
	reg_user_id varchar(10) NOT NULL,
	upd_dttm timestamp NOT NULL,
	upd_user_id varchar(10) NOT NULL,
	risk_level1_color varchar(10) NULL,
	risk_level2_color varchar(10) NULL,
	assurance_month int4 DEFAULT 0 NULL,
	CONSTRAINT pk_tb_avn_sm_report_hazard PRIMARY KEY (id),
	CONSTRAINT uk_tb_avn_sm_report_hazard_hazard_no UNIQUE (hazard_no)
);
CREATE UNIQUE INDEX tb_avn_sm_report_hazard_id ON public.tb_avn_sm_report_hazard USING btree (id);
CREATE INDEX tb_avn_sm_report_hazard_report_id_idx ON public.tb_avn_sm_report_hazard USING btree (group_id);


-- public.tb_avn_sm_assurance foreign keys

ALTER TABLE public.tb_avn_sm_assurance ADD CONSTRAINT fk_tb_avn_sm_assurance_group FOREIGN KEY (group_id) REFERENCES public.tb_avn_sm_group(id);
ALTER TABLE public.tb_avn_sm_assurance ADD CONSTRAINT fk_tb_avn_sm_assurance_hazard FOREIGN KEY (hazard_id) REFERENCES public.tb_avn_sm_report_hazard(id);


-- public.tb_avn_sm_foqa_hazard foreign keys

ALTER TABLE public.tb_avn_sm_foqa_hazard ADD CONSTRAINT fk_tb_avn_sm_foqa_risk_mgmt_foqa_hazard FOREIGN KEY (risk_mgmt_id) REFERENCES public.tb_avn_sm_foqa_risk_mgmt(id);


-- public.tb_avn_sm_foqa_risk_level_event_ke_event foreign keys

ALTER TABLE public.tb_avn_sm_foqa_risk_level_event_ke_event ADD CONSTRAINT fk_tb_avn_sm_foqa_risk_mgmt_risk_level_event FOREIGN KEY (foqa_risk_mgmt_id) REFERENCES public.tb_avn_sm_foqa_risk_mgmt(id);


-- public.tb_avn_sm_foqa_risk_mgmt foreign keys

ALTER TABLE public.tb_avn_sm_foqa_risk_mgmt ADD CONSTRAINT fk_tb_avn_sm_foqa_event_risk_mgmt FOREIGN KEY (report_id) REFERENCES public.tb_avn_report_foqa(report_id);


-- public.tb_avn_sm_hazard_approval_log foreign keys

ALTER TABLE public.tb_avn_sm_hazard_approval_log ADD CONSTRAINT fk_tb_avn_sm_report_hazarad_approval_log FOREIGN KEY (hazard_id) REFERENCES public.tb_avn_sm_report_hazard(id);


-- public.tb_avn_sm_mitigation foreign keys

ALTER TABLE public.tb_avn_sm_mitigation ADD CONSTRAINT fk_tb_avn_sm_report_hazard_mitigation FOREIGN KEY (hazard_id) REFERENCES public.tb_avn_sm_report_hazard(id);


-- public.tb_avn_sm_mitigation_empno foreign keys

ALTER TABLE public.tb_avn_sm_mitigation_empno ADD CONSTRAINT fk_tb_avn_sm_mitigation_empno_hazard FOREIGN KEY (hazard_id) REFERENCES public.tb_avn_sm_report_hazard(id);


-- public.tb_avn_sm_progress_rate foreign keys

ALTER TABLE public.tb_avn_sm_progress_rate ADD CONSTRAINT fk_tb_avn_sm_mitigation FOREIGN KEY (rate_mitigation_id) REFERENCES public.tb_avn_sm_mitigation(id);


-- public.tb_avn_sm_reception_link foreign keys

ALTER TABLE public.tb_avn_sm_reception_link ADD CONSTRAINT fk_sm_reception_asr_report FOREIGN KEY (report_id) REFERENCES public.tb_avn_report(report_id);
ALTER TABLE public.tb_avn_sm_reception_link ADD CONSTRAINT fk_sm_reception_reception_asr FOREIGN KEY (reception_id) REFERENCES public.tb_avn_sm_reception(id);


-- public.tb_avn_sm_report_hazard foreign keys

ALTER TABLE public.tb_avn_sm_report_hazard ADD CONSTRAINT fk_tb_avn_hazard_lv3_sm_report_hazard FOREIGN KEY (hazard_id) REFERENCES public.tb_avn_hazard_lv3(hazard_lvthree_id);