-- DROP FUNCTION public.fn_1st_risk_last_state(int4);

CREATE OR REPLACE FUNCTION public.fn_1st_risk_last_state(group_id integer)
 RETURNS TABLE(group_id integer, step_list character varying, reason character varying)
 LANGUAGE sql
AS $function$
SELECT srh.group_id,
    array_to_string(array_agg(shal.step_code), ','::text) AS step_list,
    array_to_string(array_agg(shal.reason), ','::text) AS reason
   FROM public.tb_avn_sm_report_hazard srh
     JOIN LATERAL public.fn_1st_risk_last_step(srh.id) shal(log_id, hazard_id, state_type, phase, step_code, stepped_by, reason, timezone, stepped_at) ON shal.hazard_id = srh.id
  WHERE srh.deleted_at IS NULL
  and srh.group_id =$1
  GROUP BY srh.group_id;
$function$
;

-- DROP FUNCTION public.fn_1st_risk_last_step(int4);

CREATE OR REPLACE FUNCTION public.fn_1st_risk_last_step(p_hazard_id integer)
 RETURNS TABLE(log_id integer, hazard_id integer, state_type character varying, phase character varying, step_code character varying, stepped_by character varying, reason character varying, timezone character varying, stepped_at timestamp without time zone)
 LANGUAGE sql
AS $function$
-- report hazard approval 최종 상태
-- usage: SELECT * FROM fn_hazard_last_step(173);
SELECT
	al.id AS log_id,
	al.hazard_id,
	al.state_type,
	al.phase,
	al.step_code,
	al.emp_no AS stepped_by, -- 결재자
	al.reason,
	al.timezone,
	al.reg_dttm AS stepped_at -- 결재일자
FROM
	(
	SELECT
		public.tb_avn_sm_hazard_approval_log.*,
		RANK() OVER (PARTITION BY hazard_id
	ORDER BY
		id DESC)
	FROM
		public.tb_avn_sm_hazard_approval_log 
	where phase in ('1st_risk','acceptance')
		) al
WHERE
	RANK = 1
	AND al.hazard_id = $1  ;
$function$
;

-- DROP FUNCTION public.fn_codes(varchar);

CREATE OR REPLACE FUNCTION public.fn_codes(_group_id character varying)
 RETURNS TABLE(gr_id character varying, gr_name_ko character varying, gr_name_en character varying, co_id character varying, co_value character varying, co_name_ko character varying, co_name_en character varying, co_view_order integer, code_field1_value character varying)
 LANGUAGE sql
AS $function$
-- select * from ke.fn_codes(1);
select
  gr.code_grp_id as gr_id,
  gr.code_grp_name_kor as gr_name_ko,
  gr.code_grp_name_eng as gr_name_en,
  co.code_id as co_id,
  co.code_id as co_value,
  co.code_name_kor as co_name_ko,
  co.code_name_eng as co_name_en,
  co.sort_order as co_view_order,
  co.code_field1 as code_field1_value
from
  tb_sys_code co
join tb_sys_code_group gr on
  co.code_grp_id = gr.code_grp_id
where
  co.use_yn::text = 'Y'::text
  and gr.use_yn::text = 'Y'::text
  and gr.code_grp_id = $1
order by
  co.sort_order
 ;
$function$
;

-- DROP FUNCTION public.fn_get_dept_nm(varchar, int4, varchar);

CREATE OR REPLACE FUNCTION public.fn_get_dept_nm(in_dept_cd character varying, in_dept_level integer, in_ret_col character varying DEFAULT 'name_kor'::character varying)
 RETURNS character varying
 LANGUAGE plpgsql
AS $function$
/*
-- 부서코드 기준 ~ 1:본부, 2:부, 3:팀, 4:그룹, 5:반 (0:사장, -1:회장, -2:KAL(대한항공))
-- return: 부서정보
-- usage :  
    select fn_get_dept_nm ('PUSBBFD', 3, 'name_kor')
    select fn_get_dept_nm ('PUSBBFD', 3, 'dept_cd')
    select fn_get_dept_nm ('PUSBBFD', 3, 'dept_level')
*/
declare
    tmp_ret_str         varchar(1000) ;
--
    tmp_dept_cd         varchar(10) ;
    tmp_ret_col         varchar(250) ;
    tmp_upper_dept_cd   varchar(10) ;
    tmp_dept_level      int4 ;
--
    tmp_dept_cd1        varchar(10) ;
    tmp_name_kor1       varchar(250) ;
    tmp_upper_dept_cd1  varchar(10) ;
    tmp_dept_level1     int4 ;
--
    tmp_dept_cd2        varchar(10) ;
    tmp_name_kor2       varchar(250) ;
    tmp_upper_dept_cd2  varchar(10) ;
    tmp_dept_level2     int4 ;
--
    tmp_dept_cd_kal     varchar(100) := 'KAL' ;
begin
    tmp_dept_cd       = in_dept_cd ;
    tmp_dept_level    = in_dept_level ;
    tmp_ret_col       = in_ret_col ;
--
--    tmp_dept_cd       = 'PUSBBFD14' ;  -- 'PUSBBFD14', 'SELONP'
--    tmp_ret_col       = 'dept_level' ;
--    tmp_upper_dept_cd = '';
--    tmp_dept_level    = 2 ;
--
-- 
-- 부서의 dept_level 계산 
    with recursive __vw_dept_cte_down (
        dept_cd, name_kor, upper_dept_cd, depth
    ) 
    as (
      --start_query
      select  dept_cd, name_kor, upper_dept_cd, 1
      from    tb_sys_dept 
      where   1 = 1
      and     dept_cd = tmp_dept_cd_kal
      --
      --repeat_query
      union
      select  d.dept_cd, d.name_kor, d.upper_dept_cd, fd.depth + 1
      from    __vw_dept_cte_down fd
      inner join tb_sys_dept d 
      on      fd.dept_cd = d.upper_dept_cd
    )
    --view_query
    select  dept_cd, name_kor, upper_dept_cd, depth
    into    tmp_dept_cd1, tmp_name_kor1, tmp_upper_dept_cd1, tmp_dept_level1
    from    __vw_dept_cte_down 
    where   1 = 1
    and     dept_cd = tmp_dept_cd
    ;
--
--  raise notice '__vw_dept_cte_down dept_cd = %, name_kor = %, dept_level = % ', tmp_dept_cd1, tmp_name_kor1, tmp_dept_level1 ;
--
--
    with recursive __vw_dept_cte_up (
        dept_cd, name_kor, upper_dept_cd, depth
    ) 
    as (
      --start_query
      select  dept_cd, name_kor, upper_dept_cd, tmp_dept_level1 - 3
      from    tb_sys_dept 
      where   1 = 1
      and     dept_cd = tmp_dept_cd1
      --
      --repeat_query
      union
      select  d.dept_cd, d.name_kor, d.upper_dept_cd, fd.depth - 1
      from    __vw_dept_cte_up fd
      inner join tb_sys_dept d 
      on      fd.upper_dept_cd = d.dept_cd 
    )
    --view_query
    select  dept_cd, name_kor, upper_dept_cd, depth
    into    tmp_dept_cd2, tmp_name_kor2, tmp_upper_dept_cd2, tmp_dept_level2
    from    __vw_dept_cte_up 
    where   1 = 1
    and     depth = tmp_dept_level
    ;
