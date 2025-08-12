import { useState, useEffect } from "react";
import { Typography, Flex, Button, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import {
  TeamOutlined,
  RightOutlined,
  FileExcelOutlined,
  SettingOutlined,
  ReadOutlined,
  TranslationOutlined,
  LinkOutlined,
  MailOutlined,
  FileOutlined,
} from "@ant-design/icons";
const { Title, Text } = Typography;
import leyton_logo from "../assets/images/leyton.webp";

const miniIcons = [
  { icon: <TranslationOutlined />, title: "Glossary" },
  { icon: <LinkOutlined />, title: "Links" },
  { icon: <MailOutlined />, title: "Email" },
  { icon: <FileOutlined />, title: "Templates" },
];

const MainMenu = () => {
  const navigate = useNavigate();
  const [animation, setAnimation] = useState(false);

  const [pageAnimation, setPageAnimation] = useState("animation-class");
  useEffect(() => {
    setPageAnimation("animation-release");
  }, []);

  const transition = (path: string) => {
    setAnimation(true);
    setTimeout(function () {
      navigate(path);
    }, 600);
  };

  return (
    <Flex
      style={{ height: "100vh" }}
      align="center"
      vertical
      className={`main-menu-container animated-bg ${pageAnimation} ${
        animation ? "main-menu-animation" : ""
      }`}
    >
      <img
        src={leyton_logo}
        className="main-menu-leyton-logo"
        style={{ width: 90, marginTop: 10 }}
      />
      <Title
        className="no-select"
        level={1}
        style={{
          maxWidth: 600,
          fontSize: 50,
          fontWeight: 700,
          textAlign: "center",
          marginBottom: 10,
          lineHeight: 1,
        }}
      >
        Sweden's R&D Tax Incentive Training App
      </Title>
      <Title
        className="no-select"
        level={2}
        style={{
          fontSize: 24,
          textAlign: "center",
          marginTop: 0,
          fontWeight: 300,
          color: "#0958d9",
        }}
      >
        A Comprehensive Guide to R&D Tax Incentives Essentials in Sweden
      </Title>

      <Flex style={{ marginTop: 30 }}>
        <div
          className="main-menu-box no-select"
          onClick={() => {
            transition("rd_theory");
          }}
        >
          <Flex align="center" style={{ marginBottom: 10 }}>
            <ReadOutlined style={{ fontSize: 30, color: "#f9f0ff" }} />
            <Title level={5} style={{ color: "#f9f0ff", margin: "0 0 0 10px" }}>
              R&D in Theory
            </Title>
          </Flex>
          <Text type="secondary" style={{ color: "#f9f0ff" }}>
            Introduction to the Swedish R&D Financial Rules
          </Text>
        </div>
        <RightOutlined />
        <div className="main-menu-box no-select">
          <Flex align="center" style={{ marginBottom: 10 }}>
            <TeamOutlined style={{ fontSize: 30, color: "#f9f0ff" }} />
            <Title level={5} style={{ color: "#f9f0ff", margin: "0 0 0 10px" }}>
              Onboarding
            </Title>
          </Flex>
          <Text type="secondary" style={{ color: "#f9f0ff" }}>
            Internal Protocol for Onboarding New Clients
          </Text>
        </div>
        <RightOutlined />
        <div
          className="main-menu-box no-select"
          onClick={() => {
            transition("rd_theory");
          }}
        >
          <Flex align="center" style={{ marginBottom: 10 }}>
            <FileExcelOutlined style={{ fontSize: 30, color: "#f9f0ff" }} />
            <Title level={5} style={{ color: "#f9f0ff", margin: "0 0 0 10px" }}>
              Financial Costing
            </Title>
          </Flex>
          <Text type="secondary" style={{ color: "#f9f0ff" }}>
            Introducing Excel's Workbook Structure
          </Text>
        </div>
        <RightOutlined />
        <div
          className="main-menu-box no-select"
          onClick={() => {
            transition("rd_theory");
          }}
        >
          <Flex align="center" style={{ marginBottom: 10 }}>
            <SettingOutlined style={{ fontSize: 30, color: "#f9f0ff" }} />
            <Title level={5} style={{ color: "#f9f0ff", margin: "0 0 0 10px" }}>
              Admin
            </Title>
          </Flex>
          <Text type="secondary" style={{ color: "#f9f0ff" }}>
            Undertsanding Trackers & Galileo Admin
          </Text>
        </div>
      </Flex>

      <Row>
        {miniIcons.map((item) => (
          <Col
            span={6}
            key={item.title}
            style={{ textAlign: "center", width: 100, marginTop: 30 }}
          >
            <Button type="default" icon={item.icon} shape="circle" />
            <Text
              strong
              style={{ display: "block", marginTop: 5, fontSize: 12 }}
            >
              {item.title}
            </Text>
          </Col>
        ))}
      </Row>
    </Flex>
  );
};

export default MainMenu;
