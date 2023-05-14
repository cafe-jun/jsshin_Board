// 테이블 단편화
export const OptimizeBoardTableQuery = `OPTIMIZE TABLE Board`;

// 전체 게시글을 형태로소 분리후 ( 단어별 연관된 게시글 개수 / 게시글 전체 개수 ) 값에 60% 이상인 단어 출력
export const TotalBoardFrequencyWordsQuery = (threshold: number) => `
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
        HAVING FREQUENCY >= ${threshold}
        ORDER BY FREQUENCY DESC
`;

// 40% 이하의 연관 단어중 각 게시글의 words 가 메칭된 개수중 2개 이상의 게시글
export const FrequencyWordsMYISAMEngineQuery = (
  boardId: number,
  words: string,
) => `
      SELECT 
          *,
          MATCH(title,body) AGAINST('${words}' IN BOOLEAN MODE) as score
      FROM Board_MYISAM_Statistics
      WHERE MATCH(title,body) AGAINST('${words}' IN BOOLEAN MODE) >= 2
      AND id != ${boardId} 
      ORDER BY score DESC
`;
