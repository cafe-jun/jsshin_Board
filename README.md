# jsshin_Board 연관 게시글

사전에 세팅될 MYSQL 환경 변수

macbook homebrew mysql 설치 기준

vim /opt/homebrew/etc/my.cnf

```LINUX
[mysqld]
# Only allow connections from localhost
bind-address = 127.0.0.1
mysqlx-bind-address = 127.0.0.1
ft_min_word_len=2               --> fulltext index 매칭 단어 길이 (단어의 길이를 최소 2로 두고 검색)
innodb_ft_min_token_size=2      --> innodb 사용시 2글자부터 검색

```

```SQL
# INNODB엔지에 FULLTEXT 인덱스 활용하여 INNODB_FT_INDEX_TABLE 전체 게시글 연관단어 파악하기 위함
SET GLOBAL innodb_ft_aux_table = 'jsshin_Board/Board';
#  FULLTEXT 인덱스 캐시는 디스크로 플러시 적용
SET GLOBAL innodb_optimize_fulltext_only=ON;

```

동일한 테이블에 다른(INNODB,MYISAM) 엔진을 2개 생성한 이유

INNODB : FullText Index 활용하여 전체 게시글의 단여별 개수와 빈도수를 제공해주는 테이블 제공

MYISAM : FullText Index Boolean Mode 사용시 정확한 매칭 카운트를 제공 (Read 작업에 성능이 좋음)

전체 게시글의 연관 단어가 60%이상일경우 확인하는 쿼리 (INNODB_FT_INDEX_TABLE 은 INNONDB 에서만 가능 )

```SQL
    SELECT
        WORD,
        COUNT(WORD_CNT)/(select count(id) from board) as FREQUENCY
    FROM (
        SELECT
            DOC_ID,
            WORD,
            COUNT(WORD) as WORD_CNT
        FROM INFORMATION_SCHEMA.INNODB_FT_INDEX_TABLE
        GROUP BY DOC_ID,WORD
    ) table_word
    GROUP BY WORD
    HAVING FREQUENCY >= ${threshold} <<- 임계치 (여기서는 )
    ORDER BY FREQUENCY DESC
```

쿼리 결과

![Query Result](github_picture/전체게시글단어빈도수.png)

FullText Index를 활용하여 MYISAM엔진 게시판 테이블에 생성한 게시물 단어 매칭률을 확인하기 쿼리

```SQL
    SELECT
        b.*,
        MATCH(title,body) AGAINST('좋다 광해군 MYSQL' IN BOOLEAN  MODE) AS SCORE
    FROM Board_MYISAM_Statistics b
    WHERE MATCH(title,body) AGAINST('좋다 광해군 MYSQL' IN BOOLEAN  MODE);
```

쿼리 결과

![Query Result](github_picture/게시글생성시연관게시글판단기준.png)
