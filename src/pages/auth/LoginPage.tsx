import { Col, Checkbox, Input, Row, type CheckboxProps } from "antd";
import "../../styles/auth/loginPage.css";
import ReusableButton from "../../components/ReusableButton";
import { useNavigate } from "react-router";
import { supabase } from "../../utils/supabaseClient";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../provider/AuthProvider";

function LoginPage() {
  const navigate = useNavigate();
  const { session } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onChange: CheckboxProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const handleNavigateToRegister = () => {
    navigate("/register");
  };

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      return;
    }
  };

  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [session, navigate]);

  return (
    <Row className="login-container">
      <Col span={12} className="col-1">
        <div>
          <h1 className="login-title">Welcome back</h1>
          <h3 className="login-subtitle">
            Welcome back! Please enter your details.
          </h3>
        </div>

        <label className="login-email-text">Email</label>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="login-email-input"
        />
        <label className="login-password-text">Password</label>
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          className="login-password-input"
          type="password"
        />
        <div className="login-div-spacer">
          <Checkbox className="login-check-text" onChange={onChange}>
            Remember me
          </Checkbox>
          <label className="login-forgot-text">Forgot password</label>
        </div>

        <ReusableButton
          className="login-btn-style"
          label="Sign in"
          onClickValue={handleLogin}
        />
        <label onClick={handleNavigateToRegister} className="login-signup-text">
          Don’t have an account? <span>Sign up fo free!</span>
        </label>
      </Col>
      <Col span={12} className="col-2" />
    </Row>
  );
}

export default LoginPage;
