import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  saveCurrentPath,
  updateCartItemQuantity,
  orderItems,
  addOrderId
} from "../../actions/actions";
import { Link } from "react-router-dom";
import { scrollToElement } from '../../scrollUtils';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.app.cartItems);
  let user = useSelector((state) => state.app.user);      
  const cartItemsOrder = useSelector((state) => state.app.cartItemsOrder);
  

  const [itemQuantitiesCart, setItemQuantitiesCart] = useState({});
  const [itemQuantitiesOrder, setItemQuantitiesOrder] = useState({});
  const [totalPriceCart, setTotalPriceCart] = useState(0);
  const [totalPriceOrder, setTotalPriceOrder] = useState(0);  
  useEffect(() => {
    const updatedItemQuantitiesCart = cartItems.reduce((quantities, item) => {
      quantities[item.id] = item.quantity;
      return quantities;
      
    }, {});
    setItemQuantitiesCart(updatedItemQuantitiesCart);
    document.title = 'Giỏ hàng';
    const updatedItemQuantitiesOrder = cartItemsOrder.reduce(
      (quantities, item) => {
        quantities[item.id] = item.quantity;
        return quantities;
      },
      {}
    );
    setItemQuantitiesOrder(updatedItemQuantitiesOrder);

    const updatedTotalPriceCart = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalPriceCart(updatedTotalPriceCart);

    const updatedTotalPriceOrder = cartItemsOrder.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalPriceOrder(updatedTotalPriceOrder);

    dispatch(saveCurrentPath(window.location.pathname));
    setTimeout(() => {
      scrollToElement('scrollTarget');
    });
  }, [cartItems, cartItemsOrder, dispatch]);

  const totalQuantityCart = Object.values(itemQuantitiesCart).reduce(
    (total, quantity) => total + quantity,
    0
  );

  const totalQuantityOrder = Object.values(itemQuantitiesOrder).reduce(
    (total, quantity) => total + quantity,
    0
  );

  const handleQuantityChange = (id, quantity) => {
    setItemQuantitiesCart({ ...itemQuantitiesCart, [id]: quantity });
    dispatch(updateCartItemQuantity(id, quantity));

    const updatedTotalPriceCart = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalPriceCart(updatedTotalPriceCart);
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };


  const staticUrl = process.env.REACT_APP_API_URL_IMAGE;
  const app_api_url = process.env.REACT_APP_API_URL;
  const fetchOrders = async (cartItems) => {    
    const reducedArray = cartItems.map(item => {
      return {
        foodID: item.id,
        number: item.quantity
      };
    });
    try {
      const token = localStorage.getItem("accessToken");
      const url = app_api_url + "/api/order/add";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user.userId, orderItemDTOList: reducedArray })
      });      
      const data = await response.json();
      console.log(data);
      if (data.success) {        
        dispatch(addOrderId(data.id));        
      } else {
        throw new Error("Failed to add order");
      }        
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleOrder = () => {
    fetchOrders(cartItems);    
    dispatch(orderItems());    
  };

  const formatPriceToVND = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="container">
      <div id="scrollTarget" className="row">
        {cartItemsOrder && cartItemsOrder.length > 0 ? (
          <div >
            <h2>Danh sách các món đã đặt hàng</h2>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Hình ảnh</th>
                  <th scope="col">Tên sản phẩm</th>
                  <th scope="col">Giá</th>
                  <th scope="col">Số lượng</th>
                  <th scope="col">Tổng cộng</th>
                </tr>
              </thead>
              <tbody>
                {cartItemsOrder.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={`${staticUrl}/${item.image}`}
                        alt={item.title}
                        className="img-fluid"
                        style={{ maxWidth: "100px" }}
                      />
                    </td>
                    <td>{item.title}</td>
                    <td>{formatPriceToVND(item.price)}</td>
                    <td>{item.quantity}</td>
                    <td>{formatPriceToVND(item.price * item.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-between">
              <p>Tổng số sản phẩm: {totalQuantityOrder}</p>
              <p>Tổng tiền: {formatPriceToVND(totalPriceOrder)}</p>
            </div>
          </div>
        ) : (
          <div className="mt-3">Không có món nào đã được đặt.</div>
        )}
      </div>

      <div className="row">
        <h1 className="my-4">Danh sách sản phẩm</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Hình ảnh</th>
              <th scope="col">Tên sản phẩm</th>
              <th scope="col">Giá</th>
              <th scope="col">Số lượng</th>
              <th scope="col">Tổng cộng</th>
              <th scope="col">Tùy chọn</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={`${staticUrl}/${item.image}`}
                    alt={item.name}
                    className="img-fluid"
                    style={{ maxWidth: "100px" }}
                  />
                </td>
                <td>{item.title}</td>
                <td>{formatPriceToVND(item.price)}</td>
                <td>
                  <input
                    type="number"
                    value={itemQuantitiesCart[item.id]}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value))
                    }
                    min="1"
                    className="form-control"
                  />
                </td>
                <td>${item.price * itemQuantitiesCart[item.id]}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-between">
          <p>Tổng số sản phẩm: {totalQuantityCart}</p>
          <p>Tổng tiền: {formatPriceToVND(totalPriceCart)}</p>
        </div>
      </div>

      <div className="text-right pb-5">
        <button className="btn btn-secondary mr-3">
          <Link to="/menu-page" style={{ color: "white" }}>
            Tiếp tục thêm món ăn
          </Link>
        </button>
        <button
          className="btn btn-primary mr-3"
          style={{ color: "white" }}
          onClick={handleOrder}
        >
          Đặt món
        </button>
        <button className="btn btn-primary">
          <Link to="/get-pay-page" style={{ color: "white" }}>
            Thanh toán
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Cart;
