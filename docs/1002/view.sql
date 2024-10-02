-- public.v_1st_risk_assessment_viewlist source

CREATE OR REPLACE VIEW public.v_1st_risk_assessment_viewlist
AS SELECT sr.id,
    sr.id AS report_id,
    sr.doc_no,
    sr.report_type,
    sr.subject,
        CASE
            WHEN t1.group_id IS NULL THEN '2'::text
            WHEN t1.step_list::text ~~ '%rejected%'::text THEN '3'::text
            ELSE '2'::text
        END AS step,
        CASE
            WHEN t1.group_id IS NULL THEN sral.phase
            WHEN t1.step_list::text ~~ '%rejected%'::text THEN 'acceptance'::character varying
            ELSE '1st_risk'::character varying
        END AS phase,
        CASE
            WHEN t1.group_id IS NULL THEN sral.step_code
            WHEN t1.step_list::text ~~ '%rejected%'::text THEN 'rejected'::character varying
            WHEN t1.step_list::text ~~ '%draft%'::text THEN 'draft'::character varying
            ELSE 'submitted'::character varying
        END AS step_code,
    sr.state_type,
    sr.submitted_at,
    smr.receipted_at,
    kef.fleet_code,
    t1.reason,
    sr.emp_no AS reported_by,
    fu.name_kor AS reported_by_user_name_ko,
    fu.name_eng AS reported_by_user_name_en,
    smr_fu.emp_no AS receipted_by,
    smr_fu.name_kor AS receipted_by_user_name_ko,
    smr_fu.name_eng AS receipted_by_user_name_en,
    smr_fu.dept_id AS receipt_dept_id,
    she.anony_yn AS is_confidential,
    smf.flight_no,
    smf.departure_dt AS departure_at,
        CASE
            WHEN sr.submitted_at < '2023-09-12 00:00:00'::timestamp without time zone THEN kev.event_ko_nm
            ELSE ke2.event_nm
        END AS name_ko,
    kev.event_en_nm,
    vlm.emp_no AS lsc_leader_emp_no,
    sr.work_type,
    smf.reg_no AS registration_no
   FROM v_report_group_list sr
     LEFT JOIN tb_sys_user fu ON fu.emp_no::text = sr.emp_no::text
     JOIN LATERAL fn_report_last_step(sr.id) sral(log_id, group_id, state_type, phase, step_code, stepped_by, reason, timezone, stepped_at) ON sral.group_id = sr.id
     LEFT JOIN tb_avn_sm_reception smr ON smr.group_id = sr.id
     LEFT JOIN tb_avn_sm_reception_ke_event srkev ON srkev.reception_id = smr.id
     LEFT JOIN tb_avn_event_backup kev ON srkev.event_id = kev.event_id
     LEFT JOIN tb_avn_event ke2 ON srkev.event_id = ke2.event_id
     LEFT JOIN tb_avn_report_flight smf ON smf.report_id = sr.report_id
     LEFT JOIN ( SELECT tb_sys_code.code_id AS id,
            tb_sys_code.code_name_kor AS fleet_code
           FROM tb_sys_code
          WHERE tb_sys_code.code_grp_id::text = 'CODE_GRP_159'::text) kef ON kef.id::text = smf.aircraft_type_cd::text
     LEFT JOIN tb_sys_user smr_fu ON smr_fu.emp_no::text = smr.emp_no::text
     LEFT JOIN LATERAL fn_1st_risk_last_state(sr.id) t1(group_id, step_list, reason) ON t1.group_id = sr.id
     LEFT JOIN tb_avn_report_hzr she ON she.report_id = sr.report_id
     LEFT JOIN v_lsc_member vlm ON vlm.group_id = sr.id AND vlm.member_type::text = 'leader'::text
  WHERE sr.report_type::text <> 'rsr'::text AND smr.receipted_at IS NOT NULL AND sr.deleted_at IS NULL;


-- public.v_dept_tree source

CREATE OR REPLACE VIEW public.v_dept_tree
AS WITH RECURSIVE dept_tree(dept_id, upper_dept_cd, dept_cd, name_kor, name_eng, tree_type, full_path, sort_order, level, path, sort) AS (
         SELECT a.dept_id,
            a.upper_dept_cd,
            a.dept_cd,
            a.name_kor,
            a.name_eng,
            a.tree_type,
            a.full_path,
            a.sort_order,
            0 AS level,
            ARRAY[TRIM(BOTH FROM a.dept_cd::character varying)] AS "array",
            '0'::text AS sort,
            b.sect_cd,
            b.sect_nm
           FROM tb_sys_dept a
             LEFT JOIN v_sect_info b ON a.dept_cd::text = b.dept_cd::text
          WHERE a.dept_cd::text = 'KAL'::text
        UNION ALL
         SELECT a.dept_id,
            a.upper_dept_cd,
            a.dept_cd,
            a.name_kor,
            a.name_eng,
            a.tree_type,
            a.full_path,
            a.sort_order,
            t.level + 1 AS level,
            t.path || TRIM(BOTH FROM a.sort_order::character varying::text || a.dept_cd::character varying::text) AS path,
            t.sort || TRIM(BOTH FROM a.sort_order::character varying::text || a.dept_cd::character varying::text) AS sort,
            b.sect_cd,
            b.sect_nm
           FROM tb_sys_dept a
             LEFT JOIN v_sect_info b ON a.dept_cd::text = b.dept_cd::text
             JOIN dept_tree t ON a.upper_dept_cd::text = t.dept_cd::character varying::text
          WHERE a.dept_cd::text <> 'KAL'::text
        )
 SELECT dept_id,
    upper_dept_cd,
    dept_cd,
    name_kor,
    name_eng,
    tree_type,
    full_path,
    sort_order,
    level,
    path,
    sort,
    sect_cd,
    sect_nm
   FROM dept_tree;


-- public.v_groupuser source

CREATE OR REPLACE VIEW public.v_groupuser
AS SELECT gp.group_id::text AS grp_id,
    gp.group_cd::text AS grp_cd,
    g.user_id AS acnt_id,
    'V'::text AS grp_type,
    'U'::text AS acnt_type,
    g.user_id,
    g.reg_dttm
   FROM tb_sys_group_user g
     JOIN tb_sys_group gp ON gp.group_id::numeric = g.group_id
UNION ALL
 SELECT gu1.grp_id,
    gu1.group_cd::text AS grp_cd,
    gu1.dept_id::text AS acnt_id,
    'V'::text AS grp_type,
    'D'::text AS acnt_type,
    gu2.user_id,
    gu1.reg_dttm
   FROM ( SELECT gp.group_id::text AS grp_id,
            gp.group_cd,
            'D'::text AS grp_type,
            gu.dept_id,
            gu.reg_dttm
           FROM tb_sys_group_dept gu
             JOIN tb_sys_group gp ON gp.group_id::numeric = gu.group_id) gu1
     JOIN tb_sys_user gu2 ON gu2.dept_id = gu1.dept_id;


-- public.v_hazard_by_lv source

CREATE OR REPLACE VIEW public.v_hazard_by_lv
AS SELECT lv3.hazard_lvthree_id AS lv3_id,
    lv3.hazard_lvthree_nm AS lv3_name,
    lv3.notes_cn AS lv3_notes,
    lv3.view_sn AS lv3_view_order,
    lv3.reg_user_id AS lv3_emp_no,
    lv3.upd_dttm AS lv3_created_at,
    lv2.hazard_lvtwo_id AS lv2_id,
    lv2.hazard_lvtwo_nm AS lv2_name,
    lv2.notes_cn AS lv2_notes,
    lv2.view_sn AS lv2_view_order,
    lv2.reg_user_id AS lv2_emp_no,
    lv2.upd_dttm AS lv2_created_at,
    lv1.hazard_lvone_id AS lv1_id,
    lv1.hazard_lvone_nm AS lv1_name,
    lv1.notes_cn AS lv1_notes,
    lv1.view_sn AS lv1_view_order,
    lv1.reg_user_id AS lv1_emp_no,
    lv1.upd_dttm AS lv1_created_at,
    lv1.work_scope_cd AS work_type
   FROM tb_avn_hazard_lv3 lv3
     JOIN tb_avn_hazard_lv2 lv2 ON lv2.hazard_lvtwo_id = lv3.hazard_lvtwo_id
     JOIN tb_avn_hazard_lv1 lv1 ON lv1.hazard_lvone_id = lv2.hazard_lvone_id
  WHERE lv3.del_dttm IS NULL AND lv3.use_yn::text = 'Y'::text AND lv2.del_dttm IS NULL AND lv2.use_yn::text = 'Y'::text AND lv1.del_dttm IS NULL AND lv1.use_yn::text = 'Y'::text
  ORDER BY lv1.view_sn, lv2.view_sn, lv3.view_sn;


-- public.v_hazard_comment_log source

CREATE OR REPLACE VIEW public.v_hazard_comment_log
AS SELECT srhl.id,
    srhl.hazard_id,
    srhl.emp_no,
    srhl.reason,
    srhl.timezone,
    srhl.reg_dttm,
    srhl.phase,
    fu.name_kor,
    fu.name_eng,
    sr.report_id,
    sr.doc_no
   FROM tb_avn_sm_hazard_approval_log srhl
     JOIN tb_sys_user fu ON fu.emp_no::text = srhl.emp_no::text
     JOIN tb_avn_sm_report_hazard srh ON srh.id = srhl.hazard_id
     JOIN v_report_group_list sr ON sr.id = srh.group_id
  ORDER BY srhl.id DESC;


-- public.v_hazard_common_viewlist source

CREATE OR REPLACE VIEW public.v_hazard_common_viewlist
AS SELECT srh.id,
    srh.group_id,
    sr.doc_no,
    sr.report_type,
    sr.subject,
    ( SELECT tb_sys_code.code_name_kor
           FROM tb_sys_code
          WHERE tb_sys_code.code_grp_id::text = 'CODE_GRP_156'::text AND tb_sys_code.code_id::text = shal.phase::text) AS step,
    smr.receipted_at,
    smr.emp_no AS receipt_emp_no,
    smru.dept_id AS receipt_dept_id,
    vhbl.lv3_name,
    vhbl.lv2_name,
    vhbl.lv1_name,
    kc.consequence_ko_nm AS consequence_ko,
    kc.consequence_en_nm AS consequence_en,
    srh.risk_level1,
    srh.risk_level2,
    srh.risk_level1_color,
    srh.risk_level2_color,
    srh.is_mitigation,
    smi.dept_id AS mitigation_dept_id,
    fd.name_kor AS mitigation_dept_name_ko,
    fd.name_eng AS mitigation_dept_name_en,
    smi.result AS mitigation_result,
    ( SELECT array_to_string(array_agg(tb_avn_sm_mitigation_empno.emp_no), ','::text) AS mitigation_emp_no
           FROM tb_avn_sm_mitigation_empno
          WHERE tb_avn_sm_mitigation_empno.mitigation_emp_type::text = 'P'::text AND tb_avn_sm_mitigation_empno.hazard_id = smi.hazard_id
          GROUP BY tb_avn_sm_mitigation_empno.hazard_id) AS mitigation_emp_no,
    smi.leader_emp_no AS mitigation_leader_emp_no,
    ( SELECT array_to_string(array_agg(tb_avn_sm_mitigation_empno.emp_no), ','::text) AS mitigation_member_emp_no_list
           FROM tb_avn_sm_mitigation_empno
          WHERE tb_avn_sm_mitigation_empno.mitigation_emp_type::text = 'M'::text AND tb_avn_sm_mitigation_empno.hazard_id = smi.hazard_id
          GROUP BY tb_avn_sm_mitigation_empno.hazard_id) AS mitigation_member_emp_no_list,
    sr.submitted_at,
    shal.phase,
    shal.step_code,
    shal.reason,
    vlm.emp_no AS lsc_leader_emp_no,
        CASE
            WHEN sr.submitted_at < '2023-09-12 00:00:00'::timestamp without time zone THEN kev.event_ko_nm
            ELSE ke2.event_nm
        END AS name_ko,
    kev.event_en_nm AS name_en,
    srh.risk_level_hm,
    srh.risk_level_hm2,
    she.anony_yn AS is_confidential,
    min_rate.contents,
    smf.departure_dt AS departure_at,
    km.score_co AS first_score,
    km2.score_co AS second_score,
    kef.fleet_code,
    smf.flight_no,
    sr.emp_no AS reported_by,
    fu.name_kor AS reported_by_user_name_ko,
    fu.name_eng AS reported_by_user_name_en,
    smru.emp_no AS receipted_by,
    smru.name_kor AS receipted_by_user_name_ko,
    smru.name_eng AS receipted_by_user_name_en,
    sr.work_type,
    smi.real_mitigation_perform,
    smf.reg_no AS registration_no
   FROM tb_avn_sm_report_hazard srh
     JOIN v_report_group_list sr ON sr.id = srh.group_id AND sr.deleted_at IS NULL
     LEFT JOIN tb_avn_report_flight smf ON smf.report_id = sr.report_id
     LEFT JOIN ( SELECT tb_sys_code.code_id AS id,
            tb_sys_code.code_name_kor AS fleet_code
           FROM tb_sys_code
          WHERE tb_sys_code.code_grp_id::text = 'CODE_GRP_159'::text) kef ON kef.id::text = smf.aircraft_type_cd::text
     LEFT JOIN tb_sys_user fu ON fu.emp_no::text = sr.emp_no::text
     JOIN tb_avn_sm_reception smr ON smr.group_id = sr.id
     LEFT JOIN tb_avn_sm_reception_ke_event srkev ON srkev.reception_id = smr.id
     LEFT JOIN tb_avn_event_backup kev ON srkev.event_id = kev.event_id
     LEFT JOIN tb_avn_event ke2 ON srkev.event_id = ke2.event_id
     JOIN tb_sys_user smru ON smru.emp_no::text = smr.emp_no::text
     JOIN v_hazard_by_lv vhbl ON vhbl.lv3_id = srh.hazard_id
     LEFT JOIN tb_avn_consequence kc ON kc.consequence_id = srh.consequence_id
     LEFT JOIN v_lsc_member vlm ON vlm.group_id = sr.id AND vlm.member_type::text = 'leader'::text
     JOIN LATERAL fn_hazard_last_step(srh.id) shal(log_id, hazard_id, state, phase, step_code, stepped_by, reason, timezone, stepped_at) ON shal.hazard_id = srh.id
     LEFT JOIN tb_avn_sm_mitigation smi ON smi.hazard_id = srh.id
     LEFT JOIN tb_sys_dept fd ON fd.dept_id::numeric = smi.dept_id
     LEFT JOIN tb_avn_report_hzr she ON sr.report_id = she.report_id
     LEFT JOIN tb_avn_risk_level_matrix km ON srh.risk_level1::text = km.risk_level_cd::text
     LEFT JOIN tb_avn_risk_level_matrix km2 ON srh.risk_level2::text = km2.risk_level_cd::text
     LEFT JOIN ( SELECT spr.rate_mitigation_id,
            min(spr.rate_id) AS min_rate_id,
            spr.contents
           FROM tb_avn_sm_progress_rate spr
          WHERE ((spr.rate_mitigation_id, spr.rate_id) IN ( SELECT tb.rate_mitigation_id,
                    min(tb.rate_id) AS min_rate_id
                   FROM tb_avn_sm_progress_rate tb
                  GROUP BY tb.rate_mitigation_id))
          GROUP BY spr.rate_mitigation_id, spr.contents) min_rate ON min_rate.rate_mitigation_id = smi.id
  WHERE srh.deleted_at IS NULL AND sr.report_type::text <> 'rsr'::text;


-- public.v_iv_search_valid source

CREATE OR REPLACE VIEW public.v_iv_search_valid
AS SELECT tair.id,
    tair.report_no,
    tair.report_title,
    tair.departure_at,
    tair.flight_no,
    tair.aircraft_type_text,
    tair.from_airport,
    tair.to_airport,
    tair.registration_no,
    tair.supply,
    tair.check_in,
    tair.location_text,
    tair.airport,
    tair.flight_phase,
    tair.emp_no,
    tair.event_at,
    tair.is_spi,
    tair.classification,
    tair.reg_dttm,
    tair.upd_dttm,
    tair.deleted_at,
    tair.weather_text,
    tair.event_at_tz,
    tair.divert_airport,
    tair.is_submitted,
    tair.submitted_at,
    tair.investigate_by,
    tair.submitted_by,
    tair.approved_id,
    st.phase,
    ds.text_user_ko,
    ds.text_user_en,
    ds.text_admin_ko,
    ds.text_admin_en,
    st.step_code,
    st.reason,
    tair.event_id,
    ds.page_code
   FROM tb_avn_iv_report tair
     LEFT JOIN LATERAL fn_iv_report_last_step(tair.id) st(log_id, report_id, state_type, phase, step_code, stepped_by, reason, timezone, stepped_at) ON st.report_id = tair.id
     LEFT JOIN tb_avn_display_status ds ON ds.phase::text = st.phase::text AND ds.state::text = st.state_type::text AND ds.step_code::text = st.step_code::text AND ds.system_type::text = 'investigation'::text AND ds.page_code::text <> 'pg_investigation'::text
  WHERE tair.deleted_at IS NULL;


-- public.v_iv_viewlist source

CREATE OR REPLACE VIEW public.v_iv_viewlist
AS SELECT iv.id,
    iv.report_no,
    iv.report_title,
    iv.departure_at,
    iv.flight_no,
    iv.aircraft_type_text,
    iv.from_airport,
    iv.to_airport,
    iv.registration_no,
    iv.supply,
    iv.check_in,
    iv.location_text,
    iv.airport,
    iv.flight_phase,
    fp.code_name_kor AS flight_phase_text_ko,
    fp.code_name_eng AS flight_phase_text_en,
    iv.emp_no,
    iv.event_at,
    iv.event_at_tz,
    iv.classification,
    cp.code_name_kor AS classification_text_ko,
    cp.code_name_eng AS classification_text_en,
    iv.is_spi,
    iv.reg_dttm,
    iv.upd_dttm,
    iv.deleted_at,
    iv.weather_text,
    iv.phase,
    iv.text_user_ko,
    iv.text_user_en,
    iv.text_admin_ko,
    iv.text_admin_en,
    iv.step_code,
    iv.reason,
    iv.is_submitted,
    iv.submitted_at,
    iv.submitted_by,
    iv.divert_airport,
    iv.approved_id,
    iv.investigate_by,
    iral.reg_dttm AS closed_at,
    iv.event_id,
    tae.event_nm,
    iv.page_code
   FROM v_iv_search_valid iv
     LEFT JOIN tb_sys_code fp ON fp.code_id::text = iv.flight_phase::text AND (fp.code_grp_id::text = ANY (ARRAY['CODE_GRP_002'::character varying::text, 'CODE_GRP_041'::character varying::text]))
     LEFT JOIN tb_sys_code cp ON cp.code_id::text = iv.classification::text AND cp.code_grp_id::text = 'CODE_GRP_154'::text
     LEFT JOIN tb_avn_event tae ON tae.event_id::text = iv.event_id::text
     LEFT JOIN ( SELECT tb_avn_iv_report_approval_log.report_id,
            min(tb_avn_iv_report_approval_log.reg_dttm) AS closed_at
           FROM tb_avn_iv_report_approval_log
          WHERE tb_avn_iv_report_approval_log.phase::text = 'report_close'::text
          GROUP BY tb_avn_iv_report_approval_log.report_id) min_dates ON iv.id = min_dates.report_id
     LEFT JOIN tb_avn_iv_report_approval_log iral ON iv.id = iral.report_id AND iral.reg_dttm = min_dates.closed_at;


