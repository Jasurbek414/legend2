import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import axios from "axios";

function Home() {
  const [itemCategories, setItemCategories] = useState("");
  const [materialCategories, setMaterialCategories] = useState("");
  const [items, setItems] = useState("");
  const [materials, setMaterials] = useState("");

  const [data, setData] = useState([])

  useEffect(() => {
    // Fetch data from the API endpoint
    axios.get("api/home")
      .then((response) => {
        // Assuming the response data has properties like productCategory, materialCategory, productCount, and materialCount
        // setData(response.data)
        // console.log(data);
        setItemCategories(response.data.itemCategories);
        setMaterialCategories(response.data.materialCategories);
        setItems(response.data.items);
        setMaterials(response.data.materials);
        // console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []); // The empty dependency array ensures this effect runs once after the initial render

  return (
    <div className="mt-5 grid sm:grid-cols-2 md:grid-cols-3 gap-3">
      <Col>
        <Card title="Product" bordered={false}>
          Category: {itemCategories}
        </Card>
      </Col>
      <Col>
        <Card title="Material" bordered={false}>
          Category: {materialCategories}
        </Card>
      </Col>
      <Col>
        <Card title="Product" bordered={false}>
          Count: {items}
        </Card>
      </Col>
      <Col>
        <Card title="Material" bordered={false}>
          Count: {materials}
        </Card>
      </Col>
    </div>
  );
}

export default Home;
