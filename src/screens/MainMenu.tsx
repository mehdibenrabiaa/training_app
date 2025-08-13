 
import { motion } from 'motion/react';
 
import { Typography, Flex, Button, Row, Col } from "antd";
import { useNavigate } from "react-router-dom"; 
import {
  RightOutlined,
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


const menu = [
  {
    title: "R&D in Theory",
    desc : "Introduction to the Swedish R&D Financial Rules",
    page: 'rd_theory'
  },
    {
    title: "Onboarding",
    desc : "Internal Protocol for Onboarding New Clients",
    page: 'onboarding'
  },    {
    title: "Financial Costing",
    desc : "Introducing Excel's Workbook Structure",
    page: 'financial_costing'
  },    {
    title: "Admin",
    desc : "Undertsanding Trackers & Galileo Admin",
    page: 'admin'
  } 
]

const MainMenu = () => {
  const navigate = useNavigate();
  

 
  const transition = (path: string) => {
     
    setTimeout(function () {
      navigate(path);
    }, 600);
  };
  const titleLines = [{
    text: <Title  
    style={{
      fontSize: 60, fontWeight: 700,lineHeight: 1, margin: 5
    }} 
    >Sweden's R&D Tax</Title>,
   
  }, {
     text: <Title  
    style={{
      fontSize: 60, fontWeight: 700, lineHeight: 1,  margin: 5
    }} 
    >Incentive Training App</Title>,
   
  } , {
    text: <Text
    style={{color: "rgb(9, 88, 217)", fontSize: 30, fontWeight: 200, lineHeight: 1.5}}
    >A Comprehensive Guide to R&D Tax Incentives Essentials in Sweden</Text>,
 
  }
    

   
  ];
  return (
    <Flex
      style={{ height: "100vh" , padding: 20}}
      align="center"
      vertical
      className={`main-menu-container animated-bg  `}
    >
      <img
        src={leyton_logo}
        className="main-menu-leyton-logo"
        style={{ width: 90, marginTop: 10 }}
      />
      <div style={{ textAlign: "center" }}>
      {titleLines.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.3, duration: 0.6 }}
       
         >
          {item.text}
        </motion.div>
      ))}
    </div>
      
       

      <Flex style={{ marginTop: 30 }}>
    
         
       {
        menu.map((x, index) => {
          return (
           
                      <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 2 }}
          >

            <div
            className="main-menu-box no-select"
            onClick={() => {
              transition(x.page);
            }}
            >
            <Flex align="center" style={{ marginBottom: 10 }}>
              <ReadOutlined style={{ fontSize: 30, color: "#f9f0ff" }} />
              <Title level={5} style={{ color: "#f9f0ff", margin: "0 0 0 10px" }}>
           {x.title}
              </Title>
            </Flex>
            <Text type="secondary" style={{ color: "#f9f0ff" }}>
              {x.desc}
            </Text>
          <RightOutlined />
          </div>
            </ motion.div>
       
          
          )
        })
       }
        
      
     
      </Flex>
      <motion.div
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay:   0.15, duration: 2 }}
           >
      <Row>
        {miniIcons.map((item  ) => (
            
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
      </motion.div>
    </Flex>
  );
};

export default MainMenu;
