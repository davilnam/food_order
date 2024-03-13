import React from "react";
import { useSelector } from "react-redux";

const Payment = () => {
  const cartItems = useSelector((state) => state.app.cartItems);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <section role="main" className="pb-5">
      <div className="container mt-4">
        <form className="needs-validation" name="frmthanhtoan" method="post" action="#">
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
              {/* Form thông tin khách hàng sẽ được thêm vào đây */}
              <div class="row">
                            <div class="col-md-12">
                                <label for="kh_ten">Họ tên</label>
                                <input type="text" class="form-control" name="kh_ten" id="kh_ten"
                                    value="" readonly="" />
                            </div>                            
                            <div class="col-md-12">
                                <label for="kh_diachi">Bàn số</label>
                                <select class="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                </select>                               
                            </div>
                            <div class="col-md-12">
                                <label for="kh_dienthoai">Điện thoại</label>
                                <input type="text" class="form-control" name="kh_dienthoai" id="kh_dienthoai"
                                    value="" readonly="" />
                            </div>
                            <div class="col-md-12">
                                <label for="kh_email">Email</label>
                                <input type="text" class="form-control" name="kh_email" id="kh_email"
                                    value="" readonly="" />
                            </div>                                                        
                        </div>

              <h4 className="mb-3">Hình thức thanh toán</h4>
              <div className="d-block my-3">
                <div className="custom-control custom-radio">
                  <input id="httt-1" name="httt_ma" type="radio" className="custom-control-input" required="" value="1" />
                  <label className="custom-control-label" htmlFor="httt-1">Tiền mặt</label>
                </div>
                <div className="custom-control custom-radio">
                  <input id="httt-2" name="httt_ma" type="radio" className="custom-control-input" required="" value="2" />
                  <label className="custom-control-label" htmlFor="httt-2">Chuyển khoản</label>
                </div>
              </div>
              <hr className="mb-4" />
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Tổng tiền</span>
                <span className="badge badge-secondary badge-pill">${totalPrice}</span>
              </h4>
              <button className="btn btn-primary btn-lg btn-block" type="submit" name="btnDatHang">Đặt hàng</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Payment;