-- public.v_lsc_group_member source

CREATE OR REPLACE VIEW public.v_lsc_group_member
AS SELECT slgm.id,
    slgm.group_id,
    slgm.emp_no,
    slgm.member_type,
    slgm.timezone,
    slgm.reg_dttm,
    slgm.upd_dttm,
    slgm.deleted_at,
    fu.user_id,
    fu.name_kor AS name_ko,
    fu.name_eng AS name_en,
    fd.name_kor AS dept_name_ko,
    fd.name_eng AS dept_name_en,
    fr.name_kor AS rank_name_ko,
    fr.name_eng AS rank_name_en
   FROM tb_avn_sm_lsc_group_member slgm
     JOIN tb_sys_user fu ON fu.emp_no::text = slgm.emp_no::text
     LEFT JOIN tb_avn_sm_lsc_group slg ON slg.id = slgm.group_id
     LEFT JOIN tb_sys_dept fd ON fd.dept_id::numeric = fu.dept_id
     LEFT JOIN tb_sys_dept fr ON fr.dept_id::numeric = fu.dept_id
  WHERE slgm.deleted_at IS NULL;


-- public.v_lsc_list source

CREATE OR REPLACE VIEW public.v_lsc_list
AS SELECT sl.id,
    sl.reception_id,
    sr.group_id,
    sl.emp_no,
    sl.member_type,
    sl.timezone,
    sl.reg_dttm AS created_at,
    sl.upd_dttm AS updated_at,
    sl.deleted_at,
    fu.user_id,
    fu.name_kor AS name_ko,
    fu.name_eng AS name_en,
    fd.name_kor AS dept_name_ko,
    fd.name_eng AS dept_name_en,
    fd.name_kor AS rank_name_ko,
    fd.name_eng AS rank_name_en
   FROM tb_avn_sm_lsc sl
     JOIN tb_avn_sm_reception sr ON sr.id = sl.reception_id
     JOIN tb_sys_user fu ON fu.emp_no::text = sl.emp_no::text
     LEFT JOIN tb_sys_dept fd ON fd.dept_id::numeric = fu.dept_id
  WHERE sl.deleted_at IS NULL;


-- public.v_lsc_member source

CREATE OR REPLACE VIEW public.v_lsc_member
AS SELECT sr.id AS group_id,
    src.emp_no AS manager_emp_no,
    sl.emp_no,
    sl.member_type
   FROM v_report_group_list sr
     JOIN tb_avn_sm_reception src ON sr.id = src.group_id
     JOIN tb_avn_sm_lsc sl ON src.id = sl.reception_id
  WHERE sr.deleted_at IS NULL AND src.deleted_at IS NULL AND sl.deleted_at IS NULL;


-- public.v_mitigation source

CREATE OR REPLACE VIEW public.v_mitigation
AS SELECT srh.id,
    srh.group_id,
    shal.phase,
    shal.step_code,
    srh.is_mitigation_validation,
    srh.hazard_id,
    srh.consequence_id,
    srh.risk_level1,
    srh.risk_level2,
    srh.is_mitigation,
    smi.id AS mitigation_id,
    smi.hazard_id AS report_hazard_id,
    smi.dept_id,
    member_emp_no_p.emp_no,
    smi.plan,
    smi.result,
    smi.is_submitted_plan,
    smi.is_submitted_result,
    smi.plan_due_at,
    smi.leader_emp_no,
    ( SELECT array_to_string(array_agg(tb_avn_sm_mitigation_empno.emp_no), ','::text) AS member_emp_no_list
           FROM tb_avn_sm_mitigation_empno
          WHERE tb_avn_sm_mitigation_empno.mitigation_emp_type::text = 'P'::text AND tb_avn_sm_mitigation_empno.hazard_id = smi.hazard_id
          GROUP BY tb_avn_sm_mitigation_empno.hazard_id) AS member_emp_no_list,
    fu.name_kor,
    fu.name_eng,
    fd.name_kor AS dept_name_kor,
    fd.name_eng AS dept_name_eng,
    fr.code_name_kor AS rank_name_kor,
    fr.code_name_eng AS rank_name_eng,
    smi.plan_submitted_at,
    smi.result_submitted_at,
    srh.hazard_no,
    spr.rate_id,
    spr.rate_mitigation_id,
    spr.startdate_at,
    spr.enddate_at,
    spr.percent,
    spr.contents
   FROM tb_avn_sm_report_hazard srh
     JOIN ( SELECT t1.hazard_id,
            t1.phase,
            t1.step_code,
            t1.reason,
            row_number() OVER (PARTITION BY t1.hazard_id ORDER BY t1.id DESC) AS rnum
           FROM tb_avn_sm_hazard_approval_log t1) shal ON shal.hazard_id = srh.id AND shal.rnum = 1
     JOIN tb_avn_sm_mitigation smi ON smi.hazard_id = srh.id
     LEFT JOIN ( SELECT tb_avn_sm_mitigation_empno.hazard_id,
            max(tb_avn_sm_mitigation_empno.emp_no::text) AS emp_no,
            array_to_string(array_agg(tb_avn_sm_mitigation_empno.emp_no), ','::text) AS member_emp_no_list
           FROM tb_avn_sm_mitigation_empno
          WHERE tb_avn_sm_mitigation_empno.mitigation_emp_type::text = 'P'::text
          GROUP BY tb_avn_sm_mitigation_empno.hazard_id) member_emp_no_p ON srh.id = member_emp_no_p.hazard_id
     LEFT JOIN tb_sys_user fu ON fu.emp_no::text = member_emp_no_p.emp_no
     LEFT JOIN tb_sys_dept fd ON fd.dept_id::numeric = fu.dept_id
     LEFT JOIN tb_sys_code fr ON fr.code_grp_id::text = 'RANK_CD'::text AND fr.code_id::text = fu.rank_cd::text
     LEFT JOIN tb_avn_sm_progress_rate spr ON spr.rate_mitigation_id = smi.id
  WHERE srh.deleted_at IS NULL;


-- public.v_reception source

CREATE OR REPLACE VIEW public.v_reception
AS SELECT sr.id AS group_id,
    sr.report_id,
    sr.doc_no,
    sr.report_type,
    sr.phase,
    sr.state_type,
    sr.subject,
    src.id,
    src.ata_adapter_type,
    src.event_followup,
    src.control_dept_type,
    src.event_summary,
    src.classification,
    src.is_spi,
    src.emp_no,
    kev.event_id,
    kev.event_ko_nm AS event_name_ko,
    kev.event_en_nm AS event_name_en,
    srf.foqa_valid,
    srf.foqa_usa,
    srf.foqa_go_around,
    srf.foqa_metar,
    srh.hazard_benefit_id,
    khb.resource_name AS hazard_benefit_name,
    ke.event_nm AS new_event_name,
    ke.event_id AS new_event_id,
    src.sector,
    src.due_date,
    src.add_category,
    src.is_ground_accident,
    sr.emp_no AS created_by,
    sr.is_avn_hzd,
    sr.is_ocu_hzd,
    sr.is_sfty_hzd
   FROM v_report_group_list sr
     LEFT JOIN tb_avn_sm_reception src ON sr.id = src.group_id
     LEFT JOIN tb_avn_sm_reception_ke_event srkev ON srkev.reception_id = src.id
     LEFT JOIN tb_avn_event_backup kev ON srkev.event_id = kev.event_id
     LEFT JOIN tb_avn_sm_reception_foqa srf ON srf.reception_id = src.id
     LEFT JOIN tb_avn_sm_reception_hzr srh ON srh.reception_id = src.id
     LEFT JOIN ( SELECT tb_sys_code.code_id,
            tb_sys_code.code_name_kor AS resource_name
           FROM tb_sys_code
          WHERE tb_sys_code.code_grp_id::text = 'CODE_GRP_HAZARD_BENEFIT'::text) khb ON srh.hazard_benefit_id::text = khb.code_id::text
     LEFT JOIN tb_avn_event ke ON srkev.event_id = ke.event_id
  WHERE sr.submitted_at IS NOT NULL;


-- public.v_report source

CREATE OR REPLACE VIEW public.v_report
AS SELECT report.id,
    report.doc_no,
    report.report_type,
    kc_rt.name_ko AS report_name_ko,
    kc_rt.name_en AS report_name_en,
    report.emp_no,
    report.subject,
    report.time_zone,
    report.state_type,
    kc_sts.name_ko AS state_name_ko,
    kc_sts.name_en AS state_name_en,
    report.phase,
    kc_phs.name_ko AS phase_name_ko,
    kc_phs.name_en AS phase_name_en,
    report.step_code,
    kc_stp.name_ko AS step_name_ko,
    kc_stp.name_en AS step_name_en,
    report.created_at,
    report.updated_at,
    report.deleted_at,
    report.submitted_at,
    report.approval_id,
    report.approval_emp_no,
    report.approval_reason,
    report.approval_timezone,
    report.approval_created_at,
    sr2.timezone AS reception_timezone,
    sr2.receipted_at AS reception_created_at
   FROM ( SELECT DISTINCT ON (sr.id) sr.id,
            sr.doc_no,
            sr.report_type,
            sr.emp_no,
            sr.subject,
            sr.view_order,
            sr.time_zone,
            sr.reg_dttm AS created_at,
            sr.upd_dttm AS updated_at,
            sr.deleted_at,
            sr.submitted_at,
            sral.id AS approval_id,
            sral.state_type,
            sral.phase,
            sral.step_code,
            sral.emp_no AS approval_emp_no,
            sral.reason AS approval_reason,
            sral.timezone AS approval_timezone,
            sral.reg_dttm AS approval_created_at
           FROM v_report_group_list sr
             JOIN tb_avn_sm_approval_log sral ON sr.id = sral.group_id
          ORDER BY sr.id, sral.id DESC) report
     LEFT JOIN tb_avn_sm_reception sr2 ON report.id = sr2.group_id
     LEFT JOIN ( SELECT tb_sys_code.code_id,
            tb_sys_code.code_name_kor AS name_ko,
            tb_sys_code.code_name_eng AS name_en
           FROM tb_sys_code
          WHERE tb_sys_code.code_grp_id::text = 'CODE_GRP_092'::text) kc_rt ON kc_rt.code_id::text = report.report_type::text
     LEFT JOIN ( SELECT tb_sys_code.code_id,
            tb_sys_code.code_name_kor AS name_ko,
            tb_sys_code.code_name_eng AS name_en
           FROM tb_sys_code
          WHERE tb_sys_code.code_grp_id::text = 'CODE_GRP_077'::text) kc_sts ON kc_sts.code_id::text = report.state_type::text
     LEFT JOIN ( SELECT tb_sys_code.code_id,
            tb_sys_code.code_name_kor AS name_ko,
            tb_sys_code.code_name_eng AS name_en
           FROM tb_sys_code
          WHERE tb_sys_code.code_grp_id::text = 'CODE_GRP_084'::text) kc_phs ON kc_phs.code_id::text = report.step_code::text
     LEFT JOIN ( SELECT tb_sys_code.code_id,
            tb_sys_code.code_name_kor AS name_ko,
            tb_sys_code.code_name_eng AS name_en
           FROM tb_sys_code
          WHERE tb_sys_code.code_grp_id::text = 'CODE_GRP_078'::text) kc_stp ON kc_stp.code_id::text = report.step_code::text;


-- public.v_report_display_viewlist source

CREATE OR REPLACE VIEW public.v_report_display_viewlist
AS SELECT kds.id,
    kds.phase,
    kds.state,
    kds.step_code,
    kds.text_admin_en AS status_en,
    kds.text_admin_ko AS status_ko,
    kds.view_order,
    kds.page_code,
    ph.co_name_ko AS phase_name_ko,
    ph.co_name_en AS phase_name_en
   FROM tb_avn_display_status kds
     LEFT JOIN fn_codes('CODE_GRP_084'::character varying) ph(gr_id, gr_name_ko, gr_name_en, co_id, co_value, co_name_ko, co_name_en, co_view_order, code_field1_value) ON ph.co_value::text = kds.phase::text
  WHERE kds.page_code::text = 'pg_reporting'::text AND kds.system_type::text = 'report'::text AND (kds.text_admin_ko::text <> '-'::text OR kds.text_admin_en::text <> '-'::text);


-- public.v_report_group_all_list source

CREATE OR REPLACE VIEW public.v_report_group_all_list
AS SELECT grinfo.group_id AS id,
    grinfo.report_id,
    grinfo.report_type,
    grinfo.phase AS report_phase,
    grinfo.state_type AS report_state_type,
    grinfo.assessment_notes,
    grinfo.is_statistics_only,
    grinfo.ear_no,
    grinfo.is_hf,
    grinfo.is_avn_hzd,
    grinfo.is_ocu_hzd,
    grinfo.is_sfty_hzd,
    grinfo.is_main_report,
    rpt.report_docno AS doc_no,
    rpt.subject_nm AS subject,
    rpt.emp_no,
    rpt.work_scope_cd AS work_type,
    rpt.report_phase_cd AS phase,
    rpt.report_status_cd AS state_type,
    rpt.timezone_cd AS time_zone,
    rpt.final_submitted_yn AS is_submitted,
    rpt.final_submitted_dttm AS submitted_at,
    rpt.del_dttm AS deleted_at,
    rpt.view_sn AS view_order,
    rpt.reg_dttm,
    rpt.upd_dttm,
    rpt.occur_timezone_cd,
    rpt.report_type_cd,
    rpt.reg_dt AS created_at,
    rpt.change_dt AS updated_at,
    rpt.risk_assessment_notes_cn,
    rpt.occur_place_nm,
    rpt.occur_airport_cd,
    rpt.occur_dttm,
    rpt.description_txtcn
   FROM ( SELECT gr.id AS group_id,
            grlist.report_id,
            grlist.is_main_report,
            gr.report_type,
            gr.phase,
            gr.state_type,
            gr.assessment_notes,
            gr.is_statistics_only,
            gr.ear_no,
            gr.is_hf,
            gr.is_avn_hzd,
            gr.is_ocu_hzd,
            gr.is_sfty_hzd,
            gr.time_zone,
            gr.reg_dttm,
            gr.reg_user_id,
            gr.upd_dttm,
            gr.upd_user_id
           FROM tb_avn_sm_group_list grlist
             JOIN tb_avn_sm_group gr ON grlist.group_id = gr.id) grinfo,
    tb_avn_report rpt
  WHERE grinfo.report_id = rpt.report_id AND rpt.del_dttm IS NULL;


-- public.v_report_group_list source

CREATE OR REPLACE VIEW public.v_report_group_list
AS SELECT grinfo.group_id AS id,
    grinfo.report_id,
    grinfo.report_type,
    grinfo.phase,
    grinfo.state_type,
    grinfo.assessment_notes,
    grinfo.is_statistics_only,
    grinfo.ear_no,
    grinfo.is_hf,
    grinfo.is_avn_hzd,
    grinfo.is_ocu_hzd,
    grinfo.is_sfty_hzd,
    grinfo.is_lsc_close,
    grinfo.is_ocu_close,
    rpt.report_docno AS doc_no,
    rpt.subject_nm AS subject,
    rpt.emp_no,
    rpt.work_scope_cd AS work_type,
    rpt.report_phase_cd,
    rpt.report_status_cd,
    rpt.timezone_cd AS time_zone,
    rpt.final_submitted_yn AS is_submitted,
    rpt.final_submitted_dttm AS submitted_at,
    rpt.del_dttm AS deleted_at,
    rpt.view_sn AS view_order,
    rpt.reg_dttm,
    rpt.upd_dttm,
    rpt.occur_dttm,
    rpt.description_txtcn,
    rpt.occur_place_nm,
    rpt.occur_airport_cd,
    rpt.reg_dt
   FROM ( SELECT gr.id AS group_id,
            grlist.report_id,
            gr.report_type,
            gr.phase,
            gr.state_type,
            gr.assessment_notes,
            gr.is_statistics_only,
            gr.ear_no,
            gr.is_hf,
            gr.is_avn_hzd,
            gr.is_ocu_hzd,
            gr.is_sfty_hzd,
            gr.is_lsc_close,
            gr.is_ocu_close,
            gr.time_zone,
            gr.reg_dttm,
            gr.reg_user_id,
            gr.upd_dttm,
            gr.upd_user_id
           FROM tb_avn_sm_group_list grlist
             JOIN tb_avn_sm_group gr ON grlist.group_id = gr.id
          WHERE grlist.is_main_report::text = 'Y'::text) grinfo,
    tb_avn_report rpt
  WHERE grinfo.report_id = rpt.report_id AND rpt.del_dttm IS NULL;


-- public.v_report_hazard_list source

CREATE OR REPLACE VIEW public.v_report_hazard_list
AS SELECT smh.id,
    smh.group_id,
    smh.hazard_id,
    vhz.lv1_id,
    vhz.lv1_name,
    vhz.lv2_id,
    vhz.lv2_name,
    vhz.lv3_id,
    vhz.lv3_name,
    smh.consequence_id,
    kc.consequence_ko_nm AS name_ko,
    kc.consequence_en_nm AS name_en,
    smh.emp_no,
    fu.name_kor AS user_name_ko,
    fu.name_eng AS user_name_en,
    smh.risk_level1,
    smh.risk_level1_color,
    smh.is_mitigation,
    shal.phase,
    shal.step_code,
    smh.timezone,
    smh.reg_dttm AS created_at,
    smh.upd_dttm AS updated_at,
    smh.is_mitigation_validation,
    smh.risk_level2,
    smh.risk_level2_color,
    smh.hazard_no,
    smh.risk_level_hm,
    smh.risk_level_hm2
   FROM tb_avn_sm_report_hazard smh
     JOIN v_hazard_by_lv vhz ON vhz.lv3_id = smh.hazard_id
     LEFT JOIN tb_avn_consequence kc ON kc.consequence_id = smh.consequence_id
     JOIN tb_sys_user fu ON fu.emp_no::text = smh.emp_no::text
     JOIN ( SELECT t1.hazard_id,
            t1.phase,
            t1.step_code,
            t1.reason,
            row_number() OVER (PARTITION BY t1.hazard_id ORDER BY t1.id DESC) AS rnum
           FROM tb_avn_sm_hazard_approval_log t1) shal ON shal.hazard_id = smh.id AND shal.rnum = 1
  WHERE smh.deleted_at IS NULL;


-- public.v_report_receipt_viewlist source

