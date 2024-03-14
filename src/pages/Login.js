import React, { useState } from "react";
import { NavLink, useNavigate  } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../actions/actions";
import "../styles/css/login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Sửa đổi tại đây
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    // const remember = formData.get("remember");
    console.log({email, password})

    try {
      const response = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password          
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data = await response.json();
      let check = false;
      if (data.desc === "[SUPERADMIN]") {
        check = true;
      }       
      // Cập nhật reducer và localStorage
      dispatch(loginSuccess({title: data.title, check: check})); // Cập nhật thông tin người dùng
      localStorage.setItem("accessToken", data.data); // Lưu accessToken vào localStorage

      // Điều hướng người dùng đến trang phù hợp dựa vào desc
      if (data.desc === "[SUPERADMIN]") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <section className="ftco-section">
      <div className="container">
        <div className="row">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card shadow-2-strong"
                style={{ borderRadius: "1rem" }}
              >
                <form onSubmit={handleSubmit}>
                  <div className="card-body p-5 text-center">
                    <h3 className="mb-5">Đăng nhập</h3>

                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="form-control form-control-lg"
                      />
                    </div>

                    <div className="form-outline mb-4" id="show_hide_password">
                      <input
                        type={passwordVisible ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        className="form-control form-control-lg"
                      />
                      <div className="input-group-addon">
                        <span onClick={togglePasswordVisibility}>
                          {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                    </div>

                    <div className="form-check d-flex justify-content-start mb-4">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        name="remember"
                        id="form1Example3"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="form1Example3"
                      >
                        Nhớ mật khẩu
                      </label>
                    </div>
                    <div>
                      <button
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        style={{ width: "100%" }}
                        type="submit"
                      >
                        Đăng nhập
                      </button>
                    </div>

                    <div className="mt-4">
                      Chưa có tài khoản?
                      <NavLink
                        to="/register"
                        className={({ isActive }) => {
                          const activeClass = isActive ? "activeHome" : "";
                          return `${activeClass}`;
                        }}
                      >
                        Đăng ký
                      </NavLink>
                    </div>
                    <div className="signup_link">
                      Quên mật khẩu?
                      <NavLink to="/forgotPassword">Lấy lại mật khẩu</NavLink>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