--
-- choice of return item
    select 
        case 
            when tmp_ret_col = 'dept_cd'    then tmp_dept_cd2
            when tmp_ret_col = 'dept_level' then tmp_dept_level2::varchar
            else tmp_name_kor2
        end
    into tmp_ret_str ;  
--
--
--    raise notice '__vw_dept_cte_down dept_cd = %, name_kor = %, dept_level = %, ret_col = %, ret_str = % '
--        , tmp_dept_cd2, tmp_name_kor2, tmp_dept_level2, tmp_ret_col, tmp_ret_str ;
--
    return tmp_ret_str ;
  end;
$function$
;

-- DROP FUNCTION public.fn_get_dept_path(varchar, varchar, varchar);

CREATE OR REPLACE FUNCTION public.fn_get_dept_path(in_dept_cd character varying, in_delimiter character varying DEFAULT '> '::character varying, in_ret_col character varying DEFAULT 'name_kor'::character varying)
 RETURNS character varying
 LANGUAGE plpgsql
AS $function$
/*
-- function name : fn_get_dept_path (in_dept_cd, in_delimiter, in_ret_col)
-- comments : 부서경로를 가져온다.
--          : 부서코드 기준 ~ 1:본부, 2:부, 3:팀, 4:그룹, 5:반 (0:사장, -1:회장, -2:kal(대한항공))
-- return: 부서경로
-- usage :  
    select fn_get_dept_path ('PUSBBFD')
    select fn_get_dept_path ('SELONP',  '>> ', 'name_kor')
    select fn_get_dept_path ('PUSBBFD', '> ', 'dept_cd')
*/
declare
    tmp_ret_str             varchar(1000) ;
--
    tmp_dept_cd             varchar(10) ;
    tmp_delimiter           varchar = '> ' ;
    tmp_dept_level          int4 ;
    tmp_ret_col             varchar(250) = 'name_kor';
--
    tmp_dept_cd1            varchar(10) ;
    tmp_name_kor1           varchar(250) ;
    tmp_upper_dept_cd1      varchar(10) ;
    tmp_dept_level1         int4 ;
--tmp_delimiter
    tmp_path_dept_name_kor  varchar(1000) ;
    tmp_path_dept_cd        varchar(1000) ;
--
    tmp_dept_cd_kal         varchar(100) := 'KAL' ;
begin
    tmp_dept_cd             = in_dept_cd ;
    tmp_ret_col             = in_ret_col ;
    tmp_delimiter           = in_delimiter ;
--
--    tmp_dept_cd       = 'SELONP' ;  -- 'PUSBBFD14', 'SELONP'
--    tmp_ret_col       = 'dept_level' ;
--    tmp_dept_level    = 2 ;
--
-- 
-- 부서의 dept_level 계산 
    with recursive __vw_dept_cte_down (
        dept_cd, name_kor, upper_dept_cd, depth
    ) 
    as (
      --start_query
      select  dept_cd, name_kor, upper_dept_cd, 1
      from    tb_sys_dept 
      where   1 = 1
      and     dept_cd = tmp_dept_cd_kal
      --
      --repeat_query
      union
      select  d.dept_cd, d.name_kor, d.upper_dept_cd, fd.depth + 1
      from    __vw_dept_cte_down fd
      inner join tb_sys_dept d 
      on      fd.dept_cd = d.upper_dept_cd
    )
    --view_query
    select  dept_cd, name_kor, upper_dept_cd, depth
    into    tmp_dept_cd1, tmp_name_kor1, tmp_upper_dept_cd1, tmp_dept_level1
    from    __vw_dept_cte_down 
    where   1 = 1
    and     dept_cd = tmp_dept_cd
    ;
--
--    raise notice '__vw_dept_cte_down dept_cd = %, name_kor = %, dept_level = % ', tmp_dept_cd1, tmp_name_kor1, tmp_dept_level1 ;
--
--
    with recursive __vw_dept_cte_up (
        dept_cd, name_kor, upper_dept_cd, depth
    ) 
    as (
      --start_query
      select  dept_cd, name_kor, upper_dept_cd, tmp_dept_level1 - 3
      from    tb_sys_dept 
      where   1 = 1
      and     dept_cd = tmp_dept_cd1
      --
      --repeat_query
      union
      select  d.dept_cd, d.name_kor, d.upper_dept_cd, fd.depth - 1
      from    __vw_dept_cte_up fd
      inner join tb_sys_dept d 
      on      fd.upper_dept_cd = d.dept_cd 
    )
    --view_query
    select  array_to_string(array_agg(name_kor), tmp_delimiter) as path_dept_name_kor
          , array_to_string(array_agg(dept_cd),  tmp_delimiter) as path_dept_cd
    into  tmp_path_dept_name_kor, tmp_path_dept_cd
    from  (
        select  dept_cd, name_kor, upper_dept_cd, depth
        from    __vw_dept_cte_up 
        where   1 = 1
        and     depth >= 1
        order by depth
    ) s
    ;
--
-- choice of return item
    select 
        case 
            when tmp_ret_col = 'dept_cd'    then tmp_path_dept_cd
            else tmp_path_dept_name_kor
        end
    into tmp_ret_str ;  
--
--
--    raise notice '__vw_dept_cte_down dept_cd = %, name_kor = %, dept_level = %, ret_col = %, ret_str = % '
--        , tmp_dept_cd1, tmp_name_kor1, tmp_dept_level1, tmp_ret_col, tmp_ret_str ;
--
    return tmp_ret_str ;
end;
$function$
;

-- DROP FUNCTION public.fn_getcomcdnm(varchar, varchar);

CREATE OR REPLACE FUNCTION public.fn_getcomcdnm(v_code_grp_id character varying, v_grp_id character varying)
 RETURNS character varying
 LANGUAGE plpgsql
AS $function$
	declare
	result character varying;
	-- 공통 코드 명 RETURN 함수 생성
 	BEGIN
		SELECT 
				CODE_NAME_KOR INTO result   		
		  FROM TB_SYS_CODE
		 WHERE CODE_GRP_ID = V_CODE_GRP_ID	-- 상위 코드 ID
		   AND CODE_ID = V_GRP_ID				-- 코드 ID
		   AND USE_YN = 'Y';		
	RETURN result;
	END; 

	$function$
;

-- DROP FUNCTION public.fn_hazard_last_step(int4);

CREATE OR REPLACE FUNCTION public.fn_hazard_last_step(p_hazard_id integer)
 RETURNS TABLE(log_id integer, hazard_id integer, state character varying, phase character varying, step_code character varying, stepped_by character varying, reason character varying, timezone character varying, stepped_at timestamp without time zone)
 LANGUAGE sql