CREATE OR REPLACE VIEW public.v_report_receipt_viewlist
AS SELECT sr.id,
    sr.doc_no,
    sr.report_type,
    sr.subject,
    '1'::text AS step,
    sr.emp_no AS reported_by,
    fu.name_kor AS reported_by_user_name_ko,
    fu.name_eng AS reported_by_user_name_en,
    sr.time_zone,
    sral.phase,
    sral.step_code,
    sral.reason,
    smr_fu.emp_no AS receipted_by,
    smr_fu.name_kor AS receipted_by_user_name_ko,
    smr_fu.name_eng AS receipted_by_user_name_en,
    smr_fu.dept_id AS receipt_dept_id,
    kds.text_admin_ko AS status_ko,
    kds.text_admin_en AS status_en,
    sr.is_submitted,
    sr.submitted_at,
    kef.fleet_code,
    smr.receipted_at,
    she.anony_yn AS is_confidential,
    smf.flight_no,
    smf.departure_dt AS departure_at,
    ( SELECT tb_sys_dept.name_kor
           FROM tb_sys_dept
          WHERE tb_sys_dept.dept_id::numeric = NULLIF(split_part(fd.full_path::text, '|'::text, 4), ''::text)::integer::numeric) AS headname,
    ( SELECT tb_sys_dept.name_kor
           FROM tb_sys_dept
          WHERE tb_sys_dept.dept_id::numeric = NULLIF(split_part(fd.full_path::text, '|'::text, 5), ''::text)::integer::numeric) AS deptname,
    she.safety_yn AS is_safety,
    she.kairs_yn AS is_kairs,
    smf.reg_no AS registration_no,
        CASE
            WHEN sr.submitted_at < '2023-09-12 00:00:00'::timestamp without time zone THEN kev.event_ko_nm
            ELSE ke2.event_nm
        END AS name_ko,
    kev.event_en_nm,
    vlm.emp_no AS lsc_leader_emp_no,
    sr.work_type
   FROM v_report_group_list sr
     LEFT JOIN tb_avn_report_flight smf ON smf.report_id = sr.report_id
     LEFT JOIN ( SELECT tb_sys_code.code_id AS id,
            tb_sys_code.code_name_kor AS fleet_code
           FROM tb_sys_code
          WHERE tb_sys_code.code_grp_id::text = 'CODE_GRP_159'::text) kef ON kef.id::text = smf.aircraft_type_cd::text
     LEFT JOIN tb_avn_sm_reception smr ON smr.group_id = sr.id
     LEFT JOIN tb_avn_sm_reception_ke_event srkev ON srkev.reception_id = smr.id
     LEFT JOIN tb_avn_event_backup kev ON srkev.event_id = kev.event_id
     LEFT JOIN tb_avn_event ke2 ON srkev.event_id = ke2.event_id
     LEFT JOIN tb_sys_user smr_fu ON smr_fu.emp_no::text = smr.emp_no::text
     LEFT JOIN tb_avn_report_hzr she ON she.report_id = sr.report_id
     LEFT JOIN tb_sys_user fu ON fu.emp_no::text = sr.emp_no::text
     LEFT JOIN v_lsc_member vlm ON vlm.group_id = sr.id AND vlm.member_type::text = 'leader'::text
     JOIN LATERAL fn_report_last_step(sr.id) sral(log_id, group_id, state_type, phase, step_code, stepped_by, reason, timezone, stepped_at) ON sral.group_id = sr.id
     LEFT JOIN tb_avn_display_status kds ON kds.phase::text = sral.phase::text AND kds.step_code::text = sral.step_code::text AND kds.page_code::text = 'pg_reception'::text
     LEFT JOIN tb_sys_dept fd ON fu.dept_cd::text = fd.dept_cd::text
  WHERE sr.deleted_at IS NULL AND sr.report_type::text <> 'rsr'::text;


-- public.v_report_resource source

CREATE OR REPLACE VIEW public.v_report_resource
AS SELECT vr.id,
    vr.doc_no,
    vr.report_type,
    vr.report_name_ko,
    vr.report_name_en,
    vr.emp_no,
    vr.subject,
    vr.time_zone,
    vr.state_type,
    vr.state_name_ko,
    vr.state_name_en,
    vr.phase,
    vr.phase_name_ko,
    vr.phase_name_en,
    vr.step_code,
    vr.step_name_ko,
    vr.step_name_en,
    vr.created_at,
    vr.updated_at,
    vr.deleted_at,
    vr.submitted_at,
    vr.approval_id,
    vr.approval_emp_no,
    vr.approval_reason,
    vr.approval_timezone,
    vr.approval_created_at,
    srfa.account_acnt_id AS acnt_id,
    srfa.acnt_type,
    srfa.role_type AS role_cd,
    kr.resource_name
   FROM v_report vr
     JOIN tb_avn_sm_report_fr_account srfa ON vr.id = srfa.group_id
     JOIN tb_sys_group_resource krfr ON srfa.role_type::text = krfr.group_cd::text
     JOIN ( SELECT tb_sys_code.code_id,
            tb_sys_code.code_name_kor AS resource_name
           FROM tb_sys_code
          WHERE tb_sys_code.code_grp_id::text = 'CODE_GRP_RESOURCE'::text) kr ON krfr.resource_id::text = kr.code_id::text;


-- public.v_report_search_receipted_or_voided source

CREATE OR REPLACE VIEW public.v_report_search_receipted_or_voided
AS SELECT sr.id,
    sr.report_id,
    sr.doc_no,
    sr.report_type,
    sr.emp_no AS reported_by,
    fu1.name_kor AS reported_by_user_name_ko,
    fu1.name_eng AS reported_by_user_name_en,
    sr.subject,
    sr.time_zone,
    sr.phase,
    sr.state_type AS state,
    sr.created_at,
    sr.updated_at,
    sr.submitted_at,
    sr.assessment_notes,
    sr.occur_dttm,
    sr.occur_timezone_cd,
    sr.occur_place_nm,
    sr.occur_airport_cd,
    sr.description_txtcn,
    sf.report_id AS flight_id,
    sf.departure_dt,
    sf.flight_no,
    sf.reg_no,
    sf.aircraft_type_cd,
    sf.departure_airport_cd,
    sf.arrival_airport_cd,
    sf.divert_airport_cd,
    sf.std_time,
    sf.sta_time,
    sf.atd_time,
    sf.ata_time,
    sf.delayed_min_co,
    sf.supply_nm,
    sf.checkin_nm,
    kf.fleet_code,
    st.step_code,
    st.stepped_at,
    re.id AS reception_id,
    re.emp_no AS receipted_by,
    fu2.name_kor AS receipted_by_user_name_ko,
    fu2.name_eng AS receipted_by_user_name_en,
    re.ata_adapter_type,
    re.event_followup,
    re.control_dept_type,
    re.event_summary,
    re.classification,
    re.is_spi,
    re.reg_dttm AS reception_created_at,
    re.upd_dttm AS reception_updated_at,
    re.timezone,
    re.receipted_at,
    re.is_receipted,
    ev.event_id,
    ev.event_nm AS event_name_ko,
    ev.event_nm AS event_name_en,
    cd.co_name_ko AS control_dept_name_ko,
    cd.co_name_en AS control_dept_name_en,
    ac.co_name_ko AS ata_chapter_name_ko,
    ac.co_name_en AS ata_chapter_name_en,
    cl.co_name_ko AS classification_name_ko,
    cl.co_name_ko AS classification_name_en,
        CASE
            WHEN sr.state_type::text = 'closed'::text THEN st.stepped_at
            ELSE NULL::timestamp without time zone
        END AS closed_at,
    vrdv.phase_name_ko,
    vrdv.phase_name_en,
    vrdv.status_ko,
    vrdv.status_en,
    sf.departure_loc_dttm,
    st.reason
   FROM v_report_group_all_list sr
     LEFT JOIN tb_sys_user fu1 ON fu1.emp_no::text = sr.emp_no::text
     LEFT JOIN tb_avn_report_flight sf ON sf.report_id = sr.id
     LEFT JOIN ( SELECT tsc.code_id AS aircraft_type,
            tsc.code_field1 AS fleet_code,
            tsc.use_yn
           FROM tb_sys_code tsc
          WHERE tsc.code_grp_id::text = 'CODE_GRP_159'::text) kf ON kf.aircraft_type::text = sf.aircraft_type_cd::text AND kf.use_yn::text = 'Y'::text
     LEFT JOIN LATERAL fn_report_last_step(sr.id) st(log_id, group_id, state, phase, step_code, stepped_by, reason, timezone, stepped_at) ON st.group_id = sr.id
     LEFT JOIN tb_avn_sm_reception re ON re.group_id = sr.id
     LEFT JOIN tb_sys_user fu2 ON fu2.emp_no::text = re.emp_no::text
     LEFT JOIN tb_avn_sm_reception_ke_event sk ON sk.reception_id = re.id
     LEFT JOIN tb_avn_event ev ON ev.event_id = sk.event_id AND ev.use_yn::text = 'Y'::text
     LEFT JOIN fn_codes('CODE_GRP_082'::character varying) cd(gr_id, gr_name_ko, gr_name_en, co_id, co_value, co_name_ko, co_name_en, co_view_order, code_field1_value) ON cd.co_value::text = re.control_dept_type::text
     LEFT JOIN fn_codes('CODE_GRP_076'::character varying) ac(gr_id, gr_name_ko, gr_name_en, co_id, co_value, co_name_ko, co_name_en, co_view_order, code_field1_value) ON ac.co_value::text = re.ata_adapter_type::text
     LEFT JOIN fn_codes('CODE_GRP_089'::character varying) cl(gr_id, gr_name_ko, gr_name_en, co_id, co_value, co_name_ko, co_name_en, co_view_order, code_field1_value) ON cl.co_value::text = re.classification::text
     LEFT JOIN v_report_display_viewlist vrdv ON vrdv.phase::text = sr.phase::text AND vrdv.step_code::text = st.step_code::text
  WHERE ev.use_yn::text = 'Y'::text AND re.is_receipted::text = 'Y'::text AND re.receipted_at IS NOT NULL;


-- public.v_report_search_submitted source

CREATE OR REPLACE VIEW public.v_report_search_submitted
AS SELECT sr.id,
    sr.doc_no,
    sr.report_type,
    sr.emp_no AS reported_by,
    sr.subject,
    sr.time_zone,
    sr.phase,
    sr.state_type AS state,
    sr.reg_dttm AS created_at,
    sr.upd_dttm AS updated_at,
    sr.submitted_at,
    sr.assessment_notes,
    sf.report_id AS flight_id,
    sf.departure_dt AS departure_at,
    sf.flight_no,
    sf.reg_no,
    sf.aircraft_type_cd AS aircraft_type,
    sf.departure_airport_cd AS from_airport,
    sf.arrival_airport_cd AS to_airport,
    sf.divert_airport_cd AS divert_airport,
    sf.std_time,
    sf.sta_time,
    sf.atd_time,
    sf.ata_time,
    sf.delayed_min_co AS delay_hour,
    sf.supply_nm AS supply,
    sf.checkin_nm AS check_in,
    kf.fleet_code AS fleet_id,
    kf.fleet_code,
    st.step_code,
    st.stepped_at,
    fu.name_kor AS reported_by_user_name_ko,
    fu.name_eng AS reported_by_user_name_en,
    sf.departure_loc_dttm AS departure_loc_at,
    st.reason,
    sr.is_hf,
    sr.ear_no,
    sr.occur_airport_cd AS airport,
    sr.work_type,
    sr.occur_dttm,
    sr.occur_timezone_cd,
    sr.occur_place_nm,
    sr.occur_airport_cd,
    sf.departure_loc_dttm,
    sr.emp_no
   FROM v_report_group_all_list sr
     LEFT JOIN tb_avn_report_flight sf ON sf.report_id = sr.id
     LEFT JOIN ( SELECT tb_sys_code.code_field1 AS fleet_code,
            tb_sys_code.code_id AS aircraft_type
           FROM tb_sys_code
          WHERE tb_sys_code.code_grp_id::text = 'CODE_GRP_159'::text AND tb_sys_code.use_yn::text = 'Y'::text) kf ON kf.aircraft_type::text = sf.aircraft_type_cd::text
     LEFT JOIN LATERAL fn_report_last_step(sr.id) st(log_id, group_id, state, phase, step_code, stepped_by, reason, timezone, stepped_at) ON st.group_id = sr.id
     LEFT JOIN tb_sys_user fu ON fu.emp_no::text = sr.emp_no::text
  WHERE sr.deleted_at IS NULL AND sr.is_submitted::text = 'Y'::text AND sr.submitted_at IS NOT NULL;


-- public.v_sect_info source

CREATE OR REPLACE VIEW public.v_sect_info
AS WITH RECURSIVE high_tree(dept_id, upper_dept_cd, dept_cd, name_kor, name_eng, full_path, tree_type, sort_order, level, path, sort) AS (
         SELECT a.dept_id,
            a.upper_dept_cd,
            a.dept_cd,
            a.name_kor,
            a.name_eng,
            a.full_path,
            a.tree_type,
            a.sort_order,
            0 AS level,
            ARRAY[TRIM(BOTH FROM a.dept_cd::character varying)] AS "array",
            '0'::text AS sort,
            b.sect_cd
           FROM tb_sys_dept a
             JOIN ( SELECT tb_test.menu_id,
                    tb_test.sect_cd,
                    tb_test.hd_cd,
                    tb_test.dept_cd
                   FROM tb_test) b ON a.dept_cd::text = b.dept_cd::text
        UNION ALL
         SELECT a.dept_id,
            a.upper_dept_cd,
            a.dept_cd,
            a.name_kor,
            a.name_eng,
            a.full_path,
            a.tree_type,
            a.sort_order,
            t.level + 1 AS level,
            t.path || TRIM(BOTH FROM a.sort_order::character varying::text || a.dept_cd::character varying::text) AS path,
            t.sort || TRIM(BOTH FROM a.sort_order::character varying::text || a.dept_cd::character varying::text) AS sort,
            t.sect_cd
           FROM tb_sys_dept a
             JOIN high_tree t ON a.dept_cd::text = t.upper_dept_cd::character varying::text
          WHERE 1 = 1 AND NOT (EXISTS ( SELECT 1
                   FROM tb_test b
                  WHERE b.dept_cd::text = a.dept_cd::text AND t.sect_cd::text = b.sect_cd::text)) AND a.full_path::text ~~ '900|10000|10001|%'::text
        ), high_data AS (
         SELECT high_tree.dept_id,
            high_tree.upper_dept_cd,
            high_tree.dept_cd,
            high_tree.name_kor,
            high_tree.name_eng,
            high_tree.full_path,
            high_tree.tree_type,
            high_tree.sort_order,
            high_tree.level,
            high_tree.path,
            high_tree.sort,
            high_tree.sect_cd
           FROM high_tree
        ), low_tree(dept_id, upper_dept_cd, dept_cd, name_kor, name_eng, full_path, tree_type, sort_order, level, path, sort) AS (
         SELECT a.dept_id,
            a.upper_dept_cd,
            a.dept_cd,
            a.name_kor,
            a.name_eng,
            a.full_path,
            a.tree_type,
            a.sort_order,
            0 AS level,
            ARRAY[TRIM(BOTH FROM a.dept_cd::character varying)] AS "array",
            '0'::text AS sort,
            b.sect_cd
           FROM tb_sys_dept a
             JOIN ( SELECT tb_test.menu_id,
                    tb_test.sect_cd,
                    tb_test.hd_cd,
                    tb_test.dept_cd
                   FROM tb_test) b ON a.dept_cd::text = b.dept_cd::text
        UNION ALL
         SELECT a.dept_id,
            a.upper_dept_cd,
            a.dept_cd,
            a.name_kor,
            a.name_eng,
            a.full_path,
            a.tree_type,
            a.sort_order,
            t.level + 1 AS level,
            t.path || TRIM(BOTH FROM a.sort_order::character varying::text || a.dept_cd::character varying::text) AS path,
            t.sort || TRIM(BOTH FROM a.sort_order::character varying::text || a.dept_cd::character varying::text) AS sort,
            t.sect_cd
           FROM tb_sys_dept a
             JOIN low_tree t ON a.upper_dept_cd::text = t.dept_cd::character varying::text
          WHERE 1 = 1 AND NOT (EXISTS ( SELECT 1
                   FROM tb_test b
                  WHERE b.dept_cd::text = a.dept_cd::text)) AND a.full_path::text ~~ '900|10000|10001|%'::text
        ), low_data AS (
         SELECT low_tree.dept_id,
            low_tree.upper_dept_cd,
            low_tree.dept_cd,
            low_tree.name_kor,
            low_tree.name_eng,
            low_tree.full_path,
            low_tree.tree_type,
            low_tree.sort_order,
            low_tree.level,
            low_tree.path,
            low_tree.sort,
            low_tree.sect_cd
           FROM low_tree
        ), all_data AS (
         SELECT low_data.dept_id,
            low_data.upper_dept_cd,
            low_data.dept_cd,
            low_data.name_kor,
            low_data.name_eng,
            low_data.full_path,
            low_data.tree_type,
            low_data.sort_order,
            low_data.level,
            low_data.path,
            low_data.sort,
            low_data.sect_cd
           FROM low_data
        UNION
         SELECT high_data.dept_id,
            high_data.upper_dept_cd,
            high_data.dept_cd,
            high_data.name_kor,
            high_data.name_eng,
            high_data.full_path,
            high_data.tree_type,
            high_data.sort_order,
            high_data.level,
            high_data.path,
            high_data.sort,
            high_data.sect_cd
           FROM high_data
        ), w_data AS (
         SELECT max(a.dept_id) AS dept_id,
            max(a.upper_dept_cd::text) AS upper_dept_cd_gubun,
            max(
                CASE
                    WHEN a.upper_dept_cd::text = 'COO'::text THEN a.sect_cd
                    ELSE a.upper_dept_cd
                END::text) AS upper_dept_cd,
            max(a.dept_cd::text) AS dept_cd,
            max(
                CASE
                    WHEN a.upper_dept_cd::text = 'COO'::text THEN a.sect_cd::text
                    ELSE a.upper_dept_cd::text || a.sect_cd::text
                END) AS upper_menu_id,
            max(a.dept_cd::text) || a.sect_cd::text AS menu_id,
            max(a.name_kor::text) AS name_kor,
            max(a.name_eng::text) AS name_eng,
            max(a.full_path::text) AS full_path,
            max(a.tree_type::text) AS tree_type,
            max(a.sort_order) AS sort_order,
            max(a.level) AS level,
            max(a.path) AS path,
            max(a.sort) AS sort,
            max(a.sect_cd::text) AS sect_cd
           FROM all_data a
             LEFT JOIN tb_test b ON a.dept_cd::text = b.hd_cd::text
          GROUP BY a.dept_cd, a.full_path, a.sect_cd
          ORDER BY a.full_path
        ), dept_tree(dept_id, upper_dept_cd, dept_cd, name_kor, name_eng, full_path, tree_type, sort_order, level, path, sort) AS (
         SELECT 1 AS dept_id,
            'COO'::character varying AS upper_dept_cd,
            a.code_id::character varying AS dept_cd,
            a.code_name_kor AS name_kor,
            a.code_name_kor AS name_eng,
            '900|10000|10001'::character varying AS full_path,
            'F'::character varying AS tree_type,
            '999'::character varying AS sort_order,
            0 AS level,
            ARRAY[TRIM(BOTH FROM a.code_id::character varying)] AS "array",
            a.code_id::character varying AS sort
           FROM tb_sys_code a
          WHERE a.code_grp_id::text = 'CODE_GRP_OC001'::text
        UNION ALL
         SELECT a.dept_id,
            a.upper_dept_cd,
            a.dept_cd,
            a.name_kor,
            a.name_eng,
            a.full_path,
            a.tree_type,
            a.sort_order,
            t.level + 1 AS level,
            t.path || TRIM(BOTH FROM a.sort_order::text || a.dept_cd::character varying::text),
            t.sort::text || TRIM(BOTH FROM a.sort_order::text || a.dept_cd::character varying::text) AS sort
           FROM ( SELECT a_1.dept_id,
                        CASE
                            WHEN a_1.dept_cd::text = 'SELDF'::text THEN 'DF'::character varying
                            WHEN a_1.dept_cd::text = 'SELDC'::text THEN 'DC'::character varying
                            WHEN a_1.dept_cd::text = 'SELDB'::text THEN 'DB'::character varying
                            WHEN a_1.dept_cd::text = 'SELDU'::text THEN 'DU'::character varying
                            WHEN a_1.dept_cd::text = 'SELDM'::text THEN 'DM'::character varying
                            ELSE a_1.upper_dept_cd
                        END AS upper_dept_cd,
                    a_1.dept_cd,
                    a_1.name_kor,
                    a_1.name_eng,
                    a_1.full_path,
                    a_1.tree_type,
                    a_1.sort_order::character varying AS sort_order
                   FROM tb_sys_dept a_1) a
             JOIN dept_tree t ON a.upper_dept_cd::text = t.dept_cd::text
          WHERE 1 = 1 AND NOT (EXISTS ( SELECT 1
                   FROM tb_test aa
                  WHERE a.dept_cd::text = aa.dept_cd::text))
        )
 SELECT dept_cd,
    max(dept_id) AS dept_id,
    max(name_kor::text) AS name_kor,
    max("substring"(sort::text, 1, 2)) AS sect_cd,
    max(fn_getcomcdnm('CODE_GRP_OC001'::character varying, "substring"(sort::text, 1, 2)::character varying)::text) AS sect_nm
   FROM ( SELECT a.dept_id,
            a.upper_dept_cd,
            a.dept_cd,
            a.upper_dept_cd AS upper_menu_id,
            a.dept_cd AS menu_id,
            a.name_kor,
            a.name_eng,
            a.full_path,
            a.tree_type,
            a.sort_order,
            a.sort
           FROM dept_tree a
          WHERE 1 = 1
        UNION ALL
         SELECT w_data.dept_id,
            w_data.upper_dept_cd,
            w_data.dept_cd,
            w_data.upper_menu_id,
            w_data.menu_id,
            w_data.name_kor,
            w_data.name_eng,
            w_data.full_path,
            w_data.tree_type,
            w_data.sort_order::character varying AS sort_order,
            (w_data.sect_cd || '0'::text) || TRIM(BOTH FROM w_data.sort_order::character varying::text || w_data.dept_cd::character varying::text) AS sort
           FROM w_data
  ORDER BY 8) unnamed_subquery
  WHERE 1 = 1
  GROUP BY dept_cd;


