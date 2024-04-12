import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const ImageInput = ({ onChange }) => {
  const [imageSrc, setImageSrc] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
      onChange(file); // Truyền tệp hình ảnh đã chọn ra bên ngoài
    }
  };

  return (
    <FormGroup>
      <Label for="imageInput">Ảnh Sản Phẩm</Label>
      <Input
        type="file"
        name="imageInput"
        id="imageInput"
        onChange={handleImageChange}
        accept="image/*"
      />
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Preview"
          className="preview-image"
          style={{ marginTop: "10px", maxWidth: "100px", maxHeight: "100px" }}
        />
      )}
    </FormGroup>
  );
};

const ModalAddProduct = ({ isOpen, toggle, listCategory, handleSaveFood }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [food, setFood] = useState({
    title: "",
    detail: "",
    material: "",
    price: 0,
    image: "",
    category: "",
  });

  useEffect(() => {
    if (listCategory.length > 0) {
      setSelectedCategory(listCategory[0].name);
      setFood((prevFood) => ({
        ...prevFood,
        category: listCategory[0].name,
      }));
    }
  }, [listCategory]);

  const handleOnChangeInput = (event, key) => {
    const { value } = event.target;
    if (key === "category") {
      setSelectedCategory(value);
      setFood((prevFood) => ({
        ...prevFood,
        category: value, // Cập nhật category trong state của food
      }));
    } else {
      setFood((prevFood) => ({
        ...prevFood,
        [key]: value,
      }));
    }
  };

  const handleImageChange = (file) => {
    // Cập nhật tên tệp hình ảnh vào newFood

    setFood((prevFood) => ({
      ...prevFood,
      image: file,
    }));
  };

  const handleSaveButtonClick = () => {
    handleSaveFood(food);
    toggle();
    setFood({
      title: "",
      detail: "",
      material: "",
      price: 0,
      image: "",
      category: listCategory.length > 0 ? listCategory[0].name : "" // Reset category về giá trị mặc định nếu có danh sách category
    });
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Thêm mới sản phẩm</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="productName">Tên Sản Phẩm</Label>
          <Input
            type="text"
            name="productName"
            id="productName"
            onChange={(event) => handleOnChangeInput(event, "title")}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="productDetail">Chi tiết mô tả</Label>
          <Input
            type="text"
            name="productDetail"
            id="productDetail"
            onChange={(event) => handleOnChangeInput(event, "detail")}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="productMaterial">Chi tiết nguyên liệu</Label>
          <Input
            type="text"
            name="productMaterial"
            id="productMaterial"
            onChange={(event) => handleOnChangeInput(event, "material")}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="productTimeServe">Thời gian phục vụ</Label>
          <Input
            type="number"
            name="productTimeServe"
            id="productTimeServe"
            onChange={(event) => handleOnChangeInput(event, "timeServe")}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="productPrice">Giá Bán</Label>
          <Input
            type="number"
            name="productPrice"
            id="productPrice"
            onChange={(event) => handleOnChangeInput(event, "price")}
            required
          />
        </FormGroup>
        <ImageInput onChange={handleImageChange} />{" "}
        {/* Sử dụng component ImageInput */}
        <FormGroup>
          <Label for="category">Danh Mục</Label>
          <Input
            type="select"
            name="category"
            id="category"
            value={selectedCategory}
            onChange={(event) => handleOnChangeInput(event, "category")}
            required
          >
            {listCategory.map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </Input>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={handleSaveButtonClick}>
          Save
        </Button>
        <Button color="secondary" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalAddProduct;