AS $function$
-- report hazard approval 최종 상태
-- usage: SELECT * FROM fn_hazard_last_step(173);
SELECT
	al.id AS log_id,
	al.hazard_id,
	al.state_type state,
	al.phase,
	al.step_code,
	al.emp_no AS stepped_by, -- 결재자
	al.reason,
	al.timezone,
	al.reg_dttm AS stepped_at -- 결재일자
FROM
	(
	SELECT
		public.tb_avn_sm_hazard_approval_log.*,
		RANK() OVER (PARTITION BY hazard_id
	ORDER BY
		id DESC)
	FROM
		public.tb_avn_sm_hazard_approval_log ) al
WHERE
	RANK = 1
	AND al.hazard_id = $1  
;
$function$
;

-- DROP FUNCTION public.fn_hazard_lv3_by_id(int4);

CREATE OR REPLACE FUNCTION public.fn_hazard_lv3_by_id(_hazard_lv3_id integer)
 RETURNS TABLE(k3_id integer, k3_text character varying, k3_notes character varying, k2_id integer, k2_text character varying, k2_notes character varying, k1_id integer, k1_text character varying, k1_notes character varying)
 LANGUAGE sql
AS $function$
SELECT 
      k3.hazard_lvthree_id AS lv3_id,
      k3.hazard_lvthree_nm AS lv3_text,
      k3.notes_cn AS lv3_notes,
      k2.hazard_lvtwo_id AS lv2_id,
      k2.hazard_lvtwo_nm AS lv2_text,
      k2.notes_cn AS lv2_notes,
      k1.hazard_lvone_id AS lv1_id,
      k1.hazard_lvone_nm AS lv1_text,
      k1.notes_cn AS lv1_notes
    FROM public.tb_avn_hazard_lv3 k3
    INNER JOIN public.tb_avn_hazard_lv2 k2 ON k2.hazard_lvtwo_id = k3.hazard_lvtwo_id
    INNER JOIN public.tb_avn_hazard_lv1 k1 ON k1.hazard_lvone_id = k2.hazard_lvone_id 
    WHERE k3.del_dttm IS NULL AND k3.use_yn = 'Y' 
      AND k2.del_dttm IS NULL AND k2.use_yn = 'Y'
      AND k1.del_dttm IS NULL AND k1.use_yn = 'Y'
      AND k3.hazard_lvthree_id = $1
    ORDER BY k3.view_sn asc
  ;
$function$
;

-- DROP FUNCTION public.fn_iv_report_last_step(int4);

CREATE OR REPLACE FUNCTION public.fn_iv_report_last_step(p_report_id integer)
 RETURNS TABLE(log_id integer, report_id integer, state character varying, phase character varying, step_code character varying, stepped_by character varying, reason character varying, timezone character varying, stepped_at timestamp without time zone)
 LANGUAGE sql
AS $function$
SELECT
		vl.id AS log_id
		,vl.report_id
		,vl.state_type
		,vl.phase
		,vl.step_code
		,vl.emp_no AS stepped_by -- 결재자
		,vl.reason
		,vl.timezone
		,vl.reg_dttm AS stepped_at -- 결재일자
	FROM
		(
		SELECT
			tb_avn_iv_report_approval_log.*,
			RANK() OVER (PARTITION BY tb_avn_iv_report_approval_log.report_id  ORDER BY id DESC) AS m_rank
		FROM
			tb_avn_iv_report_approval_log ) vl
	WHERE
		m_rank = 1
		AND vl.report_id = $1
$function$
;

-- DROP FUNCTION public.fn_report_last_step(int4);

CREATE OR REPLACE FUNCTION public.fn_report_last_step(p_report_id integer)
 RETURNS TABLE(log_id integer, group_id integer, state_type character varying, phase character varying, step_code character varying, stepped_by character varying, reason character varying, timezone character varying, stepped_at timestamp without time zone)
 LANGUAGE sql
AS $function$
-- report approval 최종 상태
-- usage: SELECT * FROM fn_report_last_step(173);
SELECT
	al.id AS log_id,
	al.group_id,
	al.state_type,
	al.phase,
	al.step_code,
	al.emp_no AS stepped_by, -- 결재자
	al.reason,
	al.timezone,
	al.reg_dttm AS stepped_at -- 결재일자
FROM
	(
	SELECT
		tb_avn_sm_approval_log.*,
		RANK() OVER (PARTITION BY group_id
	ORDER BY
		id DESC)
	FROM
		public.tb_avn_sm_approval_log ) al
WHERE
	RANK = 1
	AND al.group_id = $1   
;
$function$
;

-- DROP FUNCTION public.sms_report_docno(bpchar);

CREATE OR REPLACE FUNCTION public.sms_report_docno(report_prefix character)
 RETURNS SETOF character
 LANGUAGE plpgsql
