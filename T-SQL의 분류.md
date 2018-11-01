#### T-SQL의 분류

##### (1) DML (Data Mainpulation Language) : 데이터 조작어

* 데이터를 조작하는 데 사용되는 언어.
  * 선택, 삽입, 수정, 삭제
  * SELECT, INSERT, UPDATE, DELETE, Transaction (데이터 변경 시 실제 테이블에 완전히 적용하지 않고 임시로 적용시키는 것. -> 실수가 있을 경우 취소할 수 있다. =ROLLBACK)
* 구문이 사용되는 대상은 테이블의 행이다.
  * 따라서 DML 사용 이전에 테이블이 정의되어 있어야 한다.   **!** SELECT INTO 제외



##### (2) DDL (Data Definition Language) : 데이터 정의 언어

* 데이터베이스 개체를 생성, 삭제, 변경하는 역할을 한다.
  * 데이터베이스 개체 : 데이터베이스, 테이블, 뷰, 인덱스 등
* CREATE, DROP, ALTER
* Transaction을 발생시키지 않는다.
  * 되돌림(ROLLBACK), 완적적용(COMMIT)을 시킬 수 없다.
  * 구문 실행 시 즉시 SQL Server에 적용된다.



##### (3) DCL (Data Control Language) : 데이터 제어 언어

* 사용자에게 어떤 권한을 부여하거나 빼앗을 때 사용하는 구문
* GRANT, REVOKE, DENY