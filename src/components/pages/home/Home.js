import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import axios from "axios";

function Home() {
  return (
    <div className="mt-5 grid sm:grid-cols-2 md:grid-cols-3 gap-3">
      <Col >
        <Card title="Product" bordered={false}>
          Category soni: 
        </Card>
      </Col>
      <Col >
        <Card title="Material" bordered={false}>
          Category soni: 
        </Card>
      </Col>
      <Col >
        <Card title="Product" bordered={false}>
          Mahsulotlar soni: 
        </Card>
      </Col>
      <Col >
        <Card title="Material" bordered={false}>
          Mahsulotlar soni: 
        </Card>
      </Col>
     
    </div>
  );
}

export default Home;
