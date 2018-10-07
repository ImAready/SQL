#### Transact-SQL 기본

#### 01. SELECT 문

> 원하는 데이터를 가져와 주는 기본적인 <SELECT ... FROM>



* SELECT 구문 형식

`SELECT select_list [ INTO new_table ]  
[ FROM table_source ] [ WHERE search_condition ]  
[ GROUP BY group_by_expression ]  
[ HAVING search_condition ]  
[ ORDER BY order_expression [ ASC | DESC ] ] `

* 기본 형식

**SELECT select_list `[ FROM table_source ][ WHERE search_condition ]`**

* USE 구문
  * USE 데이터베이스_이름;
  * 현재 사용하는 데이터베이스를 지칭 또는 변경
* SELECT와 FROM
  * SELECT * FROM HumanResources.Employee ;
  * `*` : 해당 테이블의 모든 열(필드)을 조회한다.
  * HumanResources : 스키마 이름
  * Employee : 테이블 이름
    * 서버이름.데이터베이스이름.스키마이름.테이블이름
    * 스키마 이름은 지정하지 않으면 디폴트(dbo)가 들어감.

* 데이터베이스 개체 이름 규칙

  * 제일 앞에 특수문자가 들어오면 안된다. (단 @, _, # 은 예외)

  * 예약어를 사용하면 안된다.

  * 중간에 공백을 사용하려면 대괄호[] 또는 큰따옴표""로 묶어야한다. 되도록 [] 권장/

    * CREATE TABLE [My table] ...






> 특정 조건의 데이터만 조회하는 <SELECT ... FROM ... WHERE>
> 

* 기본적인 WHERE 절

  * 조회할 때 특정한 조건을 줘서, 원하는 데이터만 보고 싶을 때 사용
  * SELECT 필드이름 FROM 테이블이름 WHERE 조건식;
* 관계 연산자 사용

  * AND, OR 사용 가능.
* BETWEEN ... AND, IN(), LIKE

  * SELECT name FROM userTbl WEHER height BETWEEN 180 AND 183;
    * BETWEEN ... AND : 데이터가 연속적인 값일때 기준 사이의 값을  조회한다.
    * 관계연산자 사용 : height >= 180 AND height <= 183
  * SELECT name FROM userTbl WHERE addr IN ('경남', '전남', '경북')
    * 연속적인 데이터가 아닌 이산적인 값을 찾을 때
  * SELECT name FROM userTbl WHERE name LIKE '김%'
    * 문자열의 내용 검색
    * % :  무엇이든 허용
    * _ : 한글자와 매칭  -> _종신 : 맨 앞글자 한글자이고, 그다음이 종신인 사람 
* ANY / ALL / SOME, 하위쿼리

  * 하위쿼리(=서브쿼리)
    * 쿼리문 안에 또 쿼리문이 들어있는 것.
    * 김경호보다 키가 크거나 같은 사람
      * SELECT name FROM userTBL WHERE height > (SELECT height FROM userTbl WHERE name = '김경호')
  * ANY = SOME (같은 의미)
    * 둘 이상의 반환값을 받아 오류가 나는 경우 
    * 하위쿼리의 여러 결과값 중 한 가지만 만족해도 된다.
    * SELECT name FROM userTBL WHERE height >= (SELECT height FROM userTbl WHERE addr = '경남')  -> **반환값 2개 이상이면 관계연산자 사용 불가**
      * ..WHERE height >= ANY (SELECT height FROM userTbl WHERE addr = '경남')
        * 주소가 경남인 사람들의 키보다 크거나 같은 사람들이 조회된다. 예를 들어 경남 사람 2명이 170, 173이면 170보다 큰 사람, 173보다 큰사람들이 조회
  * ALL
    * ..WHERE height >= ALL (SELECT height FROM userTbl WHERE addr = '경남')
      * 키가 170보다크고 173보다도 커야한다.
    * 하위쿼리 결과 여러개를 모두 만족시켜야 한다.
* ORDER BY

  * 결과가 출력되는 순서를 조절한다.
  * 디폴트 : 오름차순 (ASC) <-> 내림차순(DESC)
* DISTINCT, TOP(N), TABLESAMPLE 절

  * DISTINCT
    * 중복제거
    * SELECT DISTINCT name FROM userTbl;
  * TOP (N)
    * **상위** N개만 출력
    * SELECT TOP 1 name FROM userTbl WHERE addr = '경기' ORDER BY height
    * 만약 키가 같은 사람이 3명이라면 제일 상위 1명만 나옴
      * 이를 위해 마지막 출력값과 같은 값이 있다면 N을 넘더라도 출력하는 WITH TIES 옵션이 있다.
      * SELECT TOP 1 height WITH TIES name FROM userTbl..
  * TABLESTAMP
    * **전체에서 무작위**로 일정한 샘플 데이터 추출
    * 테이블에 데이터 양이 적은 경우 제대로 실행되지 않는다.
      * 샘플링 기준이 행의 개수가 아닌 페이지 기준이기 때문이다.
    * 결과의 개수는 정확한 값이 아닌 근사치로 샘플을 추출한다.
    * SELECT * FROM userTbl TABLESAMPLE(5 height)
* OFFSET / FETCH NEXT
  * OFFSET
    * 지정한 행의 수만큼 건너 뛴 후에 출력.
    * SELECT name FROM userTbl ORDER BY birthYear OFFSET 4 ROWS;
      * 전체 행이 10명이라면 그 중 4명을 건너 뛰고 5번째 행부터 출력
    * **ORDER BY 문이 함께 나와야 사용 가능**
  * FETCH NEXT
    * 출력될 행의 수 지정
    * SELECT name FROM userTbl ORDER BY birthYear OFFSET 4 ROWS FETCH NEXT 3 ROWS ONLY;
      * 5번째 행부터 3개 가져오기
* SELECT INTO
  * 테이블을 복사해서 사용할 때 주로 사용
  * SELECT 복사할 열 INTO 새로운테이블 FROM 기존테이블
  * 기본키나 외래키 등의 제약 조건은 복사되지 않는다.





> GROUP BY, HAVING, 집계 함수

* GROUP BY

  * 그룹으로 묶어주는 역할

* 집계 함수

  * | 함수명     | 설명                                                         |
    | ---------- | ------------------------------------------------------------ |
    | AVG()      | 평균                                                         |
    | MIN()      | 최소값                                                       |
    | MAX()      | 최대값                                                       |
    | COUNT()    | 행의 개수, 열을 지정하면 해당 열이 NULL값은 제외하고 카운트한다. |
    | COUN_BIG() | 개수를 센다. 단 결과값이 BIGINT                              |
    | STDEV()    | 표준편차                                                     |
    | VAR()      | 분산                                                         |

  * 집계 함수로 반환된 값은 해당 필드의 데이터 형식이므로 필요하다면 CAST(정수->실수)나 CONVERT함수로 형변환 해준다.

* HAVING

  * 집계함수는 WHERE 절에 사용할 수 없다. 이 대안으로 HAVING 을 사용.
  * = 집계함수에 대해서만 조건을 제한한다.
  * GROUP BY 절 다음에 작성해야 한다. **순서가 바뀌면 안된다**





> ROLLUP / GROUPING_ID / CUBE

* ROLLUP 
  * 총합 또는 중갑 합계를 구한다.
  * GROUP BY ROLLUP (name, num)
* GROUPING_ID
  * 조회 결과가 데이터인지 합계인지 알고 싶을 떄 사용
  * 함수 결과가 0이면 데이터, 1이면 합계를 위해 추가된 열이다.
  * SELECT name , amount, GROUPING_ID(name) FROM buyTbl GROUP BY ROLLUP(name)
* CUBE
  * 다차원 정보의 데이터를 요약하는 데 더 적당하다.
  * 물품명, 색상, 수량 필드가 있을 때 물품별, 색상별로 소합계를 보고 싶을 때 사용
  * GROUP BY CUBE(color, prodName)





> WITH 절과 CTE

* WITH
  * CTE를 표현하는 구문
* CTE
  * 기본의 뷰, 파생 테이블, 임시 테이블 등으로 사용되던 것을 대신할 수 있으며, 더 간결한 식으로 보여지는 장점이 있다.
  * ANSI-SQL99 표준에서 나온 것.
* 비재귀적 CTE
  * 단순한 형태로 복잡한 쿼리 문장을 단순화시키는 데 적합하게 사용
  * ```WITH CTE_테이블이름(열이름) AS( <쿼리문>) SELECT 열이름 FROM CTE_테이블이름```
  * 쿼리문 결과를 WITH절에서 정의한 테이블에 담아 사용할 수 있다.
  * 구문이 끝나면 사라진다. 
  * WITH절은 다른 문법에서도 사용하기 때문에 앞뒤로 세미콜론(;)이나 GO문으로 문장을 분리해줘야 오류가 발생하지 않는다.
  * 중복 정의 가능 WITH AAA(), BBB()..
    * 위와 같을 때 BBB에서는 AAA가 참조 가능하지만 AAA에서는 BBB를 참조할 수 없다
    * 즉 아직 정의되지 않은 cTE를 미리 참조할 수 없다.

* 재귀적 CTE
  * ```WITH CTE_테이블이름 AS (<쿼리문1 SELECT..> UNIUON ALL <쿼리문2 SELECT..>)```
  * 쿼리문1 : 앵커 멤버
  * 쿼리문2 : 재귀 멤버
  * 실행 순서
    1. 쿼리문1을 실행. 기본값은 0으로 초기화
    2. 쿼리문2를 실행. 기본값을 +1한다. SELECT 결과가 있다면 CTE_테이블이름을 재귀적 호출한다.
    3. 2번은 반복, 단 SELECT 결과가없다면 재귀적 호출이 중단.
    4. 외부 SELECT 문으로 UNION 결과를 가져온다.