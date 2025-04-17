/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import {
  Row,
  Col,
  Layout as AntdLayout,
  Card,
  Typography,
  Form,
  Input,
  Button,
  Checkbox,
} from "antd";
import "./styles.css";
import { Link } from "react-router-dom";

const { Text, Title } = Typography;

export const Register = () => {

  const CardTitle = (
    <Title level={3} className="title">
      Create your account
    </Title>
  );

  return (
    <AntdLayout className="layout">
      <Row
        justify="center"
        align="middle"
        style={{
          height: "100vh",
        }}
      >
        <Col xs={22}>
          <div className="container">
            <Card title={CardTitle} headStyle={{ borderBottom: 0 }}>
              <Form
                layout="vertical"
                requiredMark={false}
                initialValues={{
                  remember: false,
                }}
              > 
                <Form.Item
                  name="fullname"
                  label="Fullname"
                  rules={[{ required: true }]}
                >
                  <Input size="large" placeholder="Fullname" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true }]}
                >
                  <Input size="large" placeholder="Email" />
                </Form.Item>

                <Form.Item
                  name="cell"
                  label="Cell"
                  rules={[{ required: true }]}
                >
                  <Input size="large" placeholder="Cell" />
                </Form.Item>

                <Form.Item
                  name="username"
                  label="Username"
                  rules={[{ required: true }]}
                >
                  <Input size="large" placeholder="Username" />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[{ required: true }]}
                  style={{ marginBottom: "12px" }}
                >
                  <Input type="password" placeholder="●●●●●●●●" size="large" />
                </Form.Item>

                <div style={{ marginBottom: "12px" }}>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox
                      style={{
                        fontSize: "12px",
                      }}
                    >
                      I accept the Terms of Use and Privacy Policy.
                    </Checkbox>
                  </Form.Item>
                </div>
                <Button type="primary" size="large" htmlType="submit" block>
                  Register
                </Button>
              </Form>
              <div style={{ marginTop: 8 }}>
                <Text style={{ fontSize: 12 }}>
                  Already have an account?{" "}
                  <Link to="/" style={{ fontWeight: "bold" }}>
                    Sign in
                  </Link>
                </Text>
              </div>
            </Card>
          </div>
        </Col>
      </Row>
    </AntdLayout>
  );
};


export default Register;