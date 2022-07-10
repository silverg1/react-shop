import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch  } from 'react-redux';
import { addItem } from '../store';

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
    useEffect(() => {
      let watched = JSON.parse(localStorage.getItem('watched'));
      watched.push(id);
      watched = new Set(watched);
      watched = Array.from(watched);
      localStorage.setItem('watched', JSON.stringify(watched));
    }, []);
  
    const dispatch = useDispatch();

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
        <button className="btn_order" onClick={() => {
          dispatch(addItem({id: id, name: currentItem.title, count: 1}));
        }}>주문하기</button>
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

  export default Detail;