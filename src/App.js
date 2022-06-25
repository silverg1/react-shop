import { useEffect, useState } from 'react';
import './App.scss';
import shoesData from './data';
import { Routes, Route, Link, useNavigate, Outlet, useParams } from 'react-router-dom';
import axios from 'axios';

function App() {
  let navi = useNavigate();

  let [shoes, setShoes] = useState(shoesData);
  let [inputText, setInputText] = useState('');
  let [viewMoreBtn, setViewMoreBtn] = useState(true);
  let [clickNum, setClickNum] = useState(0);

  useEffect(() => {
    if(isNaN(inputText)) {
      alert("숫자만 입력하시오");
      setInputText('');
    }
  }, [inputText])
  

  return (
    <div className="App">
      <div className="header">
        <h1>ShoeShop</h1>
        <div className="nav">
          <Link to="/">Home</Link>
          <Link to="/detail">Detail</Link>
          <Link to="/event">Event</Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={
          <>
            <div className="main-bg"/>
            <input type="text" className="input-box" value={inputText} onChange={(e) => setInputText(e.target.value)}/>
            <div className="prod_list">
              {shoes.map((item, idx) => {
                return (
                  <div className="item" key={idx} onClick={() => navi(`/detail/${item.id}`)}>
                    <img src={item.img} alt=""/>
                    <p>{item.title}</p>
                    <p>{item.price}</p>
                  </div>
                );
              })}
            </div>
            {viewMoreBtn && 
            <button className="btn_more" onClick={() => {
              // (pre-increment) 결과값 바로 반영
              // (post-increment) 원래값을 기억, 후에 반영
              setClickNum(++clickNum);

              let jsonURL = `https://codingapple1.github.io/shop/data${clickNum+1}.json`;

              axios.get(jsonURL).then((result) => {

                // let cloneShoes = [...shoes];

                // 결과데이터를 배열에 어떻게 추가할 것인가

                // 1. 전체가 통으로 추가됨
                // cloneShoes.push([...result.data]); 

                // 2. 객체의 인덱스값이 추가됨
                // for(let d in result.data) cloneShoes.push(d);

                // 3. for of로 성공!
                // for(let d of result.data) cloneShoes.push(d);

                // 4. 같이 넣으면 되는 거였다.
                let cloneShoes = [...shoes, ...result.data];

                setShoes(cloneShoes);

                if(clickNum >= 2) setTimeout(() => setViewMoreBtn(false), 400);

              }).catch(() => console.log('실패함'));
            }}>More</button>
            }
          </>
        }/>
        <Route path="/detail/:id" element={<Detail shoes={shoes}/>}/>
        <Route path="/event" element={<Event/>}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>}/>
          <Route path="two" element={<div>생일기념 쿠폰받기</div>}/>
        </Route>
      </Routes>

    </div>
  );
}

function Detail(props) {
  let navi = useNavigate();
  let {id} = useParams();
  // 데이터의 id값과 파라미터 값이 동일하도록 찾기
  // (순서가 바뀌어도 같은 상품 나오도록)
  let currentItem = props.shoes.find(i => i.id == id);

  let [viewBox, setViewBox] = useState(false);
  let [tab, setTab] = useState(0);
  let [showPage, setShow] = useState(false);

  // useEffect(() => {
  //   let hideBox = setTimeout(() => setViewBox(false), 2000);
  //   return () => clearTimeout(hideBox);
  // }, []);

  useEffect(() => setShow(true), []);

  return (
    <div className={`detail_page ${showPage ? 'show' : ''}`}>
      <button className="btn_back" onClick={() => navi(-1)}>뒤로</button>
      {viewBox && <div className="yellow-box">2초 후 사라질 박스</div>}
      <div className="item-d">
        <img src={currentItem.img} alt=""/>
        <h3>{currentItem.title}</h3>
        <p>{currentItem.content}</p>
        <p>{currentItem.price}</p>
      </div>
      <div className="tab-box">
        <div className="tabs">
          <div className={`tab ${tab === 0 ? 'on' : ''}`} onClick={() => setTab(0)}>탭A</div>
          <div className={`tab ${tab === 1 ? 'on' : ''}`} onClick={() => setTab(1)}>탭B</div>
          <div className={`tab ${tab === 2 ? 'on' : ''}`} onClick={() => setTab(2)}>탭C</div>
        </div>
        { 
        tab === 0 ? <div className="box">내용1</div>
        : tab === 1 ? <div className="box">내용2</div>
        : <div className="box">내용3</div> 
        }
      </div>
    </div>
  );
}

function Event() {
  return (
    <>
    <div>오느르 이벤트</div>
    <Outlet></Outlet>
    </>
  );
} 

export default App;