-- public.v_user_post source

CREATE OR REPLACE VIEW public.v_user_post
AS SELECT up.user_id,
    COALESCE(d.dept_id::numeric, '-1'::integer::numeric) AS dept_id,
    COALESCE(d.name_kor, ''::character varying) AS dept_name,
    up.post_dept_cd,
    up.post_name,
        CASE
            WHEN up.post_name::text = COALESCE(d.post_name, ''::character varying)::text THEN 'Y'::text
            ELSE 'N'::text
        END AS main_yn
   FROM tb_sys_user_post up
     LEFT JOIN tb_sys_dept d ON up.post_dept_id = d.dept_id::numeric;


-- public.v_viewlist_asr source

CREATE OR REPLACE VIEW public.v_viewlist_asr
AS SELECT DISTINCT vs.id,
    vs.report_type,
    vs.reported_by,
    vs.doc_no,
    vs.subject,
    vs.phase,
    vs.state,
    vs.submitted_at,
    vs.departure_dt,
    vs.timezone,
    vs.flight_no,
    vs.reg_no,
    vs.aircraft_type_cd,
    vs.fleet_code,
    vs.departure_airport_cd,
    vs.arrival_airport_cd,
    vs.divert_airport_cd,
    vs.supply_nm,
    vs.checkin_nm,
    vs.ata_adapter_type,
    vs.ata_chapter_name_ko,
    vs.ata_chapter_name_en,
    vs.control_dept_type,
    vs.control_dept_name_ko,
    vs.control_dept_name_en,
    vs.classification,
    vs.classification_name_ko,
    vs.classification_name_en,
    vs.event_id AS event_type_id,
    vs.event_name_en,
    vs.event_followup,
    vs.event_summary,
    vs.receipted_at,
    vs.occur_place_nm,
    vs.occur_airport_cd AS occurrence_airport,
    vs.occur_dttm,
    vs.occur_timezone_cd,
    vs.closed_at AS report_closed_at,
    vs.reported_by_user_name_ko,
    vs.reported_by_user_name_en,
    vs.receipted_by,
    vs.receipted_by_user_name_ko,
    vs.receipted_by_user_name_en,
    vs.status_ko,
    vs.status_en,
    vs.phase_name_ko,
    vs.phase_name_en,
    vs.departure_loc_dttm,
    vs.reason,
    ev.runway_nm,
    vs.occur_airport_cd,
    kc_1.code_name_kor AS flight_phase,
    ae.altitude,
    ae_2.speed,
    kc_2.code_name_kor AS met,
    ev.wind_one_co,
    ev.wind_two_co,
    ev.gust_co,
    ev.visibility_nm,
    kc_3.code_name_kor AS cloud,
    ev.temp_co,
    sw_2.altimeter,
    ( SELECT string_agg(ct.code_name_kor::text, chr(10)) AS significant_weather
           FROM ( SELECT unnest(string_to_array(ev.weather_cdarr::text, ','::text)) AS cdarr) arr
             LEFT JOIN tb_sys_code ct ON ct.code_id::text = arr.cdarr AND ct.code_grp_id::text = 'CODE_GRP_008'::text) AS significant_weather,
    ev.bird_type_nm,
    kc_4.code_name_kor AS bird_size,
    kc_5.code_name_kor AS number_seen,
    kc_6.code_name_kor AS number_struck,
        CASE
            WHEN ev.landing_light_yn::text = 'Y'::text THEN 'On'::text
            WHEN ev.landing_light_yn::text = 'N'::text THEN 'Off'::text
            ELSE NULL::text
        END AS is_landing_light,
        CASE
            WHEN ev.pilot_warned_yn::text = 'Y'::text THEN 'Yes'::text
            WHEN ev.pilot_warned_yn::text = 'N'::text THEN 'No'::text
            ELSE NULL::text
        END AS is_pilot_warned,
    ev.impact_time_nm,
    ev.bird_description_cn,
    sr.is_spi,
        CASE
            WHEN (( SELECT count(*) AS count
               FROM tb_avn_event ke3
              WHERE ke3.event_id = vs.event_id)) > 1 THEN ''::character varying
            ELSE ke2.event_nm
        END AS new_event_name
   FROM v_report_search_receipted_or_voided vs
     JOIN tb_avn_report_asr ev ON ev.report_id = vs.report_id
     LEFT JOIN tb_sys_code kc_1 ON kc_1.code_grp_id::text = 'CODE_GRP_002'::text AND kc_1.code_id::text = ev.flight_phase_cd::text
     LEFT JOIN ( SELECT ae_1.report_id,
            string_agg((ae_1.altitude_co::text || ' '::text) || kc.code_name_kor::text, ''::text) AS altitude
           FROM tb_avn_report_asr ae_1
             LEFT JOIN tb_sys_code kc ON kc.code_grp_id::text = 'CODE_GRP_004'::text AND kc.code_id::text = ae_1.altitude_unit_cd::text
          GROUP BY ae_1.report_id) ae ON ae.report_id = vs.report_id
     LEFT JOIN ( SELECT ae_3.report_id,
            string_agg((ae_3.speed_co::text || ' '::text) || kc.code_name_kor::text, ''::text) AS speed
           FROM tb_avn_report_asr ae_3
             LEFT JOIN tb_sys_code kc ON kc.code_grp_id::text = 'CODE_GRP_003'::text AND kc.code_id::text = ae_3.speed_unit_cd::text
          GROUP BY ae_3.report_id) ae_2 ON ae_2.report_id = vs.report_id
     LEFT JOIN tb_sys_code kc_2 ON kc_2.code_grp_id::text = 'CODE_GRP_005'::text AND kc_2.code_id::text = ev.met_cd::text
     LEFT JOIN tb_sys_code kc_3 ON kc_3.code_grp_id::text = 'CODE_GRP_007'::text AND kc_3.code_id::text = ev.cloud_cd::text
     LEFT JOIN ( SELECT sw_1.report_id,
            string_agg((sw_1.altimeter_co::text || ' '::text) || kc.code_name_kor::text, ''::text) AS altimeter
           FROM tb_avn_report_asr sw_1
             LEFT JOIN tb_sys_code kc ON kc.code_grp_id::text = 'CODE_GRP_006'::text AND kc.code_id::text = sw_1.altimeter_unit_cd::text
          GROUP BY sw_1.report_id) sw_2 ON sw_2.report_id = vs.report_id
     LEFT JOIN tb_sys_code kc_4 ON kc_4.code_grp_id::text = 'CODE_GRP_093'::text AND kc_4.code_id::text = ev.bird_size_cd::text
     LEFT JOIN tb_sys_code kc_5 ON kc_5.code_grp_id::text = 'CODE_GRP_094'::text AND kc_5.code_id::text = ev.bird_co_cd::text
     LEFT JOIN tb_sys_code kc_6 ON kc_6.code_grp_id::text = 'CODE_GRP_094'::text AND kc_6.code_id::text = ev.struck_bird_co_cd::text
     LEFT JOIN tb_avn_sm_reception sr ON vs.id = sr.group_id
     LEFT JOIN tb_avn_sm_reception_ke_event se ON se.reception_id = vs.reception_id
     LEFT JOIN tb_avn_event ke2 ON ke2.event_id = se.event_id OR ke2.event_id = vs.event_id
  WHERE vs.report_type::text = 'asr'::text;


-- public.v_viewlist_cgo_gsr source

CREATE OR REPLACE VIEW public.v_viewlist_cgo_gsr
AS SELECT DISTINCT vvg.id,
    vvg.report_type,
    vvg.reported_by,
    vvg.created_at,
    vvg.doc_no,
    vvg.subject,
    vvg.phase,
    vvg.state,
    vvg.submitted_at,
    vvg.departure_dt,
    vvg.flight_no,
    vvg.reg_no,
    vvg.aircraft_type_cd,
    vvg.fleet_code,
    vvg.departure_airport_cd,
    vvg.arrival_airport_cd,
    vvg.divert_airport_cd,
    vvg.supply_nm,
    vvg.checkin_nm,
    vvg.ata_adapter_type,
    vvg.ata_chapter_name_ko,
    vvg.ata_chapter_name_en,
    vvg.control_dept_type,
    vvg.control_dept_name_ko,
    vvg.control_dept_name_en,
    vvg.classification,
    vvg.classification_name_ko,
    vvg.classification_name_en,
    vvg.event_type_id,
    vvg.event_name_en,
    vvg.event_summary,
    vvg.event_followup,
    vvg.timezone,
    vvg.receipted_at,
    vvg.occurrence_airport,
    vvg.event_category,
    vvg.occur_place_nm,
    vvg.occur_dttm,
    vvg.irre_type_cd,
    ir.code_name_kor AS irr_type_name_ko,
    ir.code_name_eng AS irr_type_name_en,
    vvg.awb_nbr_nm,
    vvg.commondity_nm,
    vvg.orgstn_nm,
    vvg.destination_nm,
    vvg.imp_code_nm,
    vvg.unid_nbr_nm,
    vvg.occur_cls_nm,
    vvg.occur_timezone_cd,
    vvg.report_closed_at,
    vvg.reported_by_user_name_ko,
    vvg.reported_by_user_name_en,
    vvg.receipted_by,
    vvg.receipted_by_user_name_ko,
    vvg.receipted_by_user_name_en,
    vvg.status_ko,
    vvg.status_en,
    vvg.phase_name_ko,
    vvg.phase_name_en,
    vvg.departure_loc_dttm,
    vvg.reason,
        CASE
            WHEN (( SELECT count(*) AS count
               FROM tb_avn_event ke3
              WHERE ke3.event_id = vvg.event_type_id)) > 1 THEN ''::character varying
            ELSE ke2.event_nm
        END AS new_event_name
   FROM v_viewlist_gsr vvg
     LEFT JOIN tb_sys_code ir ON ir.code_id::text = vvg.irre_type_cd::text AND ir.code_grp_id::text = 'CODE_GRP_050'::text
     LEFT JOIN tb_avn_sm_reception_ke_event se ON se.reception_id = vvg.reception_id
     LEFT JOIN tb_avn_event ke2 ON ke2.event_id = se.event_id OR ke2.event_id = vvg.event_type_id;


-- public.v_viewlist_crew_injury_csr source

CREATE OR REPLACE VIEW public.v_viewlist_crew_injury_csr
AS SELECT vvc.id,
    vvc.report_type,
    vvc.reported_by,
    vvc.doc_no,
    vvc.subject,
    vvc.phase,
    vvc.state,
    vvc.submitted_at,
    vvc.departure_dt,
    vvc.timezone,
    vvc.flight_no,
    vvc.reg_no,
    vvc.aircraft_type_cd,
    vvc.fleet_code,
    vvc.departure_airport_cd,
    vvc.arrival_airport_cd,
    vvc.divert_airport_cd,
    vvc.supply_nm,
    vvc.checkin_nm,
    vvc.ata_adapter_type,
    vvc.ata_chapter_name_ko,
    vvc.ata_chapter_name_en,
    vvc.control_dept_type,
    vvc.control_dept_name_ko,
    vvc.control_dept_name_en,
    vvc.classification,
    vvc.classification_name_ko,
    vvc.classification_name_en,
    vvc.event_followup,
    vvc.event_summary,
    vvc.event_name_ko,
    vvc.event_name_en,
    vvc.receipted_at,
    vvc.occurrence_airport,
    vvc.event_category AS category_name_ko,
    vvc.occur_dttm,
    ot.code_name_kor AS time_of_occurrence_name_ko,
    ot.code_name_eng AS time_of_occurrence_name_en,
    vvc.inflight_occur_location_cd,
    lo.code_name_kor AS location_name_ko,
    lo.code_name_eng AS location_name_en,
    vvc.main_cause_cd,
    mc.code_name_kor AS main_cause_name_ko,
    mc.code_name_eng AS main_cause_name_en,
    vvc.injury_part_cdarr,
    ( SELECT string_agg(ct.code_name_kor::text, chr(10)) AS injury_part_name_ko
           FROM ( SELECT unnest(string_to_array(vvc.injury_part_cdarr::text, ','::text)) AS cdarr) arr
             LEFT JOIN tb_sys_code ct ON ct.code_id::text = arr.cdarr AND ct.code_grp_id::text = 'CODE_GRP_024'::text) AS injury_part_name_ko,
    ( SELECT string_agg(ct.code_name_eng::text, chr(10)) AS injury_part_name_en
           FROM ( SELECT unnest(string_to_array(vvc.injury_part_cdarr::text, ','::text)) AS cdarr) arr
             LEFT JOIN tb_sys_code ct ON ct.code_id::text = arr.cdarr AND ct.code_grp_id::text = 'CODE_GRP_024'::text) AS injury_part_name_en,
    ( SELECT string_agg(ct.code_name_kor::text, chr(10)) AS final_action_names_ko
           FROM ( SELECT unnest(string_to_array(vvc.car_cdarr::text, ','::text)) AS cdarr) arr
             LEFT JOIN tb_sys_code ct ON ct.code_id::text = arr.cdarr AND ct.code_grp_id::text = 'CODE_GRP_028'::text) AS final_action_names_ko,
    ( SELECT string_agg(ct.code_name_eng::text, chr(10)) AS final_action_names_en
           FROM ( SELECT unnest(string_to_array(vvc.car_cdarr::text, ','::text)) AS cdarr) arr
             LEFT JOIN tb_sys_code ct ON ct.code_id::text = arr.cdarr AND ct.code_grp_id::text = 'CODE_GRP_028'::text) AS final_action_names_en,
    ( SELECT string_agg(ct.code_name_kor::text, chr(10)) AS medical_equip_names_ko
           FROM ( SELECT unnest(string_to_array(vvc.use_medical_equip_cdarr::text, ','::text)) AS cdarr) arr
             LEFT JOIN tb_sys_code ct ON ct.code_id::text = arr.cdarr AND ct.code_grp_id::text = 'CODE_GRP_016'::text) AS medical_equip_names_ko,
    ( SELECT string_agg(ct.code_name_eng::text, chr(10)) AS medical_equip_names_en
           FROM ( SELECT unnest(string_to_array(vvc.use_medical_equip_cdarr::text, ','::text)) AS cdarr) arr
             LEFT JOIN tb_sys_code ct ON ct.code_id::text = arr.cdarr AND ct.code_grp_id::text = 'CODE_GRP_016'::text) AS medical_equip_names_en,
    vvc.seatbelt_view_yn,
    vvc.report_closed_at,
    vvc.reported_by_user_name_ko,
    vvc.reported_by_user_name_en,
    vvc.receipted_by,
    vvc.receipted_by_user_name_ko,
    vvc.receipted_by_user_name_en,
    vvc.status_ko,
    vvc.status_en,
    vvc.phase_name_ko,
    vvc.phase_name_en,
    vvc.departure_loc_dttm,
    vvc.reason
   FROM v_viewlist_csr vvc
     LEFT JOIN tb_sys_code ot ON ot.code_id::text = vvc.occur_time_cd::text AND ot.code_grp_id::text = 'CODE_GRP_021'::text
     LEFT JOIN tb_sys_code lo ON lo.code_id::text = vvc.inflight_occur_location_cd::text AND lo.code_grp_id::text = 'CODE_GRP_022'::text
     LEFT JOIN tb_sys_code mc ON mc.code_id::text = vvc.main_cause_cd::text AND mc.code_grp_id::text = 'CODE_GRP_027'::text;


-- public.v_viewlist_crew_patient_csr source

