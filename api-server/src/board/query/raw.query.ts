export const OptimizeBoardTableQuery = `OPTIMIZE TABLE Board`;

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
