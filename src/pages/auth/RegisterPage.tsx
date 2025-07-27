import { Col, Input, Row } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import ReusableButton from "../../components/ReusableButton";
import { useAuth } from "../../provider/AuthProvider";
import "../../styles/auth/registerPage.css";
import { supabase } from "../../utils/supabaseClient";

interface formDataType {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function RegisterPage() {
  const navigate = useNavigate();

  const { session } = useAuth();

  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  const handleSignup = async (formData: formDataType) => {
    const { email, password, confirmPassword, nickname } = formData;

    if (!email || !password || !nickname || !confirmPassword) {
      toast.error("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: nickname,
        },
      },
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    if (data) {
      toast.success("User registered successfully!");
      navigate("/login");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  if (session) {
    navigate("/");
    return;
  }

  return (
    <Row className="register-container">
      <Col span={12} className="col-1">
        <div>
          <h1 className="register-title">Welcome</h1>
          <h3 className="register-subtitle">
            Welcome new user! Please register your details.
          </h3>
        </div>

        <label className="register-email-text">Nickname</label>
        <Input
          name="nickname"
          placeholder="Enter your nickname"
          className="register-email-input"
          value={formData.nickname}
          onChange={handleInputChange}
        />

        <label className="register-email-text">Email</label>
        <Input
          name="email"
          placeholder="Enter your email"
          className="register-email-input"
          value={formData.email}
          onChange={handleInputChange}
        />
        <label className="register-password-text">Password</label>
        <Input
          name="password"
          placeholder="********"
          className="register-password-input"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <label className="register-password-text">Confirm Password</label>
        <Input
          name="confirmPassword"
          placeholder="********"
          className="register-password-input"
          type="password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />

        <ReusableButton
          className="register-btn-style"
          label="Sign up"
          onClickValue={() => handleSignup(formData)}
        />
        <label onClick={handleNavigateToLogin} className="register-signup-text">
          Already have an account? <span>Login Here</span>
        </label>
      </Col>
      <Col span={12} className="col-2" />
    </Row>
  );
}

export default RegisterPage;