CREATE OR REPLACE VIEW public.v_viewlist_crew_patient_csr
AS SELECT vvc.id,
    vvc.report_type,
    vvc.reported_by,
    vvc.doc_no,
    vvc.subject,
    vvc.phase,
    vvc.state,
    vvc.submitted_at,
    vvc.departure_dt,
    vvc.timezone,
    vvc.flight_no,
    vvc.reg_no,
    vvc.aircraft_type_cd,
    vvc.fleet_code,
    vvc.departure_airport_cd,
    vvc.arrival_airport_cd,
    vvc.divert_airport_cd,
    vvc.supply_nm,
    vvc.checkin_nm,
    vvc.ata_adapter_type,
    vvc.ata_chapter_name_ko,
    vvc.ata_chapter_name_en,
    vvc.control_dept_type,
    vvc.control_dept_name_ko,
    vvc.control_dept_name_en,
    vvc.classification,
    vvc.classification_name_ko,
    vvc.classification_name_en,
    vvc.event_followup,
    vvc.event_summary,
    vvc.event_name_ko,
    vvc.event_name_en,
    vvc.receipted_at,
    vvc.occurrence_airport,
    vvc.event_category AS category_name_ko,
    vvc.occur_time_cd,
    ot.code_name_kor AS time_of_occurrence_name_ko,
    ot.code_name_eng AS time_of_occurrence_name_en,
    vvc.main_symptom_cd,
    ms.code_name_kor AS main_symptom_name_ko,
    ms.code_name_eng AS main_symptom_name_en,
    ( SELECT string_agg(ct.code_name_kor::text, chr(10)) AS final_action_names_ko
           FROM ( SELECT unnest(string_to_array(vvc.car_cdarr::text, ','::text)) AS cdarr) arr
             LEFT JOIN tb_sys_code ct ON ct.code_id::text = arr.cdarr AND ct.code_grp_id::text = 'CODE_GRP_026'::text) AS final_action_names_ko,
    ( SELECT string_agg(ct.code_name_eng::text, chr(10)) AS final_action_names_en
           FROM ( SELECT unnest(string_to_array(vvc.car_cdarr::text, ','::text)) AS cdarr) arr
             LEFT JOIN tb_sys_code ct ON ct.code_id::text = arr.cdarr AND ct.code_grp_id::text = 'CODE_GRP_026'::text) AS final_action_names_en,
    ( SELECT string_agg(ct.code_name_kor::text, chr(10)) AS medical_equip_names_ko
           FROM ( SELECT unnest(string_to_array(vvc.use_medical_equip_cdarr::text, ','::text)) AS cdarr) arr
             LEFT JOIN tb_sys_code ct ON ct.code_id::text = arr.cdarr AND ct.code_grp_id::text = 'CODE_GRP_016'::text) AS medical_equip_names_ko,
    ( SELECT string_agg(ct.code_name_eng::text, chr(10)) AS medical_equip_names_en
           FROM ( SELECT unnest(string_to_array(vvc.use_medical_equip_cdarr::text, ','::text)) AS cdarr) arr
             LEFT JOIN tb_sys_code ct ON ct.code_id::text = arr.cdarr AND ct.code_grp_id::text = 'CODE_GRP_016'::text) AS medical_equip_names_en,
    vvc.report_closed_at,
    vvc.reported_by_user_name_ko,
    vvc.reported_by_user_name_en,
    vvc.receipted_by,
    vvc.receipted_by_user_name_ko,
    vvc.receipted_by_user_name_en,
    vvc.status_ko,
    vvc.status_en,
    vvc.phase_name_ko,
    vvc.phase_name_en,
    vvc.departure_loc_dttm,
    vvc.reason
   FROM v_viewlist_csr vvc
     LEFT JOIN tb_sys_code ot ON ot.code_id::text = vvc.occur_time_cd::text AND ot.code_grp_id::text = 'CODE_GRP_021'::text
     LEFT JOIN tb_sys_code ms ON ms.code_id::text = vvc.main_symptom_cd::text AND ms.code_grp_id::text = 'CODE_GRP_015'::text;


-- public.v_viewlist_csr source

CREATE OR REPLACE VIEW public.v_viewlist_csr
AS SELECT vs.id,
    vs.report_type,
    vs.reported_by,
    vs.doc_no,
    vs.subject,
    vs.phase,
    vs.state,
    vs.submitted_at,
    vs.departure_dt,
    vs.timezone,
    vs.flight_no,
    vs.reg_no,
    vs.aircraft_type_cd,
    vs.fleet_code,
    vs.departure_airport_cd,
    vs.arrival_airport_cd,
    vs.divert_airport_cd,
    vs.supply_nm,
    vs.checkin_nm,
    vs.ata_adapter_type,
    vs.ata_chapter_name_ko,
    vs.ata_chapter_name_en,
    vs.control_dept_type,
    vs.control_dept_name_ko,
    vs.control_dept_name_en,
    vs.classification,
    vs.classification_name_ko,
    vs.classification_name_en,
    vs.event_followup,
    vs.event_summary,
    vs.event_name_ko,
    vs.event_name_en,
    vs.receipted_at,
    vs.occur_dttm,
    vs.occur_airport_cd AS occurrence_airport,
    ev.report_dtl_type_cd AS event_category,
    vs.closed_at AS report_closed_at,
    vs.reported_by_user_name_ko,
    vs.reported_by_user_name_en,
    vs.receipted_by,
    vs.receipted_by_user_name_ko,
    vs.receipted_by_user_name_en,
    vs.status_ko,
    vs.status_en,
    vs.phase_name_ko,
    vs.phase_name_en,
    vs.departure_loc_dttm,
    vs.reason,
    ev.patient_type_cd,
    ev.occur_time_cd,
    ev.main_symptom_cd,
    ev.doctor_treatment_cd,
    ev.document_cd,
    ev.inflight_occur_location_cd,
    ev.injury_part_cdarr,
    ev.seatbelt_view_yn,
    ev.main_cause_cd,
    ev.act_kind_cd,
    ev.pax_cls_cd,
    ev.cabin_occur_time,
    ev.cabin_occur_timezone_cd,
    ev.safety_inspection_type_cd,
    ev.check_authority_base_cd,
    ev.check_authority_cd,
    ev.finding_cd,
    ev.inspector_nm,
    ev.ciga_kind_cdarr,
    ev.evidence_seized_yn,
    ev.police_called_yn,
    ev.clue_cd,
    ev.smoke_detector_alarm_activate_cd,
    ev.cabin_log_yn,
    ev.voluntary_deplane_yn,
    ev.deplane_cause_cd,
    ev.accompanied_pax_yn,
    ev.delayed_yn,
    ev.maintenance_defect_kind_cd,
    ev.etc_briefing_kind_cd,
    ev.etc_briefing_item_cd,
    ev.fire_smoke_smell_cd,
    ev.etc_cause_cd,
    ev.use_medical_equip_cdarr,
    ev.car_cdarr,
    ev.add_car_cdarr,
    ev.use_emergency_equip_cdarr
   FROM v_report_search_receipted_or_voided vs
     JOIN tb_avn_report_csr ev ON ev.report_id = vs.report_id;


-- public.v_viewlist_damage_gsr source

CREATE OR REPLACE VIEW public.v_viewlist_damage_gsr
AS SELECT vvg.id,
    vvg.report_type,
    vvg.reported_by,
    vvg.created_at,
    vvg.doc_no,
    vvg.subject,
    vvg.phase,
    vvg.state,
    vvg.submitted_at,
    vvg.departure_dt,
    vvg.flight_no,
    vvg.reg_no,
    vvg.aircraft_type_cd,
    vvg.fleet_code,
    vvg.departure_airport_cd,
    vvg.arrival_airport_cd,
    vvg.divert_airport_cd,
    vvg.supply_nm,
    vvg.checkin_nm,
    vvg.ata_adapter_type,
    vvg.ata_chapter_name_ko,
    vvg.ata_chapter_name_en,
    vvg.control_dept_type,
    vvg.control_dept_name_ko,
    vvg.control_dept_name_en,
    vvg.classification,
    vvg.classification_name_ko,
    vvg.classification_name_en,
    vvg.event_type_id,
    vvg.event_name_en,
    vvg.event_summary,
    vvg.event_followup,
    vvg.timezone,
    vvg.receipted_at,
    vvg.occurrence_airport,
    vvg.event_category,
    vvg.timezone AS damage_timzone,
    vvg.occur_dttm,
    vvg.operation_phase_cd,
    po.code_name_kor AS phase_operation_name_ko,
    po.code_name_eng AS phase_operation_name_en,
    vvg.occur_location_cd,
    lo.code_name_kor AS location_name_ko,
    lo.code_name_eng AS location_name_en,
    vvg.ramp_status_cd,
    rc.code_name_kor AS ramp_condition_name_ko,
    rc.code_name_eng AS ramp_condition_name_en,
    vvg.ramp_handling_cd,
    rh.code_name_kor AS ramp_handling_name_ko,
    rh.code_name_eng AS ramp_handling_name_en,
    vvg.aircraft_damage_cause_cd,
    ad.code_name_kor AS aircraft_damage_name_ko,
    ad.code_name_eng AS aircraft_damage_name_en,
    vvg.find_type_cd,
    ft.code_name_kor AS finding_type_name_ko,
    ft.code_name_eng AS finding_type_name_en,
    vvg.car_cn,
    vvg.occur_timezone_cd,
    ( SELECT string_agg(ct.code_name_kor::text, chr(10)) AS weather_names_ko
           FROM ( SELECT unnest(string_to_array(vvg.weather_cdarr::text, ','::text)) AS cdarr) arr
             LEFT JOIN tb_sys_code ct ON ct.code_id::text = arr.cdarr AND ct.code_grp_id::text = 'CODE_GRP_043'::text) AS weather_names_ko,
    ( SELECT string_agg(ct.code_name_eng::text, chr(10)) AS weather_names_en
           FROM ( SELECT unnest(string_to_array(vvg.weather_cdarr::text, ','::text)) AS cdarr) arr
             LEFT JOIN tb_sys_code ct ON ct.code_id::text = arr.cdarr AND ct.code_grp_id::text = 'CODE_GRP_043'::text) AS weather_names_en,
    pa.part_type,
    pa.part_name_ko,
    pa.part_name_en,
    eq.equip_type,
    eq.equip_name_ko,
    eq.equip_name_en,
    vvg.report_closed_at,
    vvg.reported_by_user_name_ko,
    vvg.reported_by_user_name_en,
    vvg.receipted_by,
    vvg.receipted_by_user_name_ko,
    vvg.receipted_by_user_name_en,
    vvg.status_ko,
    vvg.status_en,
    vvg.phase_name_ko,
    vvg.phase_name_en,
    vvg.departure_loc_dttm,
    vvg.reason,
        CASE
            WHEN (( SELECT count(*) AS count
               FROM tb_avn_event ke3
              WHERE ke3.event_id = vvg.event_type_id)) > 1 THEN ''::character varying
            ELSE ke2.event_nm
        END AS new_event_name
   FROM v_viewlist_gsr vvg
     LEFT JOIN ( SELECT
                CASE
                    WHEN ranking.part_count > 1 THEN (((aa.code_name_kor::text || ' 외 '::text) || ((ranking.part_count - 1)::text)) || '건'::text)::character varying
                    ELSE aa.code_name_kor
                END AS part_name_ko,
                CASE
                    WHEN ranking.part_count > 1 THEN (((aa.code_name_eng::text || ' also '::text) || ((ranking.part_count - 1)::text)) || ' kinds'::text)::character varying
                    ELSE aa.code_name_eng
                END AS part_name_en,
            ranking.report_id,
            ranking.part_type,
            ranking.part_count,
            ranking.part_rank
           FROM ( SELECT ap.id,
                    ap.report_id,
                    ap.aircraft_damage_area_cd AS part_type,
                    count(ap.id) OVER (PARTITION BY ap.report_id) AS part_count,
                    rank() OVER (PARTITION BY ap.report_id ORDER BY ap.id DESC) AS part_rank
                   FROM tb_avn_report_gsr_dtl_info ap
                  WHERE ap.report_dtl_info_type_cd::text = 'GSR_01'::text) ranking
             LEFT JOIN tb_sys_code aa ON aa.code_id::text = ranking.part_type::text AND aa.code_grp_id::text = 'CODE_GRP_044'::text
          WHERE ranking.part_rank <= 1) pa ON pa.report_id = vvg.report_id
     LEFT JOIN ( SELECT
                CASE
                    WHEN ranking.equip_count > 1 THEN (((bb.code_name_kor::text || ' 외 '::text) || ((ranking.equip_count - 1)::text)) || '건'::text)::character varying
                    ELSE bb.code_name_kor
                END AS equip_name_ko,
                CASE
                    WHEN ranking.equip_count > 1 THEN (((bb.code_name_eng::text || ' also '::text) || ((ranking.equip_count - 1)::text)) || ' kinds'::text)::character varying
                    ELSE bb.code_name_eng
                END AS equip_name_en,
            ranking.report_id,
            ranking.equip_type,
            ranking.equip_count,
            ranking.equip_rank
           FROM ( SELECT ap.id,
                    ap.report_id,
                    ap.rel_equip_cd AS equip_type,
                    count(ap.id) OVER (PARTITION BY ap.report_id) AS equip_count,
                    rank() OVER (PARTITION BY ap.report_id ORDER BY ap.id DESC) AS equip_rank
                   FROM tb_avn_report_gsr_dtl_info ap
                  WHERE ap.report_dtl_info_type_cd::text = 'GSR_02'::text) ranking
             LEFT JOIN tb_sys_code bb ON bb.code_id::text = ranking.equip_type::text AND bb.code_grp_id::text = 'CODE_GRP_045'::text
          WHERE ranking.equip_rank <= 1) eq ON eq.report_id = vvg.report_id
     LEFT JOIN tb_sys_code lo ON lo.code_id::text = vvg.occur_location_cd::text AND lo.code_grp_id::text = 'CODE_GRP_123'::text
     LEFT JOIN tb_sys_code rc ON rc.code_id::text = vvg.ramp_status_cd::text AND rc.code_grp_id::text = 'CODE_GRP_042'::text
     LEFT JOIN tb_sys_code rh ON rh.code_id::text = vvg.ramp_handling_cd::text AND rh.code_grp_id::text = 'CODE_GRP_122'::text
     LEFT JOIN tb_sys_code ad ON ad.code_id::text = vvg.aircraft_damage_cause_cd::text AND ad.code_grp_id::text = 'CODE_GRP_121'::text
     LEFT JOIN tb_sys_code po ON po.code_id::text = vvg.operation_phase_cd::text AND po.code_grp_id::text = 'CODE_GRP_041'::text
     LEFT JOIN tb_sys_code ft ON ft.code_id::text = vvg.find_type_cd::text AND ft.code_grp_id::text = 'CODE_GRP_124'::text
     LEFT JOIN tb_avn_sm_reception_ke_event se ON se.reception_id = vvg.reception_id
     LEFT JOIN tb_avn_event ke2 ON ke2.event_id = se.event_id OR ke2.event_id = vvg.event_type_id;


-- public.v_viewlist_dsr source

CREATE OR REPLACE VIEW public.v_viewlist_dsr
AS SELECT DISTINCT vs.id,
    vs.report_type,
    vs.reported_by,
    vs.created_at,
    vs.doc_no,
    vs.subject,
    vs.phase,
    vs.state,
    vs.timezone,
    vs.submitted_at,
    vs.departure_dt,
    vs.flight_no,
    vs.reg_no,
    vs.aircraft_type_cd,
    vs.fleet_code,
    vs.departure_airport_cd,
    vs.arrival_airport_cd,
    vs.divert_airport_cd,
    vs.supply_nm,
    vs.checkin_nm,
    vs.ata_adapter_type,
    vs.ata_chapter_name_ko,
    vs.ata_chapter_name_en,
    vs.control_dept_type,
    vs.control_dept_name_ko,
    vs.control_dept_name_en,
    vs.classification,
    vs.classification_name_ko,
    vs.classification_name_en,
    vs.event_id AS event_type_id,
    vs.event_name_en,
    vs.event_summary,
    vs.event_followup,
    vs.receipted_at,
    vs.occur_place_nm,
    vs.occur_airport_cd AS occurrence_airport,
    vs.closed_at AS report_closed_at,
    vs.reported_by_user_name_ko,
    vs.reported_by_user_name_en,
    vs.receipted_by,
    vs.receipted_by_user_name_ko,
    vs.receipted_by_user_name_en,
    vs.status_ko,
    vs.status_en,
    vs.phase_name_ko,
    vs.phase_name_en,
    vs.departure_loc_dttm,
    vs.reason,
        CASE
            WHEN (( SELECT count(*) AS count
               FROM tb_avn_event ke3
              WHERE ke3.event_id = vs.event_id)) > 1 THEN ''::character varying
            ELSE ke2.event_nm
        END AS new_event_name
   FROM v_report_search_receipted_or_voided vs
     JOIN tb_avn_report_dsr ev ON ev.report_id = vs.id
     LEFT JOIN tb_avn_sm_reception_ke_event se ON se.reception_id = vs.reception_id
     LEFT JOIN tb_avn_event ke2 ON ke2.event_id = se.event_id OR ke2.event_id = vs.event_id;


-- public.v_viewlist_foqa source

CREATE OR REPLACE VIEW public.v_viewlist_foqa
AS SELECT DISTINCT vs.id,
    vs.report_type,
    vs.reported_by,
    vs.created_at,
    vs.submitted_at,
    vs.timezone,
    vs.divert_airport_cd,
    vs.doc_no,
    vs.subject,
    vs.phase,
    vs.state,
    vs.departure_dt,
    vs.flight_no,
    vs.reg_no,
    vs.aircraft_type_cd,
    vs.fleet_code,
    vs.departure_airport_cd,
    vs.arrival_airport_cd,
    vs.std_time,
    vs.sta_time,
    vs.atd_time,
    vs.ata_time,
    vs.supply_nm,
    vs.checkin_nm,
    vs.ata_adapter_type,
    vs.ata_chapter_name_ko,
    vs.ata_chapter_name_en,
    vs.reception_id,
    vs.is_spi,
    vs.event_id AS event_type_id,
    vs.event_name_en,
    vs.control_dept_type,
    vs.control_dept_name_ko,
    vs.control_dept_name_en,
    vs.classification,
    vs.classification_name_ko,
    vs.classification_name_en,
    vs.event_followup,
    vs.event_summary,
    vs.receipted_at,
    ev.category AS event_category,
    ev.de_id_date,
    ff.fdm_file_no_nm,
    ff.takeoff_rwy_nm,
    ff.landing_rwy_nm,
    ff.pf_flight_time_co,
    ff.pf_duty_nm,
    pfc.code_name_kor AS pf_duty_name_ko,
    pfc.code_name_eng AS pf_duty_name_en,
    ff.pm_flight_time_co,
    ff.pm_duty_nm,
    pmc.code_name_kor AS pm_duty_name_ko,
    pmc.code_name_eng AS pm_duty_name_en,
    rf.id AS reception_foqa_id,
    rf.foqa_usa,
    rf.foqa_metar,
    rf.foqa_valid,
    vs.occur_airport_cd,
    ea.runway_nm,
    ea.go_around_yn,
    ea.flight_phase_cd,
    fpc.code_name_kor AS flight_phase_name_ko,
    fpc.code_name_eng AS flight_phase_name_en,
    ea.event_value,
    rm.id AS risk_mgmt_id,
    rm.level_type,
    ltc.code_name_kor AS level_type_name_ko,
    ltc.code_name_eng AS level_type_name_en,
    rm.fleet,
    rm.related_doc AS risk_related_doc,
    rm.risk_level,
    rm.event_occur,
    rm.ttl_hazard,
    rm.high,
    rm.medium,
    rm.low,
    frc.code_name_kor AS foqa_risk_level_name_ko,
    frc.code_name_eng AS foqa_risk_level_name_en,
    vs.closed_at AS report_closed_at,
    vs.reported_by_user_name_ko,
    vs.reported_by_user_name_en,
    vs.receipted_by,
    vs.receipted_by_user_name_ko,
    vs.receipted_by_user_name_en,
    vs.status_ko,
    vs.status_en,
    vs.phase_name_ko,
    vs.phase_name_en,
    vs.departure_loc_dttm,
    vs.reason,
        CASE
            WHEN (( SELECT count(*) AS count
               FROM tb_avn_event ke3
              WHERE ke3.event_id = vs.event_id)) > 1 THEN ''::character varying
            ELSE ke2.event_nm
        END AS new_event_name
   FROM v_report_search_receipted_or_voided vs
     JOIN tb_avn_sm_reception_foqa rf ON rf.reception_id = vs.reception_id
     JOIN tb_avn_report_foqa ev ON ev.report_id = vs.report_id
     LEFT JOIN tb_avn_report_flight ff ON ff.report_id = vs.report_id
     LEFT JOIN tb_avn_report_foqa ea ON ea.report_id = ev.report_id
     LEFT JOIN tb_avn_sm_foqa_risk_mgmt rm ON rm.report_id = ev.report_id
     LEFT JOIN tb_sys_code frc ON frc.code_id::text = rm.risk_level::text AND frc.code_grp_id::text = 'CODE_GRP_075'::text
     LEFT JOIN tb_sys_code pfc ON pfc.code_id::text = ff.pf_duty_nm::text AND pfc.code_grp_id::text = 'CODE_GRP_067'::text
     LEFT JOIN tb_sys_code pmc ON pmc.code_id::text = ff.pm_duty_nm::text AND pfc.code_grp_id::text = 'CODE_GRP_067'::text
     LEFT JOIN tb_sys_code fpc ON fpc.code_id::text = ea.flight_phase_cd::text AND fpc.code_grp_id::text = 'CODE_GRP_073'::text
     LEFT JOIN tb_sys_code ltc ON ltc.code_id::text = rm.level_type::text AND ltc.code_grp_id::text = 'CODE_GRP_074'::text
     LEFT JOIN tb_avn_sm_reception_ke_event se ON se.reception_id = vs.reception_id
     LEFT JOIN tb_avn_event ke2 ON ke2.event_id = se.event_id OR ke2.event_id = vs.event_id;


