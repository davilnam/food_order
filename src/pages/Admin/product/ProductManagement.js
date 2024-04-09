import React, { useState, useEffect } from "react";
import ModalAddProduct from "./ModalAddProduct";
import ModalEditProduct from "./ModalEditProduct";
import ModalDeleteProduct from "./ModalDeleteProduct";
import HeaderAdmin from "../Layout/HeaderAdmin";
import { FaTrash, FaPencilAlt, FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { saveCurrentPath } from "../../../actions/actions";

const ProductManagement = () => {
  const [categories, setCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [food, setFood] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [foodsPerPage] = useState(10);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchFoods();
    dispatch(saveCurrentPath(window.location.pathname));
  }, [dispatch]);

  const fetchFoods = () => {
    fetch("http://localhost:4000/category")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleAddFood = async (food) => {
    console.log(food);
    const formData = new FormData();
    formData.append("title", food.title);
    formData.append("timeShip", "About 30 minutes");
    formData.append("price", food.price);
    formData.append("file", food.image); // Thêm đối tượng File vào FormData
    formData.append("category_name", food.category);
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch("http://localhost:4000/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });
      // Xử lý response ở đây nếu cần
    } catch (error) {
      console.error("Error adding food:", error);
      // Xử lý lỗi ở đây nếu cần
    }
  };

  const handleUpdateFood = async (food) => {
    console.log(food);
    // let file;
    // const formData = new FormData();
    // formData.append('title', food.title);
    // formData.append('timeShip', "About 30 minutes");
    // formData.append('price', food.price);
    // formData.append('category_name', food.category);
    // formData.append('id', food.id);

    // if (food.image instanceof File) {      
    //   formData.append('file', food.image); // Thêm đối tượng File vào FormData
    // }else{
    //   file = new File([""], food.image, { type: "image/jpeg" });
    //   console.log(file);
    //   formData.append('file', file); // Thêm đối tượng File vào FormData
    // }        
    // try {
    //   const accessToken = localStorage.getItem("accessToken");
    //   const response = await fetch(
    //     `http://localhost:4000/category/${food.id}`,
    //     {
    //       method: "PUT",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${accessToken}`,
    //       },
    //       body: formData
    //     }
    //   );
    //   // Xử lý response ở đây nếu cần
    //   fetchFoods()
    // } catch (error) {
    //   console.error("Error updating food:", error);
    //   // Xử lý lỗi ở đây nếu cần
    // }
  };

  const handleDeleteFood = async (foodId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(`http://localhost:4000/category/${foodId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // Xử lý response ở đây nếu cần
    } catch (error) {
      console.error("Error deleting food:", error);
      // Xử lý lỗi ở đây nếu cần
    }
  };

  const handleEditButtonClick = (food) => {
    setShowEditModal(true);
    setFood(food);
  };

  const handleDeleteButtonClick = (food) => {
    setShowDeleteModal(true);
    setFood(food);
  };

  const handleAddButtonClick = () => {
    setShowAddModal(true);
  };

  const toggleAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
  };

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  let allProducts = [];

  categories.forEach((category) => {
    const categoryName = category.name;
    category.foodDTOList.forEach((product) => {
      product.category = categoryName;
      allProducts.push(product);
    });
  });
  // Get current foods
  const indexOfLastFood = currentPage * foodsPerPage;
  const indexOfFirstFood = indexOfLastFood - foodsPerPage;
  const currentFoods = allProducts.slice(indexOfFirstFood, indexOfLastFood);
  let totalPage = allProducts.length / foodsPerPage;
  if (parseInt(totalPage) * foodsPerPage === allProducts.length) {
    totalPage = parseInt(totalPage);
  } else {
    totalPage = parseInt(totalPage) + 1;
  }

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="content">
      <HeaderAdmin />
      <div className="container-fluid pt-4 px-4">
        <div>
          <h3>Quản lý sản phẩm</h3>
          <div className="d-flex align-items-center justify-content-between">
            {/* Add modal */}
            <ModalAddProduct
              isOpen={showAddModal}
              toggle={toggleAddModal}
              listCategory={categories}
              handleSaveFood={handleAddFood}
            />
            <button
              type="button"
              className="btn btn-primary"
              id="addModalBtn"
              onClick={handleAddButtonClick}
            >
              Thêm mới sản phẩm
            </button>
            {/* Search form */}
            <form
              id="searchForm"
              className="input-group justify-content-end"
              style={{ width: "40%" }}
            >
              <input
                type="text"
                id="searchInput"
                className="form-control"
                placeholder="Tìm theo tên sản phẩm"
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
          {/* Table of foods */}
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Hình ảnh</th>
                <th>Tên SP</th>
                <th>Danh Mục</th>
                <th>Đơn giá</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentFoods.map((food, index) => (
                <tr key={index}>
                  <td>{food.id}</td>
                  <td>
                    <img
                      src={require(`../../../assets/images/${food.image}`)}
                      alt={food.title}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "contain",
                      }}
                    />
                  </td>
                  <td>{food.title}</td>
                  <td>{food.category}</td>
                  {/* Sử dụng thuộc tính category đã được thiết lập */}
                  <td>{food.price}</td>
                  <td>
                    {/* Edit button */}
                    <button
                      className="btn btn-primary editModalBtn"
                      onClick={() =>
                        handleEditButtonClick({
                          ...food,
                          category_name: food.category,
                          listCategory: categories,
                        })
                      }
                    >
                      <FaPencilAlt />
                    </button>
                    {/* Delete button */}
                    <button
                      className="btn btn-danger deleteModalBtn"
                      onClick={() =>
                        handleDeleteButtonClick({
                          ...food,
                          category_name: food.category,
                          listCategory: categories,
                        })
                      }
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <nav>
            <ul className="pagination">
              {[...Array(totalPage)].map((_, pageNumber) => (
                <li key={pageNumber} className="page-item">
                  <button
                    onClick={() => paginate(pageNumber + 1)}
                    className="page-link"
                  >
                    {pageNumber + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      {/* Modals */}
      {showEditModal && (
        <ModalEditProduct
          isOpen={showEditModal}
          toggle={toggleEditModal}
          food={food}
          listCategory={categories}
          handleUpdateFood={handleUpdateFood}
        />
      )}
      {showDeleteModal && (
        <ModalDeleteProduct
          isOpen={showDeleteModal}
          toggle={toggleDeleteModal}
          foodId={food.id}
          handleDeleteFood={handleDeleteFood}
        />
      )}
    </div>
  );
};

export default ProductManagement;
