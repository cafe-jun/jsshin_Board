# jsshin_Board 연관 게시글

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

![Query Result](github_picture/게시글생성시연관게시글판단기준.png)

```SQL
    SELECT
        b.*,
        MATCH(title,body) AGAINST('좋다 광해군 MYSQL' IN BOOLEAN  MODE) AS SCORE
    FROM Board_MYISAM_Statistics b
    WHERE MATCH(title,body) AGAINST('좋다 광해군 MYSQL' IN BOOLEAN  MODE);
```

쿼리 결과

![Query Result](github_picture/게시글생성시연관게시글판단기준.png)
