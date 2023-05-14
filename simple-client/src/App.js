import { BrowserRouter, Route, Routes } from "react-router-dom";
import Board from "./page/Board";
import BoardDetail from "./page/BoardDetail";
import EditBoard from "./page/EditBoard";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/board/:id" element={<BoardDetail />} />
          <Route path="/edit" element={<EditBoard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
