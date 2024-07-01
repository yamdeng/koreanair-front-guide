export interface ITest {
  id: number;
  sabun: string;
  position: string;
  name: string;
  nameEn: string;
  deptName: string;
}

export interface IUser {
  id: number /* ID */;
  createUserId: number /* 등록자 ID */;
  updateUserId: number /* 수정자 ID */;
  createDate: Date /* 등록일 */;
  updateDate: Date /* 수정일 */;
  isDelete: boolean /* 삭제 여부 */;
  name: string /* 이름 */;
  nameEn: string /* 이름영문명 */;
  sabun: string /* 사번 */;
  deptId: number /* 부서ID */;
  positionTitle: string /* 사용자직책명 */;
  positionTitleEn: string /* 사용자직책영문명 */;
  phoneNumber: string /* 핸드폰번호 */;
  companyTel: string /* 회사전화번호 */;
  email: string /* 이메일 */;
  address: string /* 주소 */;
  addressDetail: string /* 주소상세 */;
  zipCode: string /* 우편변호 */;
  joinDate: Date /* 입사일 */;
  status: string /* 사용자상태 */;
}
