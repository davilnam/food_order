import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveCurrentPath } from "../../actions/actions";
import Footer from "../../components/Footer/Footer";
import HeaderCounter from "./HeaderCounter";
import { Container, Row, Col, Link } from "reactstrap";


const Counter = () => {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchOrders();
    dispatch(saveCurrentPath(window.location.pathname));
  }, [dispatch]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:4000/counter");
      const data = await response.json();
      if (data.success) {
        setOrders(data.data);
      } else {
        console.error("Error fetching orders:", data.desc);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div>
      <HeaderCounter />
      <Container>
        <h2 className="mt-4">Orders</h2>
        {orders.map((order) => (
          <div key={order.id} className="mb-4">
            <h3>Chi tiết đơn hàng #{order.id}</h3>
            <Row>
              <Col md="6">
                <div className="mb-4">
                  <h5 className="card-title">Thông tin đơn hàng</h5>
                  <table className="table">
                    <tbody>
                      <tr>
                        <td><strong>Vị trí bàn:</strong></td>
                        <td>{order.userName}</td>
                      </tr>
                      <tr>
                        <td><strong>Ngày đặt:</strong></td>
                        <td>{new Date(order.time).toLocaleDateString()}</td>
                      </tr>
                      <tr>
                        <td><strong>Giá trị hóa đơn:</strong></td>
                        <td>${order.totalPrice.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td><strong>Trạng thái:</strong></td>
                        <td>{order.status ? "Đã phục vụ" : "Chưa phục vụ"}</td>
                      </tr>
                      <tr>
                        <td><strong>Thanh toán:</strong></td>
                        <td>{order.is_pay ? "Đã thanh toán" : "Chưa thanh toán"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Col>
              <Col md="6">
                <h5>Chi tiết sản phẩm</h5>
                {order.detailResponeList.map((item, index) => (
                  <div key={index} className="mb-3">
                    <Row>
                      <Col xs="12" md="4" className="mb-3 mb-md-0">
                        <img
                          src={require(`../../assets/images/${item.image}`)}
                          alt={item.foodName}
                          className="img-fluid"
                        />
                      </Col>
                      <Col xs="12" md="8">
                        <p>
                          <strong>Tên sản phẩm:</strong> {item.foodName}
                        </p>
                        <p>
                          <strong>Số lượng:</strong> {item.quanity}
                        </p>
                      </Col>
                    </Row>
                  </div>
                ))}
              </Col>
              <button className="btn btn-secondary">Phê duyệt</button>
            </Row>
          </div>
        ))}        
      </Container>

      <Footer />
    </div>
  );
};

export default Counter;