AS $function$
BEGIN
  CASE 
    WHEN LENGTH(report_prefix) = 3 then
      RETURN QUERY EXECUTE 'SELECT CONCAT('''|| UPPER(report_prefix) ||''',''-'',LPAD(nextval(''tb_avn_report_'|| LOWER(report_prefix) ||'_seq'')::TEXT, 6, ''0''))::char(10)';
    WHEN LENGTH(report_prefix) = 4 then
      return QUERY EXECUTE 'SELECT CONCAT('''|| UPPER(report_prefix) ||''',''-'',LPAD(nextval(''tb_avn_report_'|| LOWER(report_prefix) ||'_seq'')::TEXT, 6, ''0''))::char(11)';
    ELSE    
      RAISE EXCEPTION 'Invalid Report Prefix length (Must 3 characters): [ % ]', report_prefix;
    END CASE; 
END
$function$
;

-- DROP FUNCTION public.sms_report_hazardno(int4);

CREATE OR REPLACE FUNCTION public.sms_report_hazardno(group_id integer)
 RETURNS character
 LANGUAGE sql
AS $function$
select
  sr.doc_no || '-' || (
  select
    count(*) + 1
  from
    public.tb_avn_sm_report_hazard srh
  where
    srh.group_id = sr.id
    and upper(srh.hazard_no) not like '%DRAFT%')
from
  public.v_report_group_list sr
where
  sr.id = group_id
$function$
;

-- DROP PROCEDURE public.sp_alter_fk(varchar, varchar, varchar);

CREATE OR REPLACE PROCEDURE public.sp_alter_fk(IN in_schema_name character varying, IN in_table_name character varying DEFAULT ''::character varying, IN in_action character varying DEFAULT ''::character varying)
 LANGUAGE plpgsql
AS $procedure$
/*
 FUNCTION NAME : SP_ALTER_FK
 DESCRIPTION   : TABLE의 FK를 ENABLE, DISABLE 처리를 수행
 USAGE :
   call SP_ALTER_FK (in_schema_name => 'PUBLIC', in_table_name => 'TB_AVN_SM_ASR_EVENT', in_action => 'DISABLE') ;
   call SP_ALTER_FK (in_schema_name => 'PUBLIC', in_table_name => 'TB_AVN_SM_ASR_EVENT', in_action => 'ENABLE') ;
-- 
-- FOREGIN KEY 생성, 삭제, 비활성화
  SELECT  A.TGRELID::REGCLASS AS TABLE_NAME, TGNAME, TGTYPE, TGCONSTRRELID::REGCLASS, A.TGRELID::REGCLASS AS RELNAME, A.*
  FROM    PG_TRIGGER A
  WHERE   1 = 1
  AND     TGISINTERNAL
  AND     TGRELID = 'PUBLIC.TB_AVN_SM_ASR_EVENT'::REGCLASS
  ;
-- ALTER TABLE TB_AVN_SM_ASR_EVENT ENABLE  TRIGGER "RI_CONSTRAINTTRIGGER_C_23648" ;
-- ALTER TABLE TB_AVN_SM_ASR_EVENT DISABLE TRIGGER "RI_CONSTRAINTTRIGGER_C_23648" ;
*/
declare
    str_work_id             varchar(100) := 'SP_ALTER_FK';
    str_work_name           varchar(100) := 'TABLE의 FK를 DISABLE, ENABLE 수행';
    tmp_table_name          varchar(100) ;
--
    rec                     record ;
    __exec_sql              text ;
--
    sql_rows                bigint := 0 ;
--    
    txt_sqlstate            text ; 
    txt_message             text ; 
    txt_pg_except           text ; 
    txt_pg_exception_detail text ; 
    txt_pg_exception_hint   text ; 
    txt_column_name         text ; 
--    
    start_timestamp         timestamp :=  clock_timestamp() ;
--
begin
-- START
--  set application_name = tmp_work_id ;
    execute format('set application_name = %L', str_work_id);
    raise notice e'\n% ####################################', to_char(clock_timestamp(),'yyyy-mm-dd hh24:mi:ss.ms') ;
    raise notice e'\n% ~ PROGRAM ...START..!!!, (%) % sec'
        , to_char(clock_timestamp(),'yyyy-mm-dd hh24:mi:ss.ms')::varchar, str_work_id 
        , to_char(extract(epoch from (clock_timestamp() - start_timestamp))::numeric,'FM990.00')::varchar
    ;
    tmp_table_name := lower(in_schema_name) || '.' || lower(in_table_name) ;
--
    for rec in 
        select  a.tgrelid::regclass as table_name, a.tgname, a.tgtype
        from    pg_trigger a
        where   1 = 1
        and     a.tgisinternal
        and    (a.tgrelid = tmp_table_name::regclass or a.tgconstrrelid = tmp_table_name::regclass)
    loop 
       begin
            __exec_sql := 'alter table ' || rec.table_name || ' ' || in_action || ' trigger "' || rec.tgname || '" ' ;
    
            raise notice e'% ~ SQL : %', to_char(clock_timestamp(),'yyyy-mm-dd hh24:mi:ss.ms'), __exec_sql ;
            execute format('%s', __exec_sql);
--
            get diagnostics sql_rows = row_count;
--          raise notice e'% ~ execute...END....!!!, % '
--              , to_char(clock_timestamp(),'yyyy-mm-dd hh24:mi:ss.ms')::varchar
--              , to_char(sql_rows,'FM999,999,990')::varchar
--          ;
        exception
            when others then
                get diagnostics sql_rows = row_count;
                get stacked diagnostics 
                    txt_sqlstate  = returned_sqlstate
                  , txt_message   = message_text
                  , txt_pg_except = pg_exception_context
                  , txt_pg_exception_detail = pg_exception_detail 
                ;
                raise notice e'returned_sqlstate: %,\nmessage_text: %,\npg_exception_context: %\ndetail: %'
                  , txt_sqlstate, txt_message, txt_pg_except, txt_pg_exception_detail ;        
                continue ;
        end ;
    end loop;
--
    str_work_id := 'SP_ALTER_FK ~ PROGRAM END';
    raise notice e'\n% ~ PROGRAM ...END....!!!, (%) % sec'
        , to_char(clock_timestamp(),'yyyy-mm-dd hh24:mi:ss.ms')::varchar, str_work_id 
        , to_char(extract(epoch from (clock_timestamp() - start_timestamp))::numeric,'FM990.00')::varchar
    ;
    raise notice e'\n% ####################################', to_char(clock_timestamp(),'yyyy-mm-dd hh24:mi:ss.ms') ;
end; 
$procedure$
;

-- DROP PROCEDURE public.sp_get_sql_fk(varchar, varchar, varchar);

CREATE OR REPLACE PROCEDURE public.sp_get_sql_fk(IN in_schema_name character varying, IN in_table_name character varying DEFAULT ''::character varying, IN in_work_type character varying DEFAULT ''::character varying)
 LANGUAGE plpgsql
AS $procedure$
/*
 FUNCTION NAME : sp_get_sql_fk
 DESCRIPTION   : TABLE의 FOREGIN KEY 정의내역 SQL 추출
  call sp_get_sql_fk (
    in_schema_name    => 'ksms'                       -- Schema name
  , in_table_name     => 'tb_au_audit_checklist'      -- Table Name
  , in_work_typ       ==> ''
 ) ;
--  perform pg_sleep(2) ;
    call sp_get_sql_fk ('ksms', '%', '') ;
 */
declare
    tmp_work_id             varchar(50)  := 'SP_CNV_MRG_TB_DUMMY_TEST2';
    tmp_work_name           varchar(100) := '항공산업-테스트변환#2';
    tmp_table_name          varchar(100) := 'dummy_test2';
    tmp_work_desc           varchar(100) := '대량 데이터 전환 예제 (TB_DUMMY_TEST, ARRAY_AGG..., UNNEST...)';
    tmp_log_seq             int8 ;
    tmp_work_ymd            varchar(08) ;
    rec                     record;
    __alter_add_fk_sql      text := '' ;
    __alter_drop_fk_sql     text := '' ;
begin
--
   raise notice e'\n% ~ % ;', to_char(clock_timestamp(),'yyyy-mm-dd hh24:mi:ss.ms'), 'txt_sql_str' ;
--
-- FK 정의내역 추출 (information_schema.table_constraints tc)
--
    for rec in 
        select  distinct tc.table_schema       as table_schema
              , tc.table_name         as child_table
              , ccu.constraint_name   as constraint_name
              , kcu.column_name       as child_column
              , ccu.table_name        as foreign_table
              , ccu.column_name       as foreign_column
        -- select *
        from    information_schema.table_constraints tc
        join    (
            select  kcu.table_schema, kcu.table_name, kcu.constraint_schema, kcu.constraint_name
                  , array_to_string(array_agg(kcu.column_name order by ordinal_position),', ') as column_name
            from    information_schema.key_column_usage kcu
            where   1 = 1
            group by
                    kcu.table_schema, kcu.table_name, kcu.constraint_schema, kcu.constraint_name
        ) kcu
        on      tc.constraint_name::text = kcu.constraint_name::text
        and     kcu.table_schema  = tc.table_schema
        --
        join    (
            select  ccu.table_schema, ccu.table_name, ccu.constraint_schema, ccu.constraint_name
                  , array_to_string(array_agg(ccu.column_name order by column_name),', ') as column_name
            from    information_schema.constraint_column_usage ccu
            where   1 = 1
            group by
                    ccu.table_schema, ccu.table_name, ccu.constraint_schema, ccu.constraint_name
        ) ccu
        on      ccu.constraint_name::text = tc.constraint_name::text
        and     ccu.constraint_schema  = tc.constraint_schema
        --
        where   1 = 1
        and     tc.constraint_type = upper('foreign key' )
        and     tc.table_schema = in_schema_name
        and     ccu.table_name like in_table_name 
--      and     tc.table_name in ('tb_au_audit_checklist','tb_ocu_code_test','tb_avn_iv_ca')
    loop
        begin
            __alter_add_fk_sql := __alter_add_fk_sql || chr(10) ||
                'alter table ' || rec.table_schema || '.' || rec.child_table || 
                ' add constraint ' ||  rec.constraint_name || ' foreign key (' || rec.child_column || ') ' || 
                ' references '|| rec.table_schema || '.' || rec.foreign_table || '(' || rec.foreign_column || ') ;';
              
            __alter_drop_fk_sql := __alter_drop_fk_sql || chr(10) ||
                'alter table ' || rec.table_schema || '.' || rec.child_table || 
                ' drop constraint ' ||  rec.constraint_name || ' ;';
        end ;
    end loop ;
--
    if (upper(coalesce(in_work_type,'BOTH')) in ('ADD','CREATE','BOTH','')) then
        raise notice e'%',__alter_add_fk_sql ;
    end if;
--
    if (upper(coalesce(in_work_type,'BOTH')) in ('DROP','BOTH','')) then
        raise notice e'%',__alter_drop_fk_sql ;
    end if;
--
end; 
$procedure$
;

-- DROP PROCEDURE public.sp_if_user();

CREATE OR REPLACE PROCEDURE public.sp_if_user()
 LANGUAGE plpgsql
AS $procedure$
/*****************************************************************************
 FUNCTION NAME : sp_if_user
 DESCRIPTION   : csv로 넘겨받은 if_ke_use테이블의 데이터를 tb_sys_user테이블로 마이그레이션
 USAGE :
   call sp_if_user ();
*****************************************************************************/
declare
    
begin
    
    raise notice e'마이그레이션 처리 시작 ########################';


	raise notice e'마이그레이션 처리 종료 ########################';

end; 
$procedure$
;

-- DROP PROCEDURE public.sp_mig_errorlog(varchar, varchar, varchar, varchar, varchar, varchar);

CREATE OR REPLACE PROCEDURE public.sp_mig_errorlog(IN in_work_ymd character varying, IN in_work_id character varying, IN in_table_name character varying, IN in_pk_value character varying, IN in_data_value character varying, IN in_error_message character varying)
 LANGUAGE plpgsql
AS $procedure$
declare
/*
 FUNCTION NAME : sp_mig_errorlog
 DESCRIPTION   : TB_MIG_WORKLOG 로그자료 생성 (select sf_mig_worklog(), dblink)
  call sp_mig_errorlog (
    in_work_ymd       => '20240625'
  , in_work_id        => 'CNV_MRG_TB_DUMMY_TEST#1'
  , in_table_name     => 'DUMMY_TEST3'
  , in_pk_value       => 'in_pk_value'
  , in_data_value     => 'in_data_value'
  , in_error_message  => 'in_error_message'
 ) ;
    call sp_mig_errorlog('20240625', 'TB_MIG_DUMMY_TEST2', 'DUMMY_TEST3', 'in_pk_value', 'in_data_value', 'in_error_message') ;
 
    select  col1 from dblink('dbname=postgres', $dl$ select  sf_mig_errorlog('20240625', 'TB_MIG_DUMMY_TEST2', 'DUMMY_TEST2', 'PK-100', 'DATA-100', 'ERROR-100') ;$dl$) as t1 (col1 varchar);
    select  col1 from dblink('dbname=postgres', $dl$ select  sf_mig_errorlog('20240625', 'TB_MIG_DUMMY_TEST2', 'DUMMY_TEST2', 'PK-100', 'DATA-100', 'ERROR-100') ;$dl$) as t1 (col1 varchar);
    select  sf_mig_errorlog('20240625', 'TB_MIG_DUMMY_TEST2', 'DUMMY_TEST2', 'PK-100', 'DATA-100', 'ERROR-100') ; 
    select  sf_mig_errorlog('20240625', 'TB_MIG_DUMMY_TEST2', 'DUMMY_TEST2', 'PK-100', 'DATA-100', 'ERROR-100') ; 
    
    select * from tb_mig_errorlog ;
    delete   from tb_mig_errorlog ;
  
    select * from tb_mig_worklog order by 1,2,3,4,5;
    delete   from tb_mig_worklog ;
*/
--
    txt_sqlstate            text ; 
    txt_message             text ; 
    txt_pg_except           text ; 
--
    txt_sql_str             text ;
    txt_sql_str2            text ;
    tmp_ret_str             text ;
    tmp_ret_int             int8 ;
--
    tmp_work_ymd            varchar(08);    -- 작업일자
    tmp_work_id             varchar(50);    -- 작업id
    tmp_table_name          varchar(50);    -- 타겟 table NAME
    tmp_log_seq             int8 := 0;      -- log seq
    tmp_error_seq           int8 := 0;      -- err seq
    tmp_pk_value            text;           -- key 값
    tmp_data_value          text;           -- data 값
    tmp_error_mesg          text;           -- error 메세지
--
    tmp_work_step           varchar(50);    -- 작업단계
--
begin
--
    tmp_work_step   := 'ERRORLOG-INI' ;
    if (trim(coalesce(in_work_id,'')) = '') then 
        raise exception e'%', '### in_work_name is null !!! ###' ;
    end if ;
--
-- 작업일자, 작업id, key값, data값, error 메세지
    tmp_work_ymd := substring(regexp_replace(coalesce(in_work_ymd
      , to_char(clock_timestamp(),'yyyymmdd')),'[^[:digit:]]','','g')||'00000000',1,8) ;
--
    tmp_work_id     := substring(coalesce(in_work_id,'work_id'),1,50); 
    tmp_table_name  := substring(coalesce(in_table_name,'table_name'),1,50);
    tmp_pk_value    := substring(coalesce(in_pk_value,''),1,1000);    -- key 값
    tmp_data_value  := substring(coalesce(in_data_value,''),1,4000);    -- data 값
    tmp_error_mesg  := substring(coalesce(in_error_message,''),1,1000);    -- error 메세지
--
-- 로그 일련번호
    tmp_work_step   := 'ERRORLOG-SEQ' ;
    select  coalesce(max(log_seq), 1) into tmp_log_seq
    from    tb_mig_worklog
    where   work_ymd = tmp_work_ymd
    and     work_id = tmp_work_id
    ;
--
-- 오류 일련번호
    select  coalesce(max(error_seq),0)+1 into tmp_error_seq
    from    tb_mig_errorlog
    where   work_ymd  = tmp_work_ymd
    and     work_id   = tmp_work_id
    and     log_seq   = tmp_log_seq
    ;
--
-- 전환 오류 로그 생성
    tmp_work_step   := 'ERRORLOG-INS' ;
    txt_sql_str     := format(
$log$
insert  into tb_mig_errorlog (
    work_ymd, work_id, table_name, log_seq, error_seq
  , pk_value, data_value, error_message, work_time
)
values (
    '%s', '%s', '%s', %s, %s, '%s', '%s', '%s', clock_timestamp()
);
$log$
      , tmp_work_ymd, tmp_work_id, tmp_table_name, tmp_log_seq, tmp_error_seq
      , tmp_pk_value, tmp_data_value, tmp_error_mesg
    );
--        
    raise notice e'\n% ~ % ;', to_char(clock_timestamp(),'yyyy-mm-dd hh24:mi:ss.ms'), txt_sql_str ;
--
-- call  sf_mig_errorlog using dblink () ;
    select  ret_str  into tmp_ret_str 
    from    dblink('dbname=postgres', trim(txt_sql_str)) as t1 (ret_str text);
--
--  raise notice e'% ~ ret_int = %', to_char(clock_timestamp(),'yyyy-mm-dd hh24:mi:ss.ms'), tmp_ret_int ;
exception
    when others then
        get stacked diagnostics 
            txt_sqlstate    = returned_sqlstate
          , txt_message     = message_text
          , txt_pg_except   = pg_exception_context;
        raise exception 
            e'\nsp_mig_errorlog ~ error !!! \nreturned_sqlstate: %,\nmessage_text: %,\npg_exception_context: %'
          , txt_sqlstate, txt_message, txt_pg_except; 
end ;
$procedure$
;

-- DROP PROCEDURE public.sp_mig_worklog(in varchar, in varchar, in varchar, in varchar, in varchar, in numeric, in numeric, in numeric, in numeric, in varchar, in varchar, in text, inout int8);

CREATE OR REPLACE PROCEDURE public.sp_mig_worklog(IN in_work_ymd character varying, IN in_work_id character varying, IN in_work_name character varying, IN in_table_name character varying DEFAULT ''::character varying, IN in_work_stat character varying DEFAULT 'S'::character varying, IN in_delete_cnt numeric DEFAULT 0, IN in_read_cnt numeric DEFAULT 0, IN in_write_cnt numeric DEFAULT 0, IN in_error_cnt numeric DEFAULT 0, IN in_start_time character varying DEFAULT ''::character varying, IN in_end_time character varying DEFAULT ''::character varying, IN in_proc_desc text DEFAULT ''::text, INOUT in_log_seq bigint DEFAULT 0)
 LANGUAGE plpgsql
AS $procedure$
declare
/*
 FUNCTION NAME : sp_mig_worklog
 DESCRIPTION   : TB_MIG_WORKLOG 로그자료 생성 (select sf_mig_worklog(), dblink)
  call sp_mig_worklog (
    in_work_ymd       => '20240625'
  , in_work_id        => 'CNV_MRG_TB_DUMMY_TEST#1'
  , in_work_name      => 'CNV_MRG_TB_DUMMY_TEST#1'
  , in_table_name     => 'DUMMY_TEST1'
  , in_work_stat      => 'S'                        -- 
  , in_delete_cnt     => 0
  , in_read_cnt       => 0
  , in_write_cnt      => 0
  , in_error_cnt      => 0
  , in_start_time     => ''
  , in_end_time       => ''
  , in_proc_desc      => ''
  , in_log_seq        => NULL       
 ) ;
--  perform pg_sleep(2) ;
    call sp_mig_worklog('20240625', 'TB_MIG_DUMMY_TEST2', 'TB_MIG_DUMMY_TEST2', 'DUMMY_TEST2', 'S', 100, 100, 100, 0,'20240625101000', '20240625100210', '테스트 LOG확인', 16) ;
 
  select col1 from dblink('dbname=postgres', $dl$ select sf_mig_worklog('20240625', 'TB_MIG_DUMMY_TEST2', '1', 'S', 100, 100, 100, 0, null, null, '테스트 LOG확인') $dl$) as t1 (col1 integer);
  select col1 from dblink('dbname=postgres', $dl$ select sf_mig_worklog('20240625', 'TB_MIG_DUMMY_TEST2', '1', 'S', 100, 100, 100, 0,'20240625100000', '20240625100210', '테스트 LOG확인') $dl$) as t1 (col1 integer);
  select sf_mig_worklog('20240625', 'TB_MIG_DUMMY_TEST2', '100', 'S', 100, 100, 100, 0, null, null, '테스트 LOG확인') 
  select sf_mig_worklog('20240625', 'TB_MIG_DUMMY_TEST2', '1', 'E', 100, 100, 100, 0, null, null, '테스트 LOG확인') 
  
  select * from tb_mig_worklog order by 1,2,3,4,5;
  delete from tb_mig_worklog ;
*/
--
    txt_sqlstate            text ; 
    txt_message             text ; 
    txt_pg_except           text ; 
--
    txt_sql_str             text ;
    txt_sql_str2            text ;
    tmp_ret_str             varchar(08) ;
    tmp_ret_int             int8 ;
--
    tmp_work_ymd            varchar(08) ;
    tmp_work_id             varchar(50) ;         -- 작업id
    tmp_work_name           varchar(100) ;        -- 작업명
    tmp_table_name          varchar(100) ;        -- TABLE NAME
    tmp_log_seq             bigint ;
    tmp_work_stat           varchar(10) ;         -- 작업상태
    tmp_start_time          varchar(30) ;         -- 시작시간
    tmp_end_time            varchar(30) ;         -- 종료시간
    tmp_exec_time           numeric := 0;         -- 실행시간
--
    tmp_work_step           varchar(50);    -- 작업단계
begin
--
-- 초기화 : 작업일자, 작업ID, 작업명, TABLE명, 시작시각, 종료시각, 작업상태, 실행시간
    tmp_work_ymd    := substring(regexp_replace(coalesce(in_work_ymd
      , to_char(clock_timestamp(),'yyyymmdd')),'[^[:digit:]]','','g')||'00000000',1,8) ;
    tmp_work_id     := coalesce(in_work_id,'') ;
    tmp_work_name   := coalesce(in_work_name,'') ;
    tmp_table_name  := coalesce(in_table_name,'') ;
--
    tmp_start_time  := substring(regexp_replace(coalesce(in_start_time
      , to_char(clock_timestamp(),'yyyymmddhh24missms')),'[^[:digit:]]','','g')||'00000000000000000',1,17) ;
    tmp_end_time    := substring(regexp_replace(coalesce(in_end_time
      , to_char(clock_timestamp(),'yyyymmddhh24missms')),'[^[:digit:]]','','g')||'00000000000000000',1,17) ;
    tmp_work_stat   := coalesce(in_work_stat,'S') ;
    tmp_exec_time   := extract(epoch from (
        to_timestamp(tmp_end_time,'yyyymmddhh24missms') - to_timestamp(tmp_start_time,'yyyymmddhh24missms'))) ;
--
-- S : START (NEW)
    if (coalesce(tmp_work_stat,'') = 'S') then
        select  coalesce(max(log_seq),0) + 1 into tmp_log_seq
        from    tb_mig_worklog l
        where   work_ymd    = coalesce(tmp_work_ymd, to_char(clock_timestamp(),'yyyymmdd'))
        and     work_id     = tmp_work_id
        ;
-- 'R:RUN','E:ERROR','C:COMPLETE'
    else
        select  log_seq into tmp_log_seq
        from    tb_mig_worklog l
        where   work_ymd    = coalesce(tmp_work_ymd, to_char(clock_timestamp(),'yyyymmdd'))
        and     work_id     = coalesce(tmp_work_id,'')
        and     log_seq     = coalesce(in_log_seq,0)
        ;
    end if;
--
--  txt_sql_str := merge into tb_mig_worklog using dblink
    txt_sql_str := format(
    $log$
        merge   into tb_mig_worklog a 
        using   (
            select  '%s'  as work_ymd
                  , '%s'  as work_id
                  , '%s'  as work_name
                  , '%s'  as table_name
                  , %s    as log_seq
                  , '%s'  as work_stat
                  , coalesce(%s,0) as delete_cnt
                  , coalesce(%s,0) as read_cnt
                  , coalesce(%s,0) as write_cnt
                  , coalesce(%s,0) as error_cnt
                  , to_timestamp('%s', 'yyyymmddhh24missms') as start_time
                  , to_timestamp('%s', 'yyyymmddhh24missms') as end_time
                  , %s    as exec_time
                  , '%s'  as work_desc
        ) b
        on      a.work_ymd = b.work_ymd
        and     a.work_id = b.work_id
        and     a.log_seq = b.log_seq
    --
        when not matched then
        insert  (
                work_ymd, work_id, work_name, table_name, log_seq, work_stat
              , delete_cnt, read_cnt, write_cnt, error_cnt
              , start_time, end_time, exec_time, work_desc
        )
        values (
                b.work_ymd, b.work_id, b.work_name, b.table_name, b.log_seq, b.work_stat
              , b.delete_cnt, b.read_cnt, b.write_cnt, b.error_cnt
              , b.start_time, b.end_time, b.exec_time, b.work_desc
        )
    --
        when matched then
        update 
        set     work_ymd    = b.work_ymd
              , work_id     = b.work_id
              , work_name   = b.work_name
              , table_name  = b.table_name
              , log_seq     = b.log_seq
              , work_stat   = b.work_stat
              , delete_cnt  = b.delete_cnt
              , read_cnt    = b.read_cnt
              , write_cnt   = b.write_cnt
              , error_cnt   = b.error_cnt
              , start_time  = b.start_time
              , end_time    = b.end_time
              , exec_time   = b.exec_time
              , work_desc   = b.work_desc
        ;
    $log$
      , tmp_work_ymd, tmp_work_id, tmp_work_name, tmp_table_name, coalesce(tmp_log_seq,0), tmp_work_stat
      , in_delete_cnt, in_read_cnt, in_write_cnt, in_error_cnt, tmp_start_time, tmp_end_time, tmp_exec_time, in_proc_desc) ; 
--  raise notice e'\n% ~ % ;', to_char(clock_timestamp(),'yyyy-mm-dd hh24:mi:ss.ms'), txt_sql_str ;
--
--  execute : select dblink(merge into tb_mig_worklog )
    select  ret_str  into tmp_ret_str 
    from    dblink('dbname=postgres', trim(txt_sql_str)) as t1 (ret_str text);
--
-- returns of log_seq
    in_log_seq := coalesce(tmp_log_seq,0) ;
--
--  raise notice e'% ~ ret_int = %', to_char(clock_timestamp(),'yyyy-mm-dd hh24:mi:ss.ms'), in_log_seq ;
exception
    when others then
        get stacked diagnostics 
            txt_sqlstate    = returned_sqlstate
          , txt_message     = message_text
          , txt_pg_except   = pg_exception_context;
        raise exception e'\nreturned_sqlstate: %,\nmessage_text: %,\npg_exception_context: %'
          , txt_sqlstate, txt_message, txt_pg_except; 
end ;
$procedure$
;

-- DROP PROCEDURE public.sp_set_col_attnum(varchar, varchar, int4);

CREATE OR REPLACE PROCEDURE public.sp_set_col_attnum(IN in_table_name character varying, IN in_column_name character varying, IN in_column_pos integer)
 LANGUAGE plpgsql
AS $procedure$
--do $$
declare
/*
 * procedure name : sp_set_col_attnum 
 * description   : update pg_catalog.pg_attribute set attnum ...
 * usage :  call sp_set_col_attnum ('tb_mig_prog_def2', 'work_comment', 25) ;
*/
    rec                   record ;
    tmp_table_name        varchar(100) = lower('tb_mig_prog_def2');
    tmp_column_name       varchar(100) = 'work_comment1';
    tmp_column_num        int4 = 30;
    tmp_column_pos        int4 ;
begin
--
    tmp_table_name  = lower(in_table_name) ;
    tmp_column_name = lower(in_column_name) ;
    tmp_column_num  = in_column_pos ;
  
    raise notice e'\n### start sp_set_col_attnum !!! ~ %', 'sp_set_col_attnum (' || tmp_table_name || ',' || tmp_column_name || ',' || in_column_pos || ');';
    begin
        select  attname, attnum into tmp_column_name, tmp_column_pos
        from    pg_catalog.pg_attribute 
        where   1 = 1
        and     attrelid = in_table_name::regclass
        and     attname  = in_column_name ;
    exception
        when others then
            raise exception e'error : table does not exists !!! (%.%)', in_table_name, in_column_name ;
            return ;
    end;
--
    if (coalesce(tmp_column_pos,0) <= 0 or in_column_pos <= 0)then
        raise exception e'error : column not exists or pos <= 0 !!! (%.% , % > 0)', in_table_name, in_column_name, in_column_pos ;
        return ;
    end if ;  
--
    if (tmp_column_pos < tmp_column_num) then
        tmp_column_num = tmp_column_num + 1;
    end if;
    raise notice e'update  pg_catalog.pg_attribute set attnum = 0 (%, %)', tmp_table_name, tmp_column_name ;
--
    update  pg_catalog.pg_attribute 
    set     attnum = 0
    where   1 = 1
    and     attrelid = tmp_table_name::regclass
    and     attname  = tmp_column_name ;
--
    raise notice e'update  pg_catalog.pg_attribute set attnum += 1 (%, %)', tmp_table_name, tmp_column_name ;
    for rec in (
        select  * from pg_catalog.pg_attribute 
        where   1 = 1
        and     attrelid =  tmp_table_name::regclass
        and     attnum >= tmp_column_num
        order   by attnum desc 
    ) loop 
--
        update  pg_catalog.pg_attribute 
        set     attnum = rec.attnum + 1
        where   1 = 1
        and     attrelid = tmp_table_name::regclass
        and     attname  = rec.attname ;
    end loop ;
--
    raise notice e'update  pg_catalog.pg_attribute set attnum = % (%.% = %)', tmp_column_num , tmp_table_name, tmp_column_name, tmp_column_num ;
--
    update  pg_catalog.pg_attribute 
    set     attnum = tmp_column_num
    where   1 = 1
    and     attrelid = tmp_table_name::regclass
    and     attname  = tmp_column_name ;
--
    raise notice e'\nreordering columns attnum (%)', tmp_table_name ;
--
    for rec in (
        select  row_number() over (order by attnum) as rn, a.* from pg_catalog.pg_attribute a 
        where   1 = 1
        and     attrelid =  tmp_table_name::regclass
        and     attnum >= 0
        order   by attnum asc
    ) loop 
        raise notice e'...update  pg_catalog.pg_attribute set attnum = % (%.% = %)', rec.rn, tmp_table_name, rec.attname,  rec.rn ;
--
        update  pg_catalog.pg_attribute 
        set     attnum = rec.rn
        where   1 = 1
        and     attrelid = tmp_table_name::regclass
        and     attname  = rec.attname ;
    end loop ;
--
    raise notice e'### end sp_set_col_attnum !!! ~ % \n', 'sp_set_col_attnum (' || tmp_table_name || ',' || tmp_column_name || ',' || in_column_pos || ');';
end;
/*
 * procedure name : sp_set_col_attnum 
 * description   : update pg_catalog.pg_attribute set attnum ...
 * usage :  call sp_set_col_attnum ('tb_mig_prog_def2', 'work_comment', 25) ;
*/
$procedure$
;

-- DROP PROCEDURE public.sp_setval_seq(varchar, varchar);

CREATE OR REPLACE PROCEDURE public.sp_setval_seq(IN in_schema_name character varying DEFAULT ''::character varying, IN in_table_name character varying DEFAULT ''::character varying)
 LANGUAGE plpgsql
AS $procedure$
/*
 FUNCTION NAME : SP_SETVAL_SEQ
 DESCRIPTION   : TABLE의 SERIAL4를 setval() 수행
 USAGE :
   call SP_SETVAL_SEQ (in_schema_name => 'PUBLIC', in_table_name => 'tb_avn_sm_asr_bird_strike%') ;
   select setval('tb_avn_sm_asr_bird_strike_id_seq',(select max(id) as col_max from public.tb_avn_sm_asr_bird_strike), true) as serial_val ;  
*/
declare
    str_work_id             varchar(100) := 'SP_SETVAL_SEQ';
    str_work_name           varchar(100) := 'TABLE의 SERIAL4를 setval() 수행';
    tmp_schema_name         varchar(100) ;
    tmp_table_name          varchar(100) ;
    tmp_ret_int             int8 ; 
--
    rec                     record ;
    __exec_sql              text ;
--
    sql_rows                bigint := 0 ;
--    
    txt_sqlstate            text ; 
    txt_message             text ; 
    txt_pg_except           text ; 
    txt_pg_exception_detail text ; 
    txt_pg_exception_hint   text ; 
    txt_column_name         text ; 
--    
    start_timestamp         timestamp :=  clock_timestamp() ;
--
begin
    execute format('set application_name = %L', str_work_id);
    raise notice e'\n% ####################################', to_char(clock_timestamp(),'yyyy-mm-dd hh24:mi:ss.ms') ;
    raise notice e'\n% ~ PROGRAM ...START..!!!, (%) % sec'
        , to_char(clock_timestamp(),'yyyy-mm-dd hh24:mi:ss.ms')::varchar, str_work_id 
        , to_char(extract(epoch from (clock_timestamp() - start_timestamp))::numeric,'FM990.00')::varchar
    ;
-- INIT : PARAMETERS
    tmp_schema_name := coalesce(lower(trim(in_schema_name)), 'public') ; 
    tmp_table_name  := coalesce(lower(trim(in_table_name)), 'tb_%') ;
--
    for rec in 
        select  *
        from    information_schema.columns col_att  --- data_type 정보
        where   1 = 1
        and     col_att.table_schema = tmp_schema_name
        and     col_att.table_name like tmp_table_name
        and     col_att.column_default like 'nextval%'
    loop
        begin
--  execute format('select setval('tb_ocu_committee_ocu_commit_id_seq', (select max(ocu_commit_id) from tb_ocu_committee), true);') 
            __exec_sql := 
                'select setval(''' || replace(replace(rec.column_default, 'nextval(''', ''), '::regclass)','') || ',' ||
                '(select max(' || rec.column_name || ') as col_max from ' || rec.table_schema || '.' || rec.table_name || '), true) as serial_val;' ;
            raise notice e'\nSQL : %', __exec_sql ;
            execute format('%s', __exec_sql) into tmp_ret_int ;
