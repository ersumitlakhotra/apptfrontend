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
  Button
} from "antd";
import { Link } from "react-router-dom";

const { Text, Title } = Typography;

export const ResetPassword = () => {

  const CardTitle = (
    <Title level={3} className="title">
      Reset your password
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
            <Card title={CardTitle} headStyle={{ borderBottom: 0 }} >
              <p>Please enter the email address you,d like your password reset information sent to</p>
              <Form
                layout="vertical"
                requiredMark={false}
                initialValues={{
                  remember: false,
                }}
              >
                 <Form.Item
                    name="email"
                    label="Enter email address"
                    rules={[{ required: true }]}
                  >
                  <Input size="large" placeholder="Email" />
                 </Form.Item>
                <Button type="primary" size="large" htmlType="submit" block>
                  Request reset link 
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


export default ResetPassword;