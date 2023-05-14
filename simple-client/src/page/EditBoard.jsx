import React from "react";
import useInput from "../Hook/useInput";
import { apiClient } from "../util/apiHelper";
import { useNavigate } from "react-router-dom";
import { formatInTimeZone } from "date-fns-tz";

const EditBoard = () => {
  let navigate = useNavigate();
  const [title, handleTitle] = useInput("");
  const [body, handleBody] = useInput("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post("/board", {
        title,
        body,
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form type="submit" onSubmit={handleSubmit}>
        <div>
          제목 : <input value={title} onChange={handleTitle} />
        </div>
        <div>
          본문 : <input value={body} onChange={handleBody} />
        </div>
        <button>게시글 등록</button>
      </form>
    </div>
  );
};

export default EditBoard;
