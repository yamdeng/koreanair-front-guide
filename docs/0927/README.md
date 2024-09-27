# 대한항공 KSMS Backend 프로젝트

### Reference Documentation

개발에 필요한 내용은 아래 문서를 참조하세요.

- [개발환경 가이드(BE)](https://docs.google.com/document/d/1-oMvtW27-puscigc7s2gf0Pg2IlA_64vUeG7w2Ve4js/edit#heading=h.omwrcmqzmw3)

./gradlew :module-adminbe:bootRun
./gradlew :module-ksmsbe:bootRun

./gradlew :module-admin:bootRun --args='--spring.profiles.active=local'
./gradlew :module-ksmsbe:bootRun --args='--spring.profiles.active=local'
