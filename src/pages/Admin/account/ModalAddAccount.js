import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const ModalAddAccount = ({ isOpen, toggle }) => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

  const handleSubmit = (event) => {
    // Handle form submission
    event.preventDefault();
    // Your logic here to handle form submission
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Thêm mới tài khoản</ModalHeader>
      <ModalBody>
        <Form id="addProductForm" onSubmit={handleSubmit}>
          <h3 className="mb-4">Tạo tài khoản</h3>

          <FormGroup>
            <Label for="tenTaiKhoan">Tên tài khoản</Label>
            <Input type="text" id="tenTaiKhoan" name="tenTaiKhoan" required />
          </FormGroup>

          <FormGroup>
            <Label for="matKhau">Mật khẩu</Label>
            <Input type="password" id="matKhau" name="matKhau" />
          </FormGroup>

          <FormGroup>
            <Label for="hoVaTen">Họ và tên</Label>
            <Input type="text" id="hoVaTen" name="hoVaTen" />
          </FormGroup>

          {/* <FormGroup>
            <Label for="role">Danh Mục</Label>
            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
              <DropdownToggle caret>
                Chọn quyền
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Admin</DropdownItem>
                <DropdownItem>User</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </FormGroup> */}

          <ModalFooter>
            <Button type="submit" color="success">Save</Button>{' '}
            <Button color="secondary" onClick={toggle}>Close</Button>
          </ModalFooter>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default ModalAddAccount;