--
            get diagnostics sql_rows = row_count;
            raise notice e'% ~ execute...END....!!!, %, %, % '
                , to_char(clock_timestamp(),'yyyy-mm-dd hh24:mi:ss.ms')::varchar
                , to_char(sql_rows,'FM999,999,990')::varchar
                , to_char(tmp_ret_int,'FM999999990')::varchar
                , rec.column_default
          ;
        exception
            when others then
                get diagnostics sql_rows = row_count;
                get stacked diagnostics 
                    txt_sqlstate  = returned_sqlstate
                  , txt_message   = message_text
                  , txt_pg_except = pg_exception_context
                  , txt_pg_exception_detail = pg_exception_detail 
                ;
                raise notice e'returned_sqlstate: %,\nmessage_text: %,\npg_exception_context: %\ndetail: %'
                  , txt_sqlstate, txt_message, txt_pg_except, txt_pg_exception_detail ;        
                continue ;
        end ;
    end loop ;    
--
    str_work_id := 'SP_SETVAL_SEQ ~ PROGRAM END';
    raise notice e'\n% ~ PROGRAM ...END....!!!, (%) % sec'
        , to_char(clock_timestamp(),'yyyy-mm-dd hh24:mi:ss.ms')::varchar, str_work_id 
        , to_char(extract(epoch from (clock_timestamp() - start_timestamp))::numeric,'FM990.00')::varchar
    ;
    raise notice e'\n% ####################################', to_char(clock_timestamp(),'yyyy-mm-dd hh24:mi:ss.ms') ;
end; 
$procedure$
;

-- DROP FUNCTION public.update_fleet_view_order();

CREATE OR REPLACE FUNCTION public.update_fleet_view_order()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.view_order := (SELECT COUNT(*) FROM public.tb_avn_sm_fleet) + 1;
    RETURN NEW;
END;
$function$
;

-- DROP FUNCTION public.utc_now();

CREATE OR REPLACE FUNCTION public.utc_now()
 RETURNS timestamp without time zone
 LANGUAGE sql
AS $function$
		SELECT TIMEZONE('UTC', NOW())::TIMESTAMP;
	$function$
;