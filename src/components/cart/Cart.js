import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  saveCurrentPath,
  updateCartItemQuantity,
  orderItems,
} from "../../actions/actions";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.app.cartItems);
  const user = useSelector((state) => state.app.user);
  const cartItemsOrder = useSelector((state) => state.app.cartItemsOrder);
  console.log(cartItems);
  console.log(cartItemsOrder);

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

  const fetchOrders = async (cartItems) => {
    const reducedArray = cartItems.map(item => {
      return {
        foodID: item.id,
        number: item.quantity
      };
    });
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:4000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: user.userId, orderItemDTOList: reducedArray })
      });
      if (!response.ok) {
        throw new Error("Failed to add category");
      }      
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleOrder = () => {
    fetchOrders(cartItems);
    dispatch(orderItems());
  };

  return (
    <div className="container">
      <div className="row">
        {cartItemsOrder && cartItemsOrder.length > 0 ? (
          <div>
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
                        src={require(`../../assets/images/${item.image}`)}
                        alt={item.title}
                        className="img-fluid"
                        style={{ maxWidth: "100px" }}
                      />
                    </td>
                    <td>{item.title}</td>
                    <td>${item.price}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-between">
              <p>Tổng số sản phẩm: {totalQuantityOrder}</p>
              <p>Tổng tiền: ${totalPriceOrder}</p>
            </div>
          </div>
        ) : (
          <div className="mt-3">Không có món hàng nào được đặt.</div>
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
                    src={require(`../../assets/images/${item.image}`)}
                    alt={item.name}
                    className="img-fluid"
                    style={{ maxWidth: "100px" }}
                  />
                </td>
                <td>{item.title}</td>
                <td>${item.price}</td>
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
          <p>Tổng tiền: ${totalPriceCart}</p>
        </div>
      </div>

      <div className="text-right pb-5">
        <button className="btn btn-secondary mr-3">
          <Link to="/menu" style={{ color: "white" }}>
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
          <Link to="/payment" style={{ color: "white" }}>
            Thanh toán
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Cart;
