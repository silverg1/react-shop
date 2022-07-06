// import { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector  } from 'react-redux';
import { changeName, upCount } from '../store';

function Cart() {
    const cart = useSelector(state => state.cart);
    // const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    return (
        <>
        {/* <button onClick={() => dispatch(changeName())}>이름바꿔달라</button>
        <h4>{user}</h4> */}
        <table className="cart_table">
            <thead>
                <tr>
                <th>#</th>
                <th>상품명</th>
                <th>수량</th>
                <th>변경하기</th>
                </tr>
            </thead>
            <tbody>
                {cart.map((item, i) => {
                    return (
                        <tr key={i}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.count}</td>
                            <td>
                                <button onClick={() => {
                                    dispatch(upCount(item.id));
                                }}>UP</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table> 
        </>
    );
  }

  export default Cart;