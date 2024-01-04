import React, { useEffect, useState } from "react";
import { Table, Button, message, Modal, Form, Input, Select } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Addtablep = () => {
  // const [bottom, setBottom] = useState("bottomRight");
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [nomi, setNomi] = useState([]);
  const myId = sessionStorage.getItem("myId");
  const [nomiId, setNomiId] = useState(null);
  const [miqdori, setMiqdori] = useState("");
  const [description, setDescription] = useState("");

  const [searchValue, setSearchValue] = useState("")
  const { Search } = Input;
  const [qidir, setQidir ] = useState([])

  const sendData = {
    itemType: nomiId,
    description: description,
    quantity: parseInt(miqdori),
    adminId: parseInt(myId),
    categoryId: parseInt(id),
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    add();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  const qidirData = async (inputValue) => {
    try {
      const response = await axios.get(`api/item/search?name=${inputValue}`);
      setQidir(response.data?.data);
      // setMaterial(response.data);
  
      // console.log(response.data?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
    useEffect(() => {
      qidirData();
    }, []);

  async function fetchData() {
    try {
      const response = await axios.get(`api/item/category/${id}`);
      setData(response.data.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: "N0 ",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Nomi",
      dataIndex: "name",
      key: "name",
      render: (item, row) => {
        // console.log(row);
        return <span>{row?.itemType?.name}</span>;
      },
    },
    {
      title: "Admin",
      dataIndex: "admin",
      key: "admin",
      render: (item, row) => {
        return <span>{row?.userDto?.username}</span>;
      },
    },
    {
      title: "Tafsiloti",
      dataIndex: "description",
      key: "admin",
      render: (item, row) => {
        return <span>{row?.description}</span>;
      },
    },
    {
      title: "Vaqti",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (item, row) => {
        return (
          <span>
            {row?.createdAt.slice(0, 10) + ", " + row.createdAt.slice(11, 16)}
          </span>
        );
      },
    },

    {
      title: "Miqdori",
      dataIndex: "quantity",
      key: "quantity",
      render: (item, row) => {
        return <span>{row?.quantity}</span>;
      },
    },
  ];

  // product data bu modalda optionlarga get qilib map qilingan malumotlarni
  useEffect(() => {
    const productData = async () => {
      try {
        const response = await axios.get("api/item-type");
        setNomi(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    productData();
  }, []);

  async function add() {
    axios
      .post("api/item", sendData)
      .then((response) => {
        fetchData();
        // console.log("Yuborish muvaffaqiyatli amalga oshirildi:", response.data);
      })
      .catch((error) => {
        console.error("Xatolik yuz berdi:", error);
      });
  }

  return (
    <div>
      <div className="flex justify-between">
        <Button onClick={() => navigate(-1)}>Orqaga</Button>

        <Search
         
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          // onSearch={onSearch}
          onChange={(e) => qidirData(e.target.value)}
          className="w-[500px] bg-blue-500 rounded-md"
        />

        <Button className="bg-blue-500" type="primary" onClick={showModal}>
          Qo'shish
        </Button>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          okButtonProps={{ className: "bg-blue-500" }}
          onCancel={handleCancel}
        >
          <div className="w-full flex flex-col gap-4">
            <div className="w-full"></div>
            <Select
              className="w-full"
              placeholder="Mahsulot"
              onChange={(e) => setNomiId(e)}
            >
              {nomi.map((item, idx) => {
                return (
                  <Select.Option key={idx} value={item?.id}>
                    {item?.name}
                  </Select.Option>
                );
              })}
            </Select>
            <Input
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />

            <Input
              placeholder="Miqdori"
              type="number"
              onChange={(e) => setMiqdori(e.target.value)}
            />
          </div>
        </Modal>
      </div>
      <Table
        className="mt-5"
        columns={columns}
        rowKey={"id"}
        onChange={(page) => setCurrent(page.current)}
        dataSource={qidir?.length > 0 ? qidir : data}
        pagination={false}
      />
    </div>
  );
};

export default Addtablep;
