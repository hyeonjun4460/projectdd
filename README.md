# projectdd
식단/체중 기록 프로젝트

## 1. 주요 기능
- 일자별 식단(diet) 기록/조회/삭제
- 일자별 체중(기상 후/취침 전) 기록/조회/수정/삭제
- 주간별 식단/체중 기록 조회


## 2. 프로젝트 목표
- js-joda/core 사용 숙련
- presigned url 방식 이미지 업로드 구현
- ~~테스트 코드 작성하기~~ (시행착오 및 API 개발 속도 이슈로 철회...)
- ~~트랜젝션, 인덱싱 도입~~(API만 개발하는 단계에서는 실제로 트랜젝션이나 인덱싱을 걸어야겠다고 느껴진 지점들이 없었다.)
- ~~docker 사용하기~~(이전에 실습했던 docker-compose.yml, DockerFile을 바탕으로 도입하기로 결정.)
  
## 3. 기술 스택
-  언어, 프레임워크: typescript / nestjs(10.0.0)
-  데이터베이스/ORM: mysql(8.0.32) / typeorm(0.3.17)
-  이미지 관리: aws-sdk/s3-request-presigner
-  시간 데이터 관리: @js-joda/core
- 유저 인증 관리: JWT

## 4. ERD
<details>
  
  ![erd](https://github.com/hyeonjun4460/projectdd/assets/49478770/32bf1224-dff8-4086-b3dc-41e04d47f7ef)

</details>

## 5.TIL
[TIL 노션 링크][LINK]

[LINK]:https://simple-vermicelli-3e6.notion.site/TIL-4b612e15d13b46008bdca335de0907e7?pvs=4
