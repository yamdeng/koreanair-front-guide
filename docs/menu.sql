-- 최상위
INSERT INTO public.tb_sys_menu(menu_id, work_scope, name_kor, name_eng, name_chn, name_jpn, name_etc, tree_type, upper_menu_id, sort_order, menu_url, use_yn, remark, reg_user_id, reg_dttm, upd_user_id, upd_dttm)
VALUES('A990000', 'A', '프론트 가이드', '프론트 가이드_en', '', '', '', 'F', 'S000000', 99, '', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP);

-- 가이드 대분류 메뉴
INSERT INTO public.tb_sys_menu(menu_id, work_scope, name_kor, name_eng, name_chn, name_jpn, name_etc, tree_type, upper_menu_id, sort_order, menu_url, use_yn, remark, reg_user_id, reg_dttm, upd_user_id, upd_dttm)
VALUES('A990010', 'A', '공통 input 컴포넌트', '공통 input 컴포넌트_en', '', '', '', 'F', 'A990000', 99, '', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990030', 'A', '공통모달', '공통모달_en', '', '', '', 'F', 'A990000', 99, '', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990040', 'A', '다국어', '다국어_en', '', '', '', 'F', 'A990000', 99, '', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990080', 'A', '기타', '기타_en', '', '', '', 'F', 'A990000', 99, '', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP);


-- 실제 메뉴들 : input
INSERT INTO public.tb_sys_menu(menu_id, work_scope, name_kor, name_eng, name_chn, name_jpn, name_etc, tree_type, upper_menu_id, sort_order, menu_url, use_yn, remark, reg_user_id, reg_dttm, upd_user_id, upd_dttm)
VALUES('A990011', 'A', '공통속성(form)', '공통속성(form)_en', '', '', '', 'M', 'A990010', 99, '/aviation/guides/common-input-form', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990012', 'A', '공통속성(search)', '공통속성(search)_en', '', '', '', 'M', 'A990010', 99, '/aviation/guides/common-input-search', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990013', 'A', 'AppTextInput', 'AppTextInput', '', '', '', 'M', 'A990010', 99, '/aviation/guides/app-text-input', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990014', 'A', 'AppCodeSelect', 'AppCodeSelect', '', '', '', 'M', 'A990010', 99, '/aviation/guides/app-code-select', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990015', 'A', 'AppCheckbox', 'AppCheckbox', '', '', '', 'M', 'A990010', 99, '/aviation/guides/app-checkbox-radio', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990016', 'A', 'AppDatePicker', 'AppDatePicker', '', '', '', 'M', 'A990010', 99, '/aviation/guides/app-date-picker', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A9900162', 'A', 'AppDatePicker2', 'AppDatePicker2', '', '', '', 'M', 'A990010', 99, '/aviation/guides/app-date-picker2', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990017', 'A', 'AppRangeDatePicker', 'AppRangeDatePicker', '', '', '', 'M', 'A990010', 99, '/aviation/guides/app-rangedate-picker', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A9900172', 'A', 'AppRangeDatePicker2', 'AppRangeDatePicker2', '', '', '', 'M', 'A990010', 99, '/aviation/guides/app-rangedate-picker2', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990018', 'A', 'AppTimePicker', 'AppTimePicker', '', '', '', 'M', 'A990010', 99, '/aviation/guides/app-time-picker', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990019', 'A', 'AppEditor', 'AppEditor', '', '', '', 'M', 'A990010', 99, '/aviation/guides/app-text-editor', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990020', 'A', 'AppUserSelectInput', 'AppUserSelectInput', '', '', '', 'M', 'A990010', 99, '/aviation/guides/app-member-input', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990021', 'A', 'AppTreeSelect', 'AppTreeSelect', '', '', '', 'M', 'A990010', 99, '/aviation/guides/app-tree-select', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990022', 'A', 'AppAutoComplete', 'AppAutoComplete', '', '', '', 'M', 'A990010', 99, '/aviation/guides/app-auto-complete', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990023', 'A', 'AppFileAttach', 'AppFileAttach', '', '', '', 'M', 'A990010', 99, '/aviation/guides/app-file-attach', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990024', 'A', 'Tree', 'Tree', '', '', '', 'M', 'A990010', 99, '/aviation/guides/tree', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990025', 'A', '항공안전 사용자 선택', '항공안전 사용자 선택', '', '', '', 'M', 'A990010', 99, '/aviation/guides/avn-user-select', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990031', 'A', 'AlertModal', 'AlertModal', '', '', '', 'M', 'A990030', 99, '/aviation/guides/alert-modal', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990032', 'A', '조직도모달', '조직도모달', '', '', '', 'M', 'A990030', 99, '/aviation/guides/org-modal', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990033', 'A', '모달서비스', '모달서비스', '', '', '', 'M', 'A990030', 99, '/aviation/guides/modal-service', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990041', 'A', '다국어-basic', '다국어-basic', '', '', '', 'M', 'A990040', 99, '/aviation/guides/locale-basic', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990042', 'A', '다국어-code', '다국어-code', '', '', '', 'M', 'A990040', 99, '/aviation/guides/locale-code', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990043', 'A', '다국어-form', '다국어-form', '', '', '', 'M', 'A990040', 99, '/aviation/guides/locale-form', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990081', 'A', '토스트 alert', '토스트 alert', '', '', '', 'M', 'A990080', 99, '/aviation/guides/toast-service', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990082', 'A', 'api 옵션', 'api 옵션', '', '', '', 'M', 'A990080', 99, '/aviation/guides/api-service', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990083', 'A', '상세(첨부,에디터)', '상세(첨부,에디터)', '', '', '', 'M', 'A990080', 99, '/aviation/guides/detailpage-editor', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990084', 'A', 'useFormDirtyCheck', 'useFormDirtyCheck', '', '', '', 'M', 'A990080', 99, '/aviation/guides/unload', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990085', 'A', 'profile', 'profile', '', '', '', 'M', 'A990080', 99, '/aviation/guides/profile', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990086', 'A', 'auth', 'auth', '', '', '', 'M', 'A990080', 99, '/aviation/guides/auth', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990087', 'A', '라우트', '라우트', '', '', '', 'M', 'A990080', 99, '/aviation/guides/route', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990034', 'A', '파일모달', '파일모달', '', '', '', 'M', 'A990030', 99, '/aviation/guides/modal/file', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990088', 'A', 'yup-case1', 'yup-case1', '', '', '', 'M', 'A990080', 99, '/aviation/guides/yup/case1', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990089', 'A', 'yup-case2', 'yup-case2', '', '', '', 'M', 'A990080', 99, '/aviation/guides/yup/case2', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990050', 'A', '테이블', '테이블', '', '', '', 'F', 'A990000', 99, '', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990051', 'A', '테이블(펼치기/닫기)', '테이블(펼치기/닫기)', '', '', '', 'M', 'A990050', 99, '/aviation/guides/table/case1', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990052', 'A', 'yup table case1', 'yup table case1', '', '', '', 'M', 'A990050', 99, '/aviation/guides/table/case2', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990053', 'A', 'yup table case2', 'yup table case2', '', '', '', 'M', 'A990050', 99, '/aviation/guides/table/case3', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990054', 'A', '대표보고서 묶음 처리 case', '대표보고서 묶음 처리 case', '', '', '', 'M', 'A990050', 99, '/aviation/guides/table/case4', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990026', 'A', '사용자 검색(단건)', '사용자 검색(단건)', '', '', '', 'M', 'A990010', 99, '/aviation/guides/user-search-single', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990027', 'A', '부서 검색(단건)', '부서 검색(단건)', '', '', '', 'M', 'A990010', 99, '/aviation/guides/dept-search-single', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('A990028', 'A', '공항검색', '공항검색', '', '', '', 'M', 'A990010', 99, '/aviation/guides/avn-airport-search', 'Y'::character varying, '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP);

-- 다국어
INSERT INTO tb_sys_message
(msg_key, msg_kor, msg_eng, msg_chn, msg_jpn, msg_etc, reg_user_id, reg_dttm, upd_user_id, upd_dttm)
VALUES('front.text.001', '테스트01', 'test01', '', '', '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('front.text.002', '테스트02 {{name}} 입니다', 'test02 {{name}} 입니다', '', '', '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('front.common.modal.close', '닫기', 'close', '', '', '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('front.validation.validation.required', '필수값입니다.', 'required field', '', '', '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP);


-- validate 필수값
INSERT INTO tb_sys_message
(msg_key, msg_kor, msg_eng, msg_chn, msg_jpn, msg_etc, reg_user_id, reg_dttm, upd_user_id, upd_dttm)
VALUES('validation.required', '필수값입니다.', 'required.', '', '', '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP),
('validation.required.label', '{{label}} 필수값입니다.', '{{label}} is a required.', '', '', '', '', CURRENT_TIMESTAMP, '', CURRENT_TIMESTAMP);