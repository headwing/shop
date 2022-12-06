import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import "./App.css";
import bg from "./img/bg.png";
import data from "./data.js";
import { useState } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./Detail";
import axios from "axios";

function App() {
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Link to="/">홈</Link>
      <Link to="/detail">상세페이지</Link>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div
                className="mainBg"
                style={{ backgroundImage: "url(" + bg + ")" }}
              ></div>

              <Container>
                <Row>
                  {shoes.map((shoes, i) => {
                    return <List data={shoes} key={i} />;
                  })}
                </Row>
              </Container>

              <button
                onClick={() => {
                  // ajax 이용한 GET 요청은 axios.get("url")
                  axios
                    .get("https://codingapple1.github.io/shop/data2.json")
                    .then((result) => {
                      setShoes([...shoes, ...result.data]);
                    }) // 요청결과는 axios.get("url").then()
                    .catch(() => {
                      console.log("API 요청 실패");
                    });
                }}
              >
                버튼
              </button>
            </>
          }
        />

        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
        {/* 잘못된 url로 접속했을 때, 404페이지 만들기 --> "없는 페이지입니다" 보여주고 싶을 때*/}
        <Route path="*" element={<div>없는 페이지에요</div>} />

        {/* 이 방식과 아래의 방식은 같은 기능이지만 이 방식이 더 간단하고 편리 */}
        {/* 이렇게 nested route 접속시엔 element가 2개나 보인다. 그런데 <Outlet>을 통해 <About>안에 어디다 보여줄지 정해야한다. */}
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버들</div>} />
          <Route path="location" element={<div>회사위치</div>} />
        </Route>

        {/* <Route path="/about/member" element={<div>멤버들</div>} />
        <Route path="/about/location" element={<div>회사위치</div>} /> */}
        <Route path="/event" element={<Event />}>
          <Route path="one" element={<div>첫 주문 시 양배추즙 서비스</div>} />
          <Route path="two" element={<div> 생일 기념 쿠폰 받기</div>} />
        </Route>
      </Routes>
    </div>
  );
}
function List({ data }) {
  return (
    <Col sm>
      <img src={data.img} width="100%" />
      <h4>{data.title}</h4>
      <p>{data.content}</p>
    </Col>
  );
}

function About() {
  return (
    <div>
      <div>회사 정보임</div>
      <Outlet></Outlet>
    </div>
  );
}

function Event() {
  return (
    <div>
      <h2>오늘의 이벤트</h2>
      <Outlet></Outlet>
    </div>
  );
}
export default App;
