import { useEffect, useState } from 'react';
import './App.scss';
import shoesData from './data';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import Detail from './pages/Detail';
import Cart from './pages/Cart';

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
  }, [inputText]);

  useEffect(() => {
    if(!localStorage.getItem('watched')) {
      localStorage.setItem('watched', JSON.stringify([]));
    }
  }, []);

  return (
    <div className="App">
      <div className="header">
        <h1>ShoeShop</h1>
        <div className="nav">
          <Link to="/">Home</Link>
          <Link to="/detail">Detail</Link>
          <Link to="/event">Event</Link>
          <Link to="/cart">Cart</Link>
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
        <Route path="/cart" element={<Cart/>}/>
      </Routes>

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
