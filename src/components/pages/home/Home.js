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
  }, []);

  return (
    <div className="mt-5 grid sm:grid-cols-2 md:grid-cols-3 gap-3">
      <Col className="">
        <Card className="bg-slate-800 text-white" title={<h2 className="text-white">Product category</h2>}  bordered={false}>
          Category: {itemCategories}
        </Card>
      </Col>  
      <Col>
        <Card className="bg-slate-800 text-white" title={<h2 className="text-white">Material category</h2>} bordered={false}>
          Category: {materialCategories}
        </Card>
      </Col>
      <Col>
        <Card className="bg-slate-800 text-white" title={<h2 className="text-white">Product items</h2>} bordered={false}>
          Count: {items}
        </Card>
      </Col>
      <Col>
        <Card className="bg-slate-800 text-white" title={<h2 className="text-white">Material items</h2>} bordered={false}>
          Count: {materials}
        </Card>
      </Col>
    </div>
  );
}

export default Home;