-- public.v_viewlist_foqa_hazard source

CREATE OR REPLACE VIEW public.v_viewlist_foqa_hazard
AS SELECT sfh.risk_mgmt_id,
    string_agg(khl.lv1_name::text, '|'::text ORDER BY sfh.id) AS lv1_name,
    string_agg(khl.lv2_name::text, '|'::text ORDER BY sfh.id) AS lv2_name,
    string_agg(khl.lv3_name::text, '|'::text ORDER BY sfh.id) AS lv3_name,
    string_agg(sfh.occur::text, '|'::text ORDER BY sfh.id) AS hazard_occur,
    string_agg(sfh.related_doc::text, '|'::text ORDER BY sfh.id) AS hazard_related_doc
   FROM tb_avn_sm_foqa_hazard sfh
     JOIN v_hazard_by_lv khl ON khl.lv3_id = sfh.hazard_id
  WHERE sfh.foqa_risk_level IS NOT NULL AND sfh.occur IS NOT NULL AND sfh.related_doc IS NOT NULL
  GROUP BY sfh.risk_mgmt_id;


-- public.v_viewlist_gsr source

CREATE OR REPLACE VIEW public.v_viewlist_gsr
AS SELECT DISTINCT vs.id,
    vs.report_id,
    vs.report_type,
    vs.reported_by,
    vs.created_at,
    vs.doc_no,
    vs.subject,
    vs.phase,
    vs.state,
    vs.submitted_at,
    vs.departure_dt,
    vs.flight_no,
    vs.reg_no,
    vs.aircraft_type_cd,
    vs.fleet_code,
    vs.departure_airport_cd,
    vs.arrival_airport_cd,
    vs.divert_airport_cd,
    vs.supply_nm,
    vs.checkin_nm,
    vs.ata_adapter_type,
    vs.ata_chapter_name_ko,
    vs.ata_chapter_name_en,
    vs.control_dept_type,
    vs.control_dept_name_ko,
    vs.control_dept_name_en,
    vs.classification,
    vs.classification_name_ko,
    vs.classification_name_en,
    vs.event_id AS event_type_id,
    vs.event_name_ko,
    vs.event_name_en,
    vs.event_summary,
    vs.event_followup,
    vs.receipted_at,
    vs.timezone,
    vs.occur_place_nm,
    vs.occur_airport_cd AS occurrence_airport,
    vs.occur_dttm,
    vs.occur_timezone_cd,
    ev.report_dtl_type_cd AS event_category,
    vs.closed_at AS report_closed_at,
    vs.reported_by_user_name_ko,
    vs.reported_by_user_name_en,
    vs.receipted_by,
    vs.receipted_by_user_name_ko,
    vs.receipted_by_user_name_en,
    vs.status_ko,
    vs.status_en,
    vs.phase_name_ko,
    vs.phase_name_en,
    vs.departure_loc_dttm,
    vs.reason,
    vs.reception_id,
    ev.occur_location_cd,
    ev.find_notify_cd,
    ev.find_type_cd,
    ev.operation_phase_cd,
    ev.ramp_handling_cd,
    ev.aircraft_damage_cause_cd,
    ev.ramp_status_cd,
    ev.weather_cdarr,
    ev.injury_yn,
    ev.injury_cn,
    ev.car_cn,
    ev.check_kind_cd,
    ev.control_authority_cd,
    ev.reldept_cd,
    ev.inspection_area_cd,
    ev.inspection_result_cd,
    ev.etc_cn,
    ev.irre_type_cd,
    ev.cgo_yn,
    ev.awb_nbr_nm,
    ev.pc_swt_nm,
    ev.commondity_nm,
    ev.dimension_nm,
    ev.orgstn_nm,
    ev.destination_nm,
    ev.imp_code_nm,
    ev.unid_nbr_nm,
    ev.psn_nm,
    ev.occur_cls_nm,
    ev.uld_nbr_nm,
    ev.loading_pos_nm,
    ev.selft_auth_yn
   FROM v_report_search_receipted_or_voided vs
     JOIN tb_avn_report_gsr ev ON ev.report_id = vs.report_id;


-- public.v_viewlist_hzr source

CREATE OR REPLACE VIEW public.v_viewlist_hzr
AS SELECT DISTINCT vs.id,
    vs.report_type,
    vs.reported_by,
    vs.doc_no,
    vs.subject,
    vs.phase,
    vs.state,
    vs.submitted_at,
    vs.departure_dt,
    vs.timezone,
    vs.flight_no,
    vs.reg_no,
    vs.aircraft_type_cd,
    vs.fleet_code,
    vs.departure_airport_cd,
    vs.arrival_airport_cd,
    vs.divert_airport_cd,
    vs.supply_nm,
    vs.checkin_nm,
    vs.ata_adapter_type,
    vs.ata_chapter_name_ko,
    vs.ata_chapter_name_en,
    vs.control_dept_type,
    vs.control_dept_name_ko,
    vs.control_dept_name_en,
    vs.classification,
    vs.classification_name_ko,
    vs.classification_name_en,
    vs.event_id AS event_type_id,
    vs.event_name_en,
    vs.event_followup,
    vs.event_summary,
    vs.receipted_at,
    ev.anony_yn,
    ev.feedback_yn,
    ev.email_addr,
    be.id AS hazard_benefit_id,
    be.name AS hazard_benefit_name,
    vs.reported_by_user_name_ko,
    vs.reported_by_user_name_en,
    de.name_kor AS reported_by_dept_name_ko,
    de.name_eng AS reported_by_dept_name_en,
    vs.closed_at AS report_closed_at,
    vs.receipted_by,
    vs.receipted_by_user_name_ko,
    vs.receipted_by_user_name_en,
    vs.status_ko,
    vs.status_en,
    vs.phase_name_ko,
    vs.phase_name_en,
    vs.departure_loc_dttm,
    vs.reason,
        CASE
            WHEN (( SELECT count(*) AS count
               FROM tb_avn_event ke3
              WHERE ke3.event_id = vs.event_id)) > 1 THEN ''::character varying
            ELSE ke2.event_nm
        END AS new_event_name,
    sr.sector
   FROM v_report_search_receipted_or_voided vs
     JOIN tb_avn_report_hzr ev ON ev.report_id = vs.report_id
     LEFT JOIN tb_avn_sm_reception_hzr hb ON hb.reception_id = vs.reception_id
     LEFT JOIN ( SELECT tb_sys_code.code_id::numeric AS id,
            tb_sys_code.code_name_kor AS name
           FROM tb_sys_code
          WHERE tb_sys_code.code_grp_id::text = 'CODE_GRP_162'::text) be ON be.id = hb.hazard_benefit_id::numeric
     LEFT JOIN tb_sys_user us ON us.emp_no::text = vs.reported_by::text
     LEFT JOIN tb_sys_dept de ON de.dept_id::numeric = us.dept_id
     LEFT JOIN tb_avn_sm_reception_ke_event se ON se.reception_id = vs.reception_id
     LEFT JOIN tb_avn_event ke2 ON ke2.event_id = se.event_id OR ke2.event_id = vs.event_id
     LEFT JOIN tb_avn_sm_reception sr ON sr.id = hb.reception_id;


-- public.v_viewlist_inspection_csr source

CREATE OR REPLACE VIEW public.v_viewlist_inspection_csr
AS SELECT vvc.id,
    vvc.report_type,
    vvc.reported_by,
    vvc.doc_no,
    vvc.subject,
    vvc.phase,
    vvc.state,
    vvc.submitted_at,
    vvc.departure_dt,
    vvc.timezone,
    vvc.flight_no,
    vvc.reg_no,
    vvc.aircraft_type_cd,
    vvc.fleet_code,
    vvc.departure_airport_cd,
    vvc.arrival_airport_cd,
    vvc.divert_airport_cd,
    vvc.supply_nm,
    vvc.checkin_nm,
    vvc.ata_adapter_type,
    vvc.ata_chapter_name_ko,
    vvc.ata_chapter_name_en,
    vvc.control_dept_type,
    vvc.control_dept_name_ko,
    vvc.control_dept_name_en,
    vvc.classification,
    vvc.classification_name_ko,
    vvc.classification_name_en,
    vvc.event_followup,
    vvc.event_summary,
    vvc.event_name_ko,
    vvc.event_name_en,
    vvc.receipted_at,
    vvc.occurrence_airport,
    vvc.event_category AS category_name_ko,
    vvc.safety_inspection_type_cd,
    ip.code_name_kor AS inspection_name_ko,
    ip.code_name_eng AS inspection_name_en,
    vvc.check_authority_base_cd,
    ba.code_name_kor AS base_authority_name_ko,
    ba.code_name_eng AS base_authority_name_en,
    vvc.finding_cd,
    fi.code_name_kor AS finding_ko,
    fi.code_name_eng AS finding_en,
    vvc.inspector_nm,
    vvc.check_authority_cd,
    id.code_name_kor AS inspection_dept_name_ko,
    id.code_name_eng AS inspection_dept_name_en,
    vvc.report_closed_at,
    vvc.reported_by_user_name_ko,
    vvc.reported_by_user_name_en,
    vvc.receipted_by,
    vvc.receipted_by_user_name_ko,
    vvc.receipted_by_user_name_en,
    vvc.status_ko,
    vvc.status_en,
    vvc.phase_name_ko,
    vvc.phase_name_en,
    vvc.departure_loc_dttm,
    vvc.reason
   FROM v_viewlist_csr vvc
     LEFT JOIN tb_sys_code ip ON ip.code_id::text = vvc.safety_inspection_type_cd::text AND ip.code_grp_id::text = 'CODE_GRP_096'::text
     LEFT JOIN tb_sys_code ba ON ba.code_id::text = vvc.check_authority_base_cd::text AND ba.code_grp_id::text = 'CODE_GRP_097'::text
     LEFT JOIN tb_sys_code fi ON fi.code_id::text = vvc.finding_cd::text AND fi.code_grp_id::text = 'CODE_GRP_098'::text
     LEFT JOIN tb_sys_code id ON id.code_id::text = vvc.check_authority_cd::text AND id.code_grp_id::text = 'CODE_GRP_010'::text;


-- public.v_viewlist_inspection_gsr source

CREATE OR REPLACE VIEW public.v_viewlist_inspection_gsr
AS SELECT vvg.id,
    vvg.report_type,
    vvg.reported_by,
    vvg.created_at,
    vvg.doc_no,
    vvg.subject,
    vvg.phase,
    vvg.state,
    vvg.submitted_at,
    vvg.departure_dt,
    vvg.flight_no,
    vvg.reg_no,
    vvg.aircraft_type_cd,
    vvg.fleet_code,
    vvg.departure_airport_cd,
    vvg.arrival_airport_cd,
    vvg.divert_airport_cd,
    vvg.supply_nm,
    vvg.checkin_nm,
    vvg.ata_adapter_type,
    vvg.ata_chapter_name_ko,
    vvg.ata_chapter_name_en,
    vvg.control_dept_type,
    vvg.control_dept_name_ko,
    vvg.control_dept_name_en,
    vvg.classification,
    vvg.classification_name_ko,
    vvg.classification_name_en,
    vvg.event_type_id,
    vvg.event_name_en,
    vvg.event_summary,
    vvg.event_followup,
    vvg.timezone,
    vvg.receipted_at,
    vvg.occurrence_airport,
    vvg.event_category,
    vvg.occur_place_nm,
    vvg.occur_dttm,
        CASE
            WHEN vvg.check_kind_cd::text = 'other'::text THEN ((vvg.check_kind_cd::text || ' - '::text) || vvg.etc_cn::text)::character varying
            ELSE vvg.check_kind_cd
        END::character varying(50) AS inspection_type,
    ip.code_name_kor AS inspection_name_ko,
    ip.code_name_eng AS inspection_name_en,
    vvg.control_authority_cd,
    ra.code_name_kor AS requlatory_authority_name_ko,
    ra.code_name_eng AS requlatory_authority_name_en,
    vvg.reldept_cd,
    di.code_name_kor AS division_name_ko,
    di.code_name_eng AS division_name_en,
    vvg.inspection_area_cd,
    rg.code_name_kor AS region_name_ko,
    rg.code_name_eng AS region_name_en,
    vvg.inspection_result_cd,
    ir.code_name_kor AS inspection_result_name_ko,
    ir.code_name_eng AS inspection_result_name_en,
    vvg.occur_timezone_cd,
    vvg.report_closed_at,
    vvg.reported_by_user_name_ko,
    vvg.reported_by_user_name_en,
    vvg.receipted_by,
    vvg.receipted_by_user_name_ko,
    vvg.receipted_by_user_name_en,
    vvg.status_ko,
    vvg.status_en,
    vvg.phase_name_ko,
    vvg.phase_name_en,
    vvg.departure_loc_dttm,
    vvg.reason,
        CASE
            WHEN (( SELECT count(*) AS count
               FROM tb_avn_event ke3
              WHERE ke3.event_id = vvg.event_type_id)) > 1 THEN ''::character varying
            ELSE ke2.event_nm
        END AS new_event_name
   FROM v_viewlist_gsr vvg
     LEFT JOIN tb_sys_code ip ON ip.code_id::text = vvg.check_kind_cd::text AND ip.code_grp_id::text = 'CODE_GRP_104'::text
     LEFT JOIN tb_sys_code ra ON ra.code_id::text = vvg.control_authority_cd::text AND ra.code_grp_id::text = 'CODE_GRP_047'::text
     LEFT JOIN tb_sys_code di ON di.code_id::text = vvg.reldept_cd::text AND di.code_grp_id::text = 'CODE_GRP_105'::text
     LEFT JOIN tb_sys_code rg ON rg.code_id::text = vvg.inspection_area_cd::text AND rg.code_grp_id::text = 'CODE_GRP_048'::text
     LEFT JOIN tb_sys_code ir ON ir.code_id::text = vvg.inspection_result_cd::text AND ir.code_grp_id::text = 'CODE_GRP_106'::text
     LEFT JOIN tb_avn_sm_reception_ke_event se ON se.reception_id = vvg.reception_id
     LEFT JOIN tb_avn_event ke2 ON ke2.event_id = se.event_id OR ke2.event_id = vvg.event_type_id;


-- public.v_viewlist_maintenance_csr source

CREATE OR REPLACE VIEW public.v_viewlist_maintenance_csr
AS SELECT vvc.id,
    vvc.report_type,
    vvc.reported_by,
    vvc.doc_no,
    vvc.subject,
    vvc.phase,
    vvc.state,
    vvc.submitted_at,
    vvc.departure_dt,
    vvc.timezone,
    vvc.flight_no,
    vvc.reg_no,
    vvc.aircraft_type_cd,
    vvc.fleet_code,
    vvc.departure_airport_cd,
    vvc.arrival_airport_cd,
    vvc.divert_airport_cd,
    vvc.supply_nm,
    vvc.checkin_nm,
    vvc.ata_adapter_type,
    vvc.ata_chapter_name_ko,
    vvc.ata_chapter_name_en,
    vvc.control_dept_type,
    vvc.control_dept_name_ko,
    vvc.control_dept_name_en,
    vvc.classification,
    vvc.classification_name_ko,
    vvc.classification_name_en,
    vvc.event_followup,
    vvc.event_summary,
    vvc.event_name_ko,
    vvc.event_name_en,
    vvc.receipted_at,
    vvc.occurrence_airport,
    vvc.event_category AS category_name_ko,
    vvc.maintenance_defect_kind_cd,
    mt.code_name_kor AS maintenance_type_name_ko,
    mt.code_name_eng AS maintenance_type_name_en,
    vvc.inflight_occur_location_cd,
    lo.code_name_kor AS location_name_ko,
    lo.code_name_eng AS location_name_en,
    vvc.smoke_detector_alarm_activate_cd,
    vvc.cabin_log_yn,
    vvc.report_closed_at,
    vvc.reported_by_user_name_ko,
    vvc.reported_by_user_name_en,
    vvc.receipted_by,
    vvc.receipted_by_user_name_ko,
    vvc.receipted_by_user_name_en,
    vvc.status_ko,
    vvc.status_en,
    vvc.phase_name_ko,
    vvc.phase_name_en,
    vvc.departure_loc_dttm,
    vvc.reason
   FROM v_viewlist_csr vvc
     LEFT JOIN tb_sys_code mt ON mt.code_id::text = vvc.maintenance_defect_kind_cd::text AND mt.code_grp_id::text = 'CODE_GRP_031'::text
     LEFT JOIN tb_sys_code lo ON lo.code_id::text = vvc.inflight_occur_location_cd::text AND lo.code_grp_id::text = 'CODE_GRP_022'::text;


-- public.v_viewlist_msr source

CREATE OR REPLACE VIEW public.v_viewlist_msr
AS SELECT DISTINCT vs.id,
    vs.report_type,
    vs.reported_by,
    vs.created_at,
    vs.doc_no,
    vs.subject,
    vs.phase,
    vs.state,
    vs.submitted_at,
    vs.departure_dt,
    vs.timezone,
    vs.flight_no,
    vs.reg_no,
    vs.aircraft_type_cd,
    vs.fleet_code,
    vs.departure_airport_cd,
    vs.arrival_airport_cd,
    vs.divert_airport_cd,
    vs.supply_nm,
    vs.checkin_nm,
    vs.ata_adapter_type,
    vs.ata_chapter_name_ko,
    vs.ata_chapter_name_en,
    vs.control_dept_type,
    vs.control_dept_name_ko,
    vs.control_dept_name_en,
    vs.classification,
    vs.classification_name_ko,
    vs.classification_name_en,
    vs.event_id AS event_type_id,
    vs.event_name_en,
    vs.event_summary,
    vs.event_followup,
    vs.receipted_at,
    vs.occur_place_nm,
    vs.occur_airport_cd AS occurrence_airport,
    ev.report_dtl_type_cd AS certification,
    vs.closed_at AS report_closed_at,
    vs.reported_by_user_name_ko,
    vs.reported_by_user_name_en,
    vs.receipted_by,
    vs.receipted_by_user_name_ko,
    vs.receipted_by_user_name_en,
    vs.status_ko,
    vs.status_en,
    vs.phase_name_ko,
    vs.phase_name_en,
    vs.departure_loc_dttm,
    vs.reason,
    ev.report_id,
        CASE
            WHEN (( SELECT count(*) AS count
               FROM tb_avn_event ke3
              WHERE ke3.event_id = vs.event_id)) > 1 THEN ''::character varying
            ELSE ke2.event_nm
        END AS new_event_name
   FROM v_report_search_receipted_or_voided vs
     JOIN tb_avn_report_msr ev ON ev.report_id = vs.report_id
     LEFT JOIN tb_avn_sm_reception_ke_event se ON se.reception_id = vs.reception_id
     LEFT JOIN tb_avn_event ke2 ON ke2.event_id = se.event_id OR ke2.event_id = vs.event_id;


