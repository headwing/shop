import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";

const Detail = (props) => {
  let shoes = props.shoes;
  let { id } = useParams();
  const shoesDetail = shoes.find((shoes) => {
    return shoes.id === Number(id);
  });
  const [discount, setDiscount] = useState(true);
  const [count, setCount] = useState(0);
  const [num, setNum] = useState("");
  const [tab, setTab] = useState(0);
  const [fade, setFade] = useState("");

  // useEffect는 html을 먼저 불러오고 나중에 실행할 부가적이고 오래걸리는 기능들을 구현할 때 쓴다.
  // 예를 들어 서버로 데이터 요청하는 코드의 경우 시간이 오래걸리므로 useEffect로 짠다.
  // 그런데 만약 서버로 데이터 요청하는 코드가 2초가 소요되고, 2초가 지나기 전에 재렌더링이 발생해서
  // 서버에 데이터 요청하는 코드가 여러번 실행되면서 충돌 및 버그가 생길 수 있어서, return에 기존의 데이터 요청을 제거하도록하는 코드를 짜면 좋다.

  // 2초 후에 할인 멘트 없어지도록하는 함수
  // []이면 mount할 때만 1회 코드가 실행되지만, [count]로 하면 처음에 mount될 때랑 count가 업데이트 될 때만 실행!!!
  // []가 없다면 mount&update될 때 모두 실행!!!
  useEffect(() => {
    let a = setTimeout(() => {
      setDiscount(false);
    }, 2000);
    console.log(2);
    // useEffect 동작 전에 실행되는 return () => {} 일명 clean up function이라고 한다.
    // 기존 코드 치우는 것을 보통 여기에 많이 작성함.
    // 재렌더링이 많이 발생하면서 이전의 코드들로 복잡해지는 것을 방지하기 위해서!!!
    // 기존의 것을 깔끔하게 제거하고 실행하고자 할 때!!!
    // clean up function은 mount시 실행안됨, unmount시(Detail 컴포넌트가 삭제되고 다른 페이지로 넘어갈 때) 실행됨!!!
    return () => {
      console.log(1);
      clearTimeout(a); // 타이머 제거해주는 함수임
    };
  }, [count]);

  useEffect(() => {
    console.log(num);
    if (isNaN(num) === true) {
      alert("그러지 마세요");
    }
  }, [num]);

  useEffect(() => {
    let a = setTimeout(() => {
      setFade("end"); // 그냥 setFade("end")를 하면 배치때문에 return에 있는 setFade("")가 하나로 합쳐져서 무시됨
    }, 10); // 참고로 automatic batching 기능은 state변경함수를 여러번 실행할 때마다 재렌더링해주는 것이 아니라, state 변경처리를 다 하고 맨 마지막 것만 재렌더링을 한번만 해주는 것임.

    return () => {
      clearTimeout(a);
      setFade("");
    };
  }, []);

  return (
    <div className={"container start " + fade}>
      {discount === true ? <Discount /> : null}
      <input
        onChange={(e) => {
          setNum(e.target.value);
        }}
      ></input>
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{shoesDetail.title}</h4>
          <p>{shoesDetail.content}</p>
          <p>{shoesDetail.price}</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link onClick={() => setTab(0)} eventKey="link0">
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(1);
            }}
            eventKey="link1"
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(2);
            }}
            eventKey="link2"
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {/* 이런식으로 해도 되지만, 이렇게 하려면 삼항연산자를 넣은 {}를 세개나 만들어야함!
      {
        tab === 0 ? <div>내용0</div> : null
      } */}
      <TabContent tab={tab} shoes={shoes} />
    </div>
  );
};

const Discount = () => {
  return <div className="alert alert-warning">2초이내 구매시 할인</div>;
};

const TabContent = ({ tab, shoes }) => {
  // if문 사용하거나 배열로 바꿔서 사용하거나 둘다 가능!!!
  // if (tab === 0) return <div>내용0</div>;
  // else if (tab === 1) return <div>내용1</div>;
  // else if (tab === 2) return <div>내용2</div>;
  const [fade, setFade] = useState("");

  useEffect(() => {
    let a = setTimeout(() => {
      setFade("end"); // 그냥 setFade("end")를 하면 배치때문에 return에 있는 setFade("")가 하나로 합쳐져서 무시됨
    }, 10); // 참고로 automatic batching 기능은 state변경함수를 여러번 실행할 때마다 재렌더링해주는 것이 아니라, state 변경처리를 다 하고 맨 마지막 것만 재렌더링을 한번만 해주는 것임.

    return () => {
      clearTimeout(a);
      setFade("");
    };
  }, [tab]);

  // 클래스명을 여러개 쓸 때 중간에 띄어쓰기해야 한다는 것 주의!!
  return (
    <div className={"start " + fade}>
      {
        [
          <div>{shoes[0].title}</div>,
          <div>{shoes[1].title}</div>,
          <div>{shoes[2].title}</div>,
        ][tab]
      }
    </div>
  );
};

export default Detail;
