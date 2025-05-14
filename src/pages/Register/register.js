/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import { apiCalls } from "../../hook/apiCall.js";

const { Text, Title } = Typography;

export const Register = () => {
  const [companyName, setCompanyName]= useState('');
  const [email, setEmail]= useState('');

  const CardTitle = (
    <Title level={3} className="title">
      Create your account
    </Title>
  );

  const onRegister = async() => {
    const body= JSON.stringify( {
      name:companyName,
      email:email
    });
    const data=await apiCalls('POST','company',null,body);
    console.log("register",data)
  }

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
                  name="businessname"
                  label="Business Name"
                  rules={[{ required: true }]}
                >
                  <Input size="large" placeholder="Business Name" onChange={(e) => setCompanyName(e.target.value)} />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true }]}
                >
                  <Input size="large" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
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
                <Button type="primary" size="large" htmlType="submit" block onClick={onRegister}>
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