-- public.v_viewlist_others_csr source

CREATE OR REPLACE VIEW public.v_viewlist_others_csr
AS SELECT vvc.id,
    vvc.report_type,
    vvc.reported_by,
    vvc.doc_no,
    vvc.subject,
    vvc.phase,
    vvc.state,
    vvc.submitted_at,
    vvc.departure_dt,
    vvc.timezone,
    vvc.flight_no,
    vvc.reg_no,
    vvc.aircraft_type_cd,
    vvc.fleet_code,
    vvc.departure_airport_cd,
    vvc.arrival_airport_cd,
    vvc.divert_airport_cd,
    vvc.supply_nm,
    vvc.checkin_nm,
    vvc.ata_adapter_type,
    vvc.ata_chapter_name_ko,
    vvc.ata_chapter_name_en,
    vvc.control_dept_type,
    vvc.control_dept_name_ko,
    vvc.control_dept_name_en,
    vvc.classification,
    vvc.classification_name_ko,
    vvc.classification_name_en,
    vvc.event_followup,
    vvc.event_summary,
    vvc.event_name_ko,
    vvc.event_name_en,
    vvc.receipted_at,
    vvc.occurrence_airport,
    vvc.event_category AS category_name_ko,
    vvc.report_type AS csr_report_type,
    rt.code_name_kor AS report_type_name_ko,
    rt.code_name_eng AS report_type_name_en,
    vvc.etc_briefing_item_cd,
    vvc.smoke_detector_alarm_activate_cd,
    vvc.cabin_log_yn,
    vvc.pax_cls_cd,
    pc.code_name_kor AS pax_class_name_ko,
    pc.code_name_eng AS pax_class_name_en,
    vvc.inflight_occur_location_cd,
    lo.code_name_kor AS location_name_ko,
    lo.code_name_eng AS location_name_en,
    vvc.etc_cause_cd,
    cu.code_name_kor AS cause_name_ko,
    cu.code_name_eng AS cause_name_en,
    ( SELECT string_agg(ct.code_name_kor::text, chr(10)) AS final_action_names_ko
           FROM ( SELECT unnest(string_to_array(vvc.use_emergency_equip_cdarr::text, ','::text)) AS cdarr) arr
             LEFT JOIN tb_sys_code ct ON ct.code_id::text = arr.cdarr AND ct.code_grp_id::text = 'CODE_GRP_038'::text) AS equip_used_names_ko,
    ( SELECT string_agg(ct.code_name_eng::text, chr(10)) AS final_action_names_en
           FROM ( SELECT unnest(string_to_array(vvc.use_emergency_equip_cdarr::text, ','::text)) AS cdarr) arr
             LEFT JOIN tb_sys_code ct ON ct.code_id::text = arr.cdarr AND ct.code_grp_id::text = 'CODE_GRP_038'::text) AS equip_used_names_en,
    ri.code_name_kor AS report_item_name_ko,
    ri.code_name_eng AS report_item_name_en,
    vvc.report_closed_at,
    vvc.reported_by_user_name_ko,
    vvc.reported_by_user_name_en,
    vvc.receipted_by,
    vvc.receipted_by_user_name_ko,
    vvc.receipted_by_user_name_en,
    vvc.status_ko,
    vvc.status_en,
    vvc.phase_name_ko,
    vvc.phase_name_en,
    vvc.departure_loc_dttm,
    vvc.reason
   FROM v_viewlist_csr vvc
     LEFT JOIN tb_sys_code rt ON rt.code_id::text = vvc.etc_briefing_kind_cd::text AND rt.code_grp_id::text = 'CODE_GRP_032'::text
     LEFT JOIN tb_sys_code pc ON pc.code_id::text = vvc.pax_cls_cd::text AND pc.code_grp_id::text = 'CODE_GRP_103'::text
     LEFT JOIN tb_sys_code lo ON lo.code_id::text = vvc.inflight_occur_location_cd::text AND lo.code_grp_id::text = 'CODE_GRP_022'::text
     LEFT JOIN tb_sys_code cu ON cu.code_id::text = vvc.etc_cause_cd::text AND cu.code_grp_id::text = 'CODE_GRP_037'::text
     LEFT JOIN ( SELECT tb_sys_code.code_grp_id,
            tb_sys_code.code_id,
            tb_sys_code.code_name_kor,
            tb_sys_code.code_name_eng,
            tb_sys_code.sort_order,
            tb_sys_code.use_yn
           FROM tb_sys_code
          WHERE tb_sys_code.code_grp_id::text = 'CODE_GRP_033'::text
        UNION ALL
         SELECT tb_sys_code.code_grp_id,
            tb_sys_code.code_id,
            tb_sys_code.code_name_kor,
            tb_sys_code.code_name_eng,
            tb_sys_code.sort_order,
            tb_sys_code.use_yn
           FROM tb_sys_code
          WHERE tb_sys_code.code_grp_id::text = 'CODE_GRP_034'::text) ri ON ri.code_id::text = vvc.etc_briefing_item_cd::text;


-- public.v_viewlist_pax_deplane_csr source

CREATE OR REPLACE VIEW public.v_viewlist_pax_deplane_csr
AS SELECT vvc.id,
    vvc.report_type,
    vvc.reported_by,
    vvc.doc_no,
    vvc.subject,
    vvc.phase,
    vvc.state,
    vvc.submitted_at,
    vvc.departure_dt,
    vvc.timezone,
    vvc.flight_no,
    vvc.reg_no,
    vvc.aircraft_type_cd,
    vvc.fleet_code,
    vvc.departure_airport_cd,
    vvc.arrival_airport_cd,
    vvc.divert_airport_cd,
    vvc.supply_nm,
    vvc.checkin_nm,
    vvc.ata_adapter_type,
    vvc.ata_chapter_name_ko,
    vvc.ata_chapter_name_en,
    vvc.control_dept_type,
    vvc.control_dept_name_ko,
    vvc.control_dept_name_en,
    vvc.classification,
    vvc.classification_name_ko,
    vvc.classification_name_en,
    vvc.event_name_ko,
    vvc.event_name_en,
    vvc.event_followup,
    vvc.event_summary,
    vvc.receipted_at,
    vvc.occurrence_airport,
    vvc.voluntary_deplane_yn,
    vvc.deplane_cause_cd,
    cs.code_name_kor AS cause_name_ko,
    cs.code_name_eng AS cause_name_en,
    vvc.accompanied_pax_yn,
    vvc.report_closed_at,
    vvc.reported_by_user_name_ko,
    vvc.reported_by_user_name_en,
    vvc.receipted_by,
    vvc.receipted_by_user_name_ko,
    vvc.receipted_by_user_name_en,
    vvc.status_ko,
    vvc.status_en,
    vvc.phase_name_ko,
    vvc.phase_name_en,
    vvc.departure_loc_dttm,
    vvc.reason
   FROM v_viewlist_csr vvc
     LEFT JOIN tb_sys_code cs ON cs.code_id::text = vvc.deplane_cause_cd::text AND cs.code_grp_id::text = 'CODE_GRP_013'::text;


-- public.v_viewlist_pax_gsr source

CREATE OR REPLACE VIEW public.v_viewlist_pax_gsr
AS SELECT vvg.id,
    vvg.report_type,
    vvg.reported_by,
    vvg.created_at,
    vvg.doc_no,
    vvg.subject,
    vvg.phase,
    vvg.state,
    vvg.submitted_at,
    vvg.departure_dt,
    vvg.flight_no,
    vvg.reg_no,
    vvg.aircraft_type_cd,
    vvg.fleet_code,
    vvg.departure_airport_cd,
    vvg.arrival_airport_cd,
    vvg.divert_airport_cd,
    vvg.supply_nm,
    vvg.checkin_nm,
    vvg.ata_adapter_type,
    vvg.ata_chapter_name_ko,
    vvg.ata_chapter_name_en,
    vvg.control_dept_type,
    vvg.control_dept_name_ko,
    vvg.control_dept_name_en,
    vvg.classification,
    vvg.classification_name_ko,
    vvg.classification_name_en,
    vvg.event_type_id,
    vvg.event_name_en,
    vvg.event_summary,
    vvg.event_followup,
    vvg.timezone,
    vvg.receipted_at,
    vvg.occurrence_airport,
    vvg.event_category,
    vvg.occur_place_nm,
    vvg.occur_dttm,
    vvg.irre_type_cd,
    ir.code_name_kor AS irr_type_name_ko,
    ir.code_name_eng AS irr_type_name_en,
    vvg.occur_timezone_cd,
    vvg.report_closed_at,
    vvg.reported_by_user_name_ko,
    vvg.reported_by_user_name_en,
    vvg.receipted_by,
    vvg.receipted_by_user_name_ko,
    vvg.receipted_by_user_name_en,
    vvg.status_ko,
    vvg.status_en,
    vvg.phase_name_ko,
    vvg.phase_name_en,
    vvg.departure_loc_dttm,
    vvg.reason,
        CASE
            WHEN (( SELECT count(*) AS count
               FROM tb_avn_event ke3
              WHERE ke3.event_id = vvg.event_type_id)) > 1 THEN ''::character varying
            ELSE ke2.event_nm
        END AS new_event_name
   FROM v_viewlist_gsr vvg
     LEFT JOIN tb_sys_code ir ON ir.code_id::text = vvg.irre_type_cd::text AND ir.code_grp_id::text = 'CODE_GRP_049'::text
     LEFT JOIN tb_avn_sm_reception_ke_event se ON se.reception_id = vvg.reception_id
     LEFT JOIN tb_avn_event ke2 ON ke2.event_id = se.event_id OR ke2.event_id = vvg.event_type_id;


-- public.v_viewlist_pax_injury_csr source

CREATE OR REPLACE VIEW public.v_viewlist_pax_injury_csr
AS SELECT vvc.id,
    vvc.report_type,
    vvc.reported_by,
    vvc.doc_no,
    vvc.subject,
    vvc.phase,
    vvc.state,
    vvc.submitted_at,
    vvc.departure_dt,
    vvc.timezone,
    vvc.flight_no,
    vvc.reg_no,
    vvc.aircraft_type_cd,
    vvc.fleet_code,
    vvc.departure_airport_cd,
    vvc.arrival_airport_cd,
    vvc.divert_airport_cd,
    vvc.supply_nm,
    vvc.checkin_nm,
    vvc.ata_adapter_type,
    vvc.ata_chapter_name_ko,
    vvc.ata_chapter_name_en,
    vvc.control_dept_type,
    vvc.control_dept_name_ko,
    vvc.control_dept_name_en,
    vvc.classification,
    vvc.classification_name_ko,
    vvc.classification_name_en,
    vvc.event_followup,
    vvc.event_summary,
    vvc.event_name_ko,
    vvc.event_name_en,
    vvc.receipted_at,
    vvc.occurrence_airport,
    vvc.event_category AS category_name_ko,
    vvc.occur_dttm,
    ot.code_name_kor AS time_of_occurrence_name_ko,
    ot.code_name_eng AS time_of_occurrence_name_en,
    vvc.inflight_occur_location_cd,
    lo.code_name_kor AS location_name_ko,
    lo.code_name_eng AS location_name_en,
    vvc.main_cause_cd,
    mc.code_name_kor AS main_cause_name_ko,
    mc.code_name_eng AS main_cause_name_en,
    vvc.injury_part_cdarr,
    ( SELECT string_agg(ct.code_name_kor::text, chr(10)) AS injury_part_name_ko
           FROM ( SELECT unnest(string_to_array(vvc.injury_part_cdarr::text, ','::text)) AS cdarr) arr
             LEFT JOIN tb_sys_code ct ON ct.code_id::text = arr.cdarr AND ct.code_grp_id::text = 'CODE_GRP_024'::text) AS injury_part_name_ko,
    ( SELECT string_agg(ct.code_name_eng::text, chr(10)) AS injury_part_name_en
           FROM ( SELECT unnest(string_to_array(vvc.injury_part_cdarr::text, ','::text)) AS cdarr) arr
             LEFT JOIN tb_sys_code ct ON ct.code_id::text = arr.cdarr AND ct.code_grp_id::text = 'CODE_GRP_024'::text) AS injury_part_name_en,
    vvc.seatbelt_view_yn,
    ( SELECT string_agg(ct.code_name_kor::text, chr(10)) AS final_action_names_ko
           FROM ( SELECT unnest(string_to_array(vvc.car_cdarr::text, ','::text)) AS cdarr) arr
             LEFT JOIN tb_sys_code ct ON ct.code_id::text = arr.cdarr AND ct.code_grp_id::text = 'CODE_GRP_025'::text) AS final_action_names_ko,
    ( SELECT string_agg(ct.code_name_eng::text, chr(10)) AS final_action_names_en
           FROM ( SELECT unnest(string_to_array(vvc.car_cdarr::text, ','::text)) AS cdarr) arr
             LEFT JOIN tb_sys_code ct ON ct.code_id::text = arr.cdarr AND ct.code_grp_id::text = 'CODE_GRP_025'::text) AS final_action_names_en,
    ( SELECT string_agg(ct.code_name_kor::text, chr(10)) AS medical_equip_names_ko
           FROM ( SELECT unnest(string_to_array(vvc.use_medical_equip_cdarr::text, ','::text)) AS cdarr) arr
             LEFT JOIN tb_sys_code ct ON ct.code_id::text = arr.cdarr AND ct.code_grp_id::text = 'CODE_GRP_016'::text) AS medical_equip_names_ko,
    ( SELECT string_agg(ct.code_name_eng::text, chr(10)) AS medical_equip_names_en
           FROM ( SELECT unnest(string_to_array(vvc.use_medical_equip_cdarr::text, ','::text)) AS cdarr) arr
             LEFT JOIN tb_sys_code ct ON ct.code_id::text = arr.cdarr AND ct.code_grp_id::text = 'CODE_GRP_016'::text) AS medical_equip_names_en,
    vvc.report_closed_at,
    vvc.reported_by_user_name_ko,
    vvc.reported_by_user_name_en,
    vvc.receipted_by,
    vvc.receipted_by_user_name_ko,
    vvc.receipted_by_user_name_en,
    vvc.status_ko,
    vvc.status_en,
    vvc.phase_name_ko,
    vvc.phase_name_en,
    vvc.departure_loc_dttm,
    vvc.reason
   FROM v_viewlist_csr vvc
     LEFT JOIN tb_sys_code ot ON ot.code_id::text = vvc.occur_time_cd::text AND ot.code_grp_id::text = 'CODE_GRP_021'::text
     LEFT JOIN tb_sys_code lo ON lo.code_id::text = vvc.inflight_occur_location_cd::text AND lo.code_grp_id::text = 'CODE_GRP_022'::text
     LEFT JOIN tb_sys_code mc ON mc.code_id::text = vvc.main_cause_cd::text AND mc.code_grp_id::text = 'CODE_GRP_027'::text;


-- public.v_viewlist_pax_patient_csr source

CREATE OR REPLACE VIEW public.v_viewlist_pax_patient_csr
AS SELECT vvc.id,
    vvc.report_type,
    vvc.reported_by,
    vvc.doc_no,
    vvc.subject,
    vvc.phase,
    vvc.state,
    vvc.submitted_at,
    vvc.departure_dt,
    vvc.timezone,
    vvc.flight_no,
    vvc.reg_no,
    vvc.aircraft_type_cd,
    vvc.fleet_code,
    vvc.departure_airport_cd,
    vvc.arrival_airport_cd,
    vvc.divert_airport_cd,
    vvc.supply_nm,
    vvc.checkin_nm,
    vvc.ata_adapter_type,
    vvc.ata_chapter_name_ko,
    vvc.ata_chapter_name_en,
    vvc.control_dept_type,
    vvc.control_dept_name_ko,
    vvc.control_dept_name_en,
    vvc.classification,
    vvc.classification_name_ko,
    vvc.classification_name_en,
    vvc.event_name_ko,
    vvc.event_name_en,
    vvc.event_followup,
    vvc.event_summary,
    vvc.receipted_at,
    vvc.occurrence_airport,
    vvc.patient_type_cd,
    cs.code_name_kor AS patient_type_name_ko,
    cs.code_name_eng AS patient_type_name_en,
    vvc.occur_time_cd,
    ot.code_name_kor AS time_of_occurrence_name_ko,
    ot.code_name_eng AS time_of_occurrence_name_en,
    vvc.main_symptom_cd,
    ms.code_name_kor AS main_sympthom_name_ko,
    ms.code_name_eng AS main_sympthom_name_en,
    vvc.doctor_treatment_cd,
    dt.code_name_kor AS doctor_treatment_name_ko,
    dt.code_name_eng AS doctor_treatment_name_en,
    vvc.document_cd,
    dc.code_name_kor AS document_name_ko,
    dc.code_name_eng AS document_name_en,
    ( SELECT string_agg(ct.code_name_kor::text, chr(10)) AS final_action_names_ko
           FROM ( SELECT unnest(string_to_array(vvc.car_cdarr::text, ','::text)) AS cdarr) arr
             LEFT JOIN tb_sys_code ct ON ct.code_id::text = arr.cdarr AND ct.code_grp_id::text = 'CODE_GRP_019'::text) AS final_action_names_ko,
    ( SELECT string_agg(ct.code_name_eng::text, chr(10)) AS final_action_names_en
           FROM ( SELECT unnest(string_to_array(vvc.car_cdarr::text, ','::text)) AS cdarr) arr
             LEFT JOIN tb_sys_code ct ON ct.code_id::text = arr.cdarr AND ct.code_grp_id::text = 'CODE_GRP_019'::text) AS final_action_names_en,
    ( SELECT string_agg(ct.code_name_kor::text, chr(10)) AS additional_action_names_ko
           FROM ( SELECT unnest(string_to_array(vvc.add_car_cdarr::text, ','::text)) AS cdarr) arr
             LEFT JOIN tb_sys_code ct ON ct.code_id::text = arr.cdarr AND ct.code_grp_id::text = 'CODE_GRP_020'::text) AS additional_action_names_ko,
    ( SELECT string_agg(ct.code_name_eng::text, chr(10)) AS additional_action_names_en
           FROM ( SELECT unnest(string_to_array(vvc.add_car_cdarr::text, ','::text)) AS cdarr) arr
             LEFT JOIN tb_sys_code ct ON ct.code_id::text = arr.cdarr AND ct.code_grp_id::text = 'CODE_GRP_020'::text) AS additional_action_names_en,
    ( SELECT string_agg(ct.code_name_kor::text, chr(10)) AS medical_equip_names_ko
           FROM ( SELECT unnest(string_to_array(vvc.use_medical_equip_cdarr::text, ','::text)) AS cdarr) arr
             LEFT JOIN tb_sys_code ct ON ct.code_id::text = arr.cdarr AND ct.code_grp_id::text = 'CODE_GRP_016'::text) AS medical_equip_names_ko,
    ( SELECT string_agg(ct.code_name_eng::text, chr(10)) AS medical_equip_names_en
           FROM ( SELECT unnest(string_to_array(vvc.use_medical_equip_cdarr::text, ','::text)) AS cdarr) arr
             LEFT JOIN tb_sys_code ct ON ct.code_id::text = arr.cdarr AND ct.code_grp_id::text = 'CODE_GRP_016'::text) AS medical_equip_names_en,
    vvc.report_closed_at,
    vvc.reported_by_user_name_ko,
    vvc.reported_by_user_name_en,
    vvc.receipted_by,
    vvc.receipted_by_user_name_ko,
    vvc.receipted_by_user_name_en,
    vvc.status_ko,
    vvc.status_en,
    vvc.phase_name_ko,
    vvc.phase_name_en,
    vvc.departure_loc_dttm,
    vvc.reason
   FROM v_viewlist_csr vvc
     LEFT JOIN tb_sys_code cs ON cs.code_id::text = vvc.patient_type_cd::text AND cs.code_grp_id::text = 'CODE_GRP_099'::text
     LEFT JOIN tb_sys_code ot ON ot.code_id::text = vvc.occur_time_cd::text AND ot.code_grp_id::text = 'CODE_GRP_021'::text
     LEFT JOIN tb_sys_code ms ON ms.code_id::text = vvc.main_symptom_cd::text AND ms.code_grp_id::text = 'CODE_GRP_015'::text
     LEFT JOIN tb_sys_code dt ON dt.code_id::text = vvc.doctor_treatment_cd::text AND dt.code_grp_id::text = 'CODE_GRP_017'::text
     LEFT JOIN tb_sys_code dc ON dc.code_id::text = vvc.document_cd::text AND dc.code_grp_id::text = 'CODE_GRP_018'::text;


