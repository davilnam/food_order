import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveCurrentPath } from "../../actions/actions";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const cartItems = useSelector((state) => state.app.cartItems);
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    tableName: "",
    phoneNumber: "",
    email: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(saveCurrentPath(window.location.pathname));
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic khi người dùng ấn nút Đặt hàng
    console.log("Thông tin khách hàng:", customerInfo);
    console.log("Phương thức thanh toán:", paymentMethod);
    console.log("Giỏ hàng:", cartItems);
    // gọi api thanh toán thành công thì chuyên qua trang cảm ơn và xóa hết sản phẩm trong giỏ hàng
    navigate("/thankYou");
  };

  return (
    <section role="main" className="pb-5">
      <div className="container mt-4">
        <form className="needs-validation" onSubmit={handleSubmit}>
          <input type="hidden" name="kh_tendangnhap" value="dnpcuong" />

          <div className="py-5 text-center">
            <i className="fa fa-credit-card fa-4x" aria-hidden="true"></i>
            <h2>Thanh toán</h2>
            <p className="lead">Vui lòng kiểm tra thông tin Khách hàng, thông tin Giỏ hàng trước khi Đặt hàng.</p>
          </div>

          <div className="row">
            <div className="col-md-4 order-md-2 mb-4">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Giỏ hàng</span>
                <span className="badge badge-secondary badge-pill">{cartItems.length}</span>
              </h4>
              <ul className="list-group mb-3">
                {cartItems.map((item) => (
                  <li key={item.id} className="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                      <h6 className="my-0">{item.title}</h6>
                      <small className="text-muted">Số lượng: {item.quantity}</small>
                    </div>
                    <span className="text-muted">${item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-8 order-md-1">
              <h4 className="mb-3">Thông tin khách hàng</h4>
              <div className="row">
                <div className="col-md-12">
                  <label htmlFor="fullName">Họ tên</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    name="fullName"
                    value={customerInfo.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="tableName">Bàn số</label>
                  <select
                    className="form-control"
                    id="tableName"
                    name="tableName"
                    value={customerInfo.tableName}
                    onChange={handleInputChange}
                    required
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                  </select>
                </div>
                <div className="col-md-12">
                  <label htmlFor="phoneNumber">Điện thoại</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={customerInfo.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <h4 className="mb-3">Hình thức thanh toán</h4>
              <div className="d-block my-3">
                <div className="custom-control custom-radio">
                  <input
                    id="cash"
                    name="paymentMethod"
                    type="radio"
                    className="custom-control-input"
                    value="Tiền mặt"
                    checked={paymentMethod === "Tiền mặt"}
                    onChange={handlePaymentMethodChange}
                    required
                  />
                  <label className="custom-control-label" htmlFor="cash">
                    Tiền mặt
                  </label>
                </div>
                <div className="custom-control custom-radio">
                  <input
                    id="bankTransfer"
                    name="paymentMethod"
                    type="radio"
                    className="custom-control-input"
                    value="Chuyển khoản"
                    checked={paymentMethod === "Chuyển khoản"}
                    onChange={handlePaymentMethodChange}
                    required
                  />
                  <label className="custom-control-label" htmlFor="bankTransfer">
                    Chuyển khoản
                  </label>
                </div>
              </div>
              <hr className="mb-4" />
              {/* Phần tổng tiền và nút đặt hàng */}
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Tổng tiền</span>
                <span className="badge badge-secondary badge-pill">${totalPrice}</span>
              </h4>
              <button className="btn btn-primary btn-lg btn-block" type="submit" name="btnDatHang">
                Đặt hàng
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Payment;
