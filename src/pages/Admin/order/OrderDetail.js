import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "reactstrap";

const OrderDetail = () => {
  const { orderId } = useParams();
  const [orderDetail, setOrderDetail] = useState(null);

  useEffect(() => {
    // Gọi API để lấy chi tiết đơn hàng dựa trên orderId
    fetchOrderDetail(orderId);
  }, [orderId]);

  const fetchOrderDetail = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/get-detail/${orderId}`
      );
      const data = await response.json();
      if (data.success) {
        setOrderDetail(data.data);
      } else {
        console.error("Error fetching order detail:", data.desc);
      }
    } catch (error) {
      console.error("Error fetching order detail:", error);
    }
  };

  if (!orderDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content">
      <Container>
        <h2 className="mt-4">Chi tiết đơn hàng #{orderId}</h2>
        <Row>
          <Col md="6">
            <div body className="mb-4">
              <h5 className="card-title">Thông tin đơn hàng</h5>
              <p className="card-text">
                <strong>Tên bàn:</strong> {orderDetail.userName}
              </p>
              <p className="card-text">
                <strong>Ngày đặt:</strong>{" "}
                {new Date(orderDetail.time).toLocaleDateString()}
              </p>
              <p className="card-text">
                <strong>Tổng giá:</strong> ${orderDetail.totalPrice.toFixed(2)}
              </p>
              <p className="card-text">
                <strong>Trạng thái:</strong>{" "}
                {orderDetail.status ? "Đã xử lý" : "Chưa xử lý"}
              </p>
              <p className="card-text">
                <strong>Thanh toán:</strong>{" "}
                {orderDetail.is_pay ? "Đã thanh toán" : "Chưa thanh toán"}
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <h5>Chi tiết sản phẩm</h5>
            {orderDetail.detailResponeList.map((item, index) => (
              <div key={index} body className="mb-3">
                <Row>
                  <Col xs="12" md="4" className="mb-3 mb-md-0">
                    <img
                      src={require(`../../../assets/images/${item.image}`)}
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
        </Row>
      </Container>
    </div>
  );
};

export default OrderDetail;