-- public.v_viewlist_rsr source

CREATE OR REPLACE VIEW public.v_viewlist_rsr
AS SELECT vs.id,
    vs.doc_no,
    vs.report_type,
    vs.reported_by,
    vs.reported_by_user_name_ko,
    vs.reported_by_user_name_en,
    vs.subject,
    vs.time_zone,
    vs.phase,
    vs.state,
    vs.step_code,
    vs.created_at,
    vs.updated_at,
    vs.submitted_at,
    vrdv.phase_name_ko,
    vrdv.phase_name_en,
    vrdv.status_ko,
    vrdv.status_en,
    vs.assessment_notes,
    vs.flight_id,
    vs.departure_at,
    vs.flight_no,
    vs.reg_no,
    vs.aircraft_type,
    vs.from_airport,
    vs.to_airport,
    vs.divert_airport,
    vs.std_time,
    vs.sta_time,
    vs.atd_time,
    vs.ata_time,
    vs.delay_hour,
    vs.supply,
    vs.check_in,
    vs.fleet_id,
    vs.fleet_code,
    ev.rsr_type_cd,
    vs.occur_airport_cd AS occurrence_airport,
    vs.occur_timezone_cd AS event_timezone,
    ev.stn_cd,
    ev.place_nm,
    ev.work_phase_cd,
    ev.main_cls_cd,
    ev.issuer_cd,
    vs.occur_timezone_cd,
    ev.gse_cd,
    ev.gse_reg_no_nm,
    ev.aircraft_cd AS relevant_aircraft,
    rt.code_name_kor AS rsr_report_type_ko,
    rt.code_name_eng AS rsr_report_type_en,
    st.code_name_kor AS station_name_ko,
    st.code_name_eng AS station_name_en,
    wf.code_name_kor AS working_phase_name_ko,
    wf.code_name_eng AS working_phase_name_en,
    mc.code_name_kor AS major_class_name_ko,
    mc.code_name_eng AS major_class_name_en,
    ss.code_name_kor AS issuer_name_ko,
    ss.code_name_eng AS issuer_name_en,
    ai.code_name_kor AS relavant_aircraft_type_name_ko,
    ai.code_name_eng AS relavant_aircraft_type_name_en,
    gs.code_name_kor AS gse_name_ko,
    gs.code_name_eng AS gse_name_en,
    ( SELECT string_agg(ct.code_name_kor::text, chr(10)) AS place_name_ko
           FROM ( SELECT unnest(string_to_array(ev.place_cdarr::text, ','::text)) AS cdarr) arr
             LEFT JOIN tb_sys_code ct ON ct.code_id::text = arr.cdarr AND ct.code_grp_id::text = 'CODE_GRP_157'::text) AS place_name_ko,
    ( SELECT string_agg(ct.code_name_eng::text, chr(10)) AS place_name_en
           FROM ( SELECT unnest(string_to_array(ev.place_cdarr::text, ','::text)) AS cdarr) arr
             LEFT JOIN tb_sys_code ct ON ct.code_id::text = arr.cdarr AND ct.code_grp_id::text = 'CODE_GRP_157'::text) AS place_name_en,
    ( SELECT string_agg(ct.occurrence_name_ko, chr(10)) AS place_name_ko
           FROM ( SELECT (((ct_1.code_field1::text || ' / '::text) || ct_1.code_field2::text) || ' / '::text) || ct_1.code_field3::text AS occurrence_name_ko
                   FROM ( SELECT unnest(string_to_array(ev.occur_type_cdarr::text, ','::text)) AS cdarr) arr
                     LEFT JOIN tb_sys_code ct_1 ON ct_1.code_id::text = arr.cdarr AND ct_1.code_grp_id::text = 'CODE_GRP_157'::text) ct) AS occurrence_name_ko,
    ( SELECT string_agg(ct.occurrence_name_ko, chr(10)) AS place_name_ko
           FROM ( SELECT (((ct_1.code_field1::text || ' / '::text) || ct_1.code_field2::text) || ' / '::text) || ct_1.code_field3::text AS occurrence_name_ko
                   FROM ( SELECT unnest(string_to_array(ev.occur_type_cdarr::text, ','::text)) AS cdarr) arr
                     LEFT JOIN tb_sys_code ct_1 ON ct_1.code_id::text = arr.cdarr AND ct_1.code_grp_id::text = 'CODE_GRP_157'::text) ct) AS occurrence_name_en,
    ev.company_cd,
    ev.rel_dept_cd,
    ev.team_dept_cd,
    ev.grp_cd,
    ev.involve_nm,
    vs.emp_no AS ca_assigned_by,
    ev.issue_dttm,
    ev.due_dttm,
    ev.penalty_type_cd,
    ev.penalty_cd,
    ev.penalty_score_nm,
    cp.code_name_kor AS company_name_ko,
    cp.code_name_eng AS company_name_en,
    rd.code_name_kor AS division_name_ko,
    rd.code_name_eng AS division_name_en,
    td.code_name_kor AS team_dept_name_ko,
    td.code_name_eng AS team_dept_name_en,
    gr.code_name_kor AS group_name_ko,
    gr.code_name_eng AS group_name_en,
    pe.category AS penalty_category,
    pe.violation AS penalty_violation,
    ev.received_dttm,
    ev.closed_dttm,
    ( SELECT string_agg(ct.code_name_kor::text, chr(10)) AS casual_names
           FROM ( SELECT unnest(string_to_array(ev.casual_factor_cdarr::text, ','::text)) AS cdarr) arr
             LEFT JOIN tb_sys_code ct ON ct.code_id::text = arr.cdarr AND ct.code_grp_id::text = 'CODE_GRP_059'::text) AS casual_names,
    ( SELECT string_agg(ct.code_name_kor::text, chr(10)) AS weather_name_ko
           FROM ( SELECT unnest(string_to_array(ev.weather_cdarr::text, ','::text)) AS cdarr) arr
             LEFT JOIN tb_sys_code ct ON ct.code_id::text = arr.cdarr AND ct.code_grp_id::text = 'CODE_GRP_043'::text) AS weather_name_ko,
    ( SELECT string_agg(ct.code_name_eng::text, chr(10)) AS weather_name_en
           FROM ( SELECT unnest(string_to_array(ev.weather_cdarr::text, ','::text)) AS cdarr) arr
             LEFT JOIN tb_sys_code ct ON ct.code_id::text = arr.cdarr AND ct.code_grp_id::text = 'CODE_GRP_043'::text) AS weather_name_en,
        CASE
            WHEN vs.state::text = 'closed'::text THEN vs.stepped_at
            ELSE NULL::timestamp without time zone
        END AS report_closed_at,
    vs.departure_loc_dttm,
    vs.reason
   FROM v_report_search_submitted vs
     JOIN tb_avn_report_rsr ev ON ev.report_id = vs.id
     LEFT JOIN ( SELECT tb_sys_code.code_id AS id,
            tb_sys_code.code_name_kor,
            tb_sys_code.code_name_eng
           FROM tb_sys_code
          WHERE tb_sys_code.code_grp_id::text = 'CODE_GRP_GSE'::text) gs ON gs.id::text = ev.gse_cd::text
     LEFT JOIN ( SELECT tb_sys_code.code_id AS id,
            tb_sys_code.code_name_kor,
            tb_sys_code.code_name_eng
           FROM tb_sys_code
          WHERE tb_sys_code.code_grp_id::text = 'CODE_GRP_TEAM'::text) td ON td.id::text = ev.team_dept_cd::text
     LEFT JOIN ( SELECT tb_sys_code.code_id AS id,
            tb_sys_code.code_name_kor,
            tb_sys_code.code_name_eng
           FROM tb_sys_code
          WHERE tb_sys_code.code_grp_id::text = 'CODE_GRP_GRP'::text) gr ON gr.id::text = ev.grp_cd::text
     LEFT JOIN tb_sys_code rt ON rt.code_id::text = ev.rsr_type_cd::text AND rt.code_grp_id::text = 'CODE_GRP_053'::text
     LEFT JOIN tb_sys_code wf ON wf.code_id::text = ev.work_phase_cd::text AND wf.code_grp_id::text = 'CODE_GRP_056'::text
     LEFT JOIN tb_sys_code st ON st.code_id::text = ev.stn_cd::text AND st.code_grp_id::text = 'CODE_GRP_054'::text
     LEFT JOIN tb_sys_code mc ON mc.code_id::text = ev.main_cls_cd::text AND mc.code_grp_id::text = 'CODE_GRP_057'::text
     LEFT JOIN tb_sys_code ss ON ss.code_id::text = ev.issuer_cd::text AND ss.code_grp_id::text = 'CODE_GRP_058'::text
     LEFT JOIN tb_sys_code ai ON ai.code_id::text = ev.aircraft_cd::text AND ai.code_grp_id::text = 'CODE_GRP_061'::text
     LEFT JOIN tb_sys_code cp ON cp.code_id::text = ev.company_cd::text AND cp.code_grp_id::text = 'CODE_GRP_062'::text
     LEFT JOIN tb_sys_code rd ON rd.code_id::text = ev.rel_dept_cd::text AND rd.code_grp_id::text = 'CODE_GRP_063'::text
     LEFT JOIN ( SELECT tb_sys_code.code_id,
            tb_sys_code.code_field1 AS category,
            tb_sys_code.code_name_kor AS violation
           FROM tb_sys_code
          WHERE tb_sys_code.code_grp_id::text = 'CODE_GRP_160'::text) pe ON pe.code_id::text = ev.penalty_cd::text
     LEFT JOIN v_report_display_viewlist vrdv ON vrdv.phase::text = vs.phase::text AND vs.step_code::text = vrdv.step_code::text;


-- public.v_viewlist_smoking_csr source

CREATE OR REPLACE VIEW public.v_viewlist_smoking_csr
AS SELECT vvc.id,
    vvc.report_type,
    vvc.reported_by,
    vvc.doc_no,
    vvc.subject,
    vvc.phase,
    vvc.state,
    vvc.submitted_at,
    vvc.departure_dt,
    vvc.timezone,
    vvc.flight_no,
    vvc.reg_no,
    vvc.aircraft_type_cd,
    vvc.fleet_code,
    vvc.departure_airport_cd,
    vvc.arrival_airport_cd,
    vvc.divert_airport_cd,
    vvc.supply_nm,
    vvc.checkin_nm,
    vvc.ata_adapter_type,
    vvc.ata_chapter_name_ko,
    vvc.ata_chapter_name_en,
    vvc.control_dept_type,
    vvc.control_dept_name_ko,
    vvc.control_dept_name_en,
    vvc.classification,
    vvc.classification_name_ko,
    vvc.classification_name_en,
    vvc.event_followup,
    vvc.event_summary,
    vvc.event_name_ko,
    vvc.event_name_en,
    vvc.receipted_at,
    vvc.occurrence_airport,
    vvc.event_category AS category_name_ko,
    vvc.pax_cls_cd,
    pc.code_name_kor AS pax_class_name_ko,
    pc.code_name_eng AS pax_class_name_en,
    vvc.ciga_kind_cdarr,
    ( SELECT string_agg(ct.code_name_kor::text, chr(10)) AS cigar_type_name_ko
           FROM ( SELECT unnest(string_to_array(vvc.ciga_kind_cdarr::text, ','::text)) AS cdarr) arr
             LEFT JOIN tb_sys_code ct ON ct.code_id::text = arr.cdarr AND ct.code_grp_id::text = 'CODE_GRP_100'::text) AS cigar_type_name_ko,
    ( SELECT string_agg(ct.code_name_eng::text, chr(10)) AS cigar_type_name_en
           FROM ( SELECT unnest(string_to_array(vvc.ciga_kind_cdarr::text, ','::text)) AS cdarr) arr
             LEFT JOIN tb_sys_code ct ON ct.code_id::text = arr.cdarr AND ct.code_grp_id::text = 'CODE_GRP_100'::text) AS cigar_type_name_en,
    vvc.evidence_seized_yn,
    vvc.police_called_yn,
    vvc.clue_cd,
    cc.code_name_kor AS cigar_clue_name_ko,
    cc.code_name_eng AS cigar_clue_name_en,
    vvc.smoke_detector_alarm_activate_cd,
    vvc.cabin_log_yn,
    vvc.inflight_occur_location_cd,
    lo.code_name_kor AS location_name_ko,
    lo.code_name_eng AS location_name_en,
    vvc.report_closed_at,
    vvc.reported_by_user_name_ko,
    vvc.reported_by_user_name_en,
    vvc.receipted_by,
    vvc.receipted_by_user_name_ko,
    vvc.receipted_by_user_name_en,
    vvc.status_ko,
    vvc.status_en,
    vvc.phase_name_ko,
    vvc.phase_name_en,
    vvc.departure_loc_dttm,
    vvc.reason
   FROM v_viewlist_csr vvc
     LEFT JOIN tb_sys_code pc ON pc.code_id::text = vvc.pax_cls_cd::text AND pc.code_grp_id::text = 'CODE_GRP_103'::text
     LEFT JOIN tb_sys_code cc ON cc.code_id::text = vvc.clue_cd::text AND cc.code_grp_id::text = 'CODE_GRP_101'::text
     LEFT JOIN tb_sys_code lo ON lo.code_id::text = vvc.inflight_occur_location_cd::text AND lo.code_grp_id::text = 'CODE_GRP_022'::text;


-- public.v_viewlist_unlawful_csr source

CREATE OR REPLACE VIEW public.v_viewlist_unlawful_csr
AS SELECT vvc.id,
    vvc.report_type,
    vvc.reported_by,
    vvc.doc_no,
    vvc.subject,
    vvc.phase,
    vvc.state,
    vvc.submitted_at,
    vvc.departure_dt,
    vvc.timezone,
    vvc.flight_no,
    vvc.reg_no,
    vvc.aircraft_type_cd,
    vvc.fleet_code,
    vvc.departure_airport_cd,
    vvc.arrival_airport_cd,
    vvc.divert_airport_cd,
    vvc.supply_nm,
    vvc.checkin_nm,
    vvc.ata_adapter_type,
    vvc.ata_chapter_name_ko,
    vvc.ata_chapter_name_en,
    vvc.control_dept_type,
    vvc.control_dept_name_ko,
    vvc.control_dept_name_en,
    vvc.classification,
    vvc.classification_name_ko,
    vvc.classification_name_en,
    vvc.event_followup,
    vvc.event_summary,
    vvc.event_name_ko,
    vvc.event_name_en,
    vvc.receipted_at,
    vvc.occurrence_airport,
    vvc.event_category AS category_name_ko,
    vvc.act_kind_cd,
    un.code_name_kor AS act_type_name_ko,
    un.code_name_eng AS act_type_name_en,
    vvc.pax_cls_cd,
    pc.code_name_kor AS pax_class_name_ko,
    pc.code_name_eng AS pax_class_name_en,
    vvc.occur_time_cd,
    ot.code_name_kor AS time_of_occurrence_name_ko,
    ot.code_name_eng AS time_of_occurrence_name_en,
    vvc.inflight_occur_location_cd,
    lo.code_name_kor AS location_name_ko,
    lo.code_name_eng AS location_name_en,
    ( SELECT string_agg(ct.code_name_kor::text, chr(10)) AS final_action_names_ko
           FROM ( SELECT unnest(string_to_array(vvc.car_cdarr::text, ','::text)) AS cdarr) arr
             LEFT JOIN tb_sys_code ct ON ct.code_id::text = arr.cdarr AND ct.code_grp_id::text = 'CODE_GRP_030'::text) AS final_action_names_ko,
    ( SELECT string_agg(ct.code_name_eng::text, chr(10)) AS final_action_names_en
           FROM ( SELECT unnest(string_to_array(vvc.car_cdarr::text, ','::text)) AS cdarr) arr
             LEFT JOIN tb_sys_code ct ON ct.code_id::text = arr.cdarr AND ct.code_grp_id::text = 'CODE_GRP_030'::text) AS final_action_names_en,
    vvc.report_closed_at,
    vvc.reported_by_user_name_ko,
    vvc.reported_by_user_name_en,
    vvc.receipted_by,
    vvc.receipted_by_user_name_ko,
    vvc.receipted_by_user_name_en,
    vvc.status_ko,
    vvc.status_en,
    vvc.phase_name_ko,
    vvc.phase_name_en,
    vvc.departure_loc_dttm,
    vvc.reason
   FROM v_viewlist_csr vvc
     LEFT JOIN tb_sys_code un ON un.code_id::text = vvc.act_kind_cd::text AND un.code_grp_id::text = 'CODE_GRP_029'::text
     LEFT JOIN tb_sys_code pc ON pc.code_id::text = vvc.pax_cls_cd::text AND pc.code_grp_id::text = 'CODE_GRP_103'::text
     LEFT JOIN tb_sys_code ot ON ot.code_id::text = vvc.occur_time_cd::text AND ot.code_grp_id::text = 'CODE_GRP_021'::text
     LEFT JOIN tb_sys_code lo ON lo.code_id::text = vvc.inflight_occur_location_cd::text AND lo.code_grp_id::text = 'CODE_GRP_022'::text;