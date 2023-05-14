import React from "react";
import { useQuery } from "react-query";
import { apiClient } from "../util/apiHelper";
import { useNavigate } from "react-router-dom";
import { formatInTimeZone } from "date-fns-tz";

const BoardDetail = () => {
  let navigate = useNavigate();
  const { isLoading, isError, data, error } = useQuery(
    "boardDetail",
    async () => {
      const { data } = await apiClient.get(
        `/board/${window.location.pathname.split("/")[2]}`
      );
      return data.data;
    },
    {
      refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
      retry: 0, // 실패시 재호출 몇번 할지
      onSuccess: (data) => {
        // 성공시 호출
        console.log("data", data);
      },
      onError: (e) => {
        // 실패시 호출 (401, 404 같은 error가 아니라 정말 api 호출이 실패한 경우만 호출됩니다.)
        // 강제로 에러 발생시키려면 api단에서 throw Error 날립니다. (참조: https://react-query.tanstack.com/guides/query-functions#usage-with-fetch-and-other-clients-that-do-not-throw-by-default)
        console.log(e.message);
      },
    }
  );
  const goToBoardDetail = (boardId) => {
    navigate(`/board/${boardId}`);
    window.location.reload();
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <div>
      <button type="button" onClick={() => navigate('/')}>
        게시글로 돌아가기
      </button>
      <div>제목 : {data.title}</div>
      <div>본문 : {data.body}</div>
      <div>
        등록 시간 :
        {formatInTimeZone(data?.createdAt, "Asia/Seoul", "yyyy-MM-dd HH:mm")}
      </div>
      <div style={{ marginTop: "50px" }}>
        <div>연간 게시물</div>
        <div>
          {data?.relate?.map((board) => {
            return (
              <div
                onClick={() => goToBoardDetail(board.relatedBoard.id)}
                style={{ margin: "15px" }}
              >
                <li key={board.id + board.relatedBoard.title}>
                  <div>제목 : {board.relatedBoard.title}</div>
                  <div>
                    등록 시간 :
                    {formatInTimeZone(
                      board.relatedBoard.createdAt,
                      "Asia/Seoul",
                      "yyyy-MM-dd HH:mm"
                    )}
                  </div>
                </li>
              </div>
            );
          })}
          {data?.related?.map((board) => {
            return (
              <div
                onClick={() => goToBoardDetail(board.board.id)}
                style={{ margin: "15px" }}
              >
                <li key={board.id + board.board.title}>
                  <div>제목 : {board.board.title}</div>
                  <div>
                    등록 시간 :
                    {formatInTimeZone(
                      board.board.createdAt,
                      "Asia/Seoul",
                      "yyyy-MM-dd HH:mm"
                    )}
                  </div>
                </li>
              </div>
            );
          })}
          ;
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;
