import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Input } from "antd";
import { UserOutlined, LockOutlined, GroupOutlined } from "@ant-design/icons";

export const Admins = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [adminRole, setAdminRole] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const role = sessionStorage.getItem("role");

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    handleSubmit();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("api/users");
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`api/users/${id}`);
      setData(data.filter((ADMIN) => ADMIN.id !== id));
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("api/users", {
        username: adminName,
        role: adminRole,
        password: adminPassword,
      });
      setData([...data, response.data]);
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <Button
        hidden={role !== "ADMIN"}
        className="bg-blue-500"
        type="primary"
        onClick={showModal}
      >
        Add Admin
      </Button>
      <Modal
        title="Add New Admin"
        open={isModalOpen}
        onOk={handleOk}
        okButtonProps={{ className: "bg-blue-500" }}
        onCancel={handleCancel}
      >
        <p className="mt-2">Admin name</p>
        <Input
          size="large"
          placeholder="Username"
          prefix={<UserOutlined />}
          value={adminName}
          onChange={(e) => setAdminName(e.target.value)}
        />

        <p className="mt-4">Role (darajasi)</p>
        <Input
          size="large"
          placeholder="Role"
          prefix={<GroupOutlined />}
          value={adminRole}
          onChange={(e) => setAdminRole(e.target.value)}
        />

        <p className="mt-4">Password</p>
        <Input
          size="large"
          placeholder="Password"
          prefix={<LockOutlined />}
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
        />
      </Modal>

      <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-hidden border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                    ID
                  </th>
                  <th className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">
                    Role
                  </th>
                  {/* <th className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase">
                    Delete
                  </th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((admin) => (
                  <tr key={admin.id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                      {admin.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {admin.username}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      {admin.role}
                    </td>
                    {/* <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(admin.id)}
                      >
                        Delete
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admins;
