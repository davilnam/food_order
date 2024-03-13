import React, { useState } from "react";
import HeaderAdmin from "../Layout/HeaderAdmin";
import { FaSearch, FaPencilAlt, FaTrash } from "react-icons/fa";
import ModalAddAccount from "./ModalAddAccount";

const AccountManagement = () => {
  const [showAddModal, setShowAddModal] = useState(false);


  const handleAddAccount = () => {

  }

  const toggleAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  const handleAddButtonClick = () => {
    setShowAddModal(true);
  };

  return (
    <div className="content">
      <HeaderAdmin></HeaderAdmin>
      <div className="container-fluid pt-4 px-4">
        <div>
          <h3>Quản lý tài khoản</h3>
          <div className="d-flex align-items-center justify-content-between">
            <ModalAddAccount
              isOpen={showAddModal}
              toggle={toggleAddModal}
              handleSave={handleAddAccount}
            />
            <button
              type="button"
              className="btn btn-primary"
              id="addModalBtn"
              onClick={handleAddButtonClick}
            >
              Thêm mới tài khoản
            </button>
            <form
              id="searchForm"
              className="input-group justify-content-end"
              style={{ width: "40%" }}
            >
              <input
                type="text"
                id="searchInput"
                className="form-control"
                placeholder="Tìm theo tên danh mục"
              />
              <div className="input-group-append">
                <button
                  type="button"
                  id="searchBtn"
                  className="btn btn-primary"
                >
                  <FaSearch />
                </button>
              </div>
            </form>
          </div>
          <hr />
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Email</th>
                <th>Name</th>
                <th>Role</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;
