import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "reactstrap";
import { useDispatch } from "react-redux";
import { saveCurrentPath } from "../../actions/actions";
import Footer from "../../components/Footer/Footer";
import HeaderCounter from "./HeaderCounter";


const Counter = () => {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();  

  useEffect(() => {
        //   // Replace this with your actual API call to fetch orders
    //   const response = await fetch("https://your-api.com/orders");
    //   const data = await response.json();
    //   setOrders(data);
    // };

    // fetchData();  
    dispatch(saveCurrentPath(window.location.pathname));
  }, [dispatch]);

  return (
    <div>
      <HeaderCounter></HeaderCounter>
      <Container className="mt-4">
        <h2>Orders</h2>
        {orders.map((order) => (
          <Row key={order.tableNumber} className="mb-4">
            <Col>
              <Card>
                <Card.Header>
                  <h3>Table {order.tableNumber}</h3>
                </Card.Header>
                <Card.Body>
                  <ul>
                    {order.items.map((item) => (
                      <li key={item.id}>{item.name}</li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))}
      </Container>
      <Footer></Footer>      
    </div>
  );
};

export default Counter;
