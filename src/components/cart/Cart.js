import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../actions/actions";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.app.cartItems);

  const [itemQuantities, setItemQuantities] = useState(
    cartItems.reduce((quantities, item) => {
      quantities[item.id] = item.quantity; // Khởi tạo giá trị ban đầu của số lượng sản phẩm
      return quantities;
    }, {})
  );

  // Cập nhật itemQuantities khi cartItems thay đổi
  useEffect(() => {
    const updatedItemQuantities = cartItems.reduce((quantities, item) => {
      quantities[item.id] = item.quantity;
      return quantities;
    }, {});
    setItemQuantities(updatedItemQuantities);
  }, [cartItems]);

  const totalQuantity = Object.values(itemQuantities).reduce(
    (total, quantity) => total + quantity,
    0
  );
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * itemQuantities[item.id],
    0
  );

  const handleQuantityChange = (id, quantity) => {
    setItemQuantities({ ...itemQuantities, [id]: quantity }); // Cập nhật số lượng sản phẩm
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="container">
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
                  value={itemQuantities[item.id]}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                  min="1"
                  className="form-control"
                />
              </td>
              <td>${item.price * itemQuantities[item.id]}</td>
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
        <p>Tổng số sản phẩm: {totalQuantity}</p>
        <p>Tổng tiền: ${totalPrice}</p>
      </div>
      <div className="text-right pb-5">
        <button className="btn btn-secondary mr-3">
          <Link to="/menu" style={{color: "white"}}>Tiếp tục thêm món ăn</Link>
        </button>
        <button className="btn btn-primary">
          <Link to="/payment" style={{color: "white"}}>Thanh toán</Link>
        </button>
      </div>
    </div>
  );
};

export default Cart;
