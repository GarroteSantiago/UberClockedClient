import {BrowserRouter, Route, Router, Routes} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" >
            <Route index />
            <Route path="home" />
            <Route path="store/pc-hardware" />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
