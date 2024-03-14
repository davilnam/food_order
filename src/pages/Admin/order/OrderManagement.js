import React, { useEffect } from "react";
import { saveCurrentPath } from "../../../actions/actions";
import { useDispatch } from "react-redux";
import HeaderAdmin from "../Layout/HeaderAdmin";
import { FaSearch } from "react-icons/fa";

const OrderManagement = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(saveCurrentPath(window.location.pathname));
  }, [dispatch]);

  return (
    <div className="content">
      <HeaderAdmin></HeaderAdmin>
      <div className="container-fluid pt-4 px-4">
        <div>
          <h3>Quản lý đơn hàng</h3>
          <div className="d-flex align-items-center justify-content-between">
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
                <th>Tên tài khoản</th>
                <th>Ngày đặt</th>
                <th>SĐT (tài khoản)</th>
                <th>Thành tiền</th>
                <th>Trạng Thái</th>
                <th>Cập nhật TT</th>
                <th>Chi tiết</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
