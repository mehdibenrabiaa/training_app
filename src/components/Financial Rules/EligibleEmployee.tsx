import { motion } from 'motion/react';
import { Typography, List, Alert, Divider } from "antd";
import { CheckCircleOutlined   } from "@ant-design/icons";
const { Title, Text, Paragraph } = Typography;
import "reactflow/dist/style.css";
import EssentialRulesFlow from "./EssentialRulesFlow";
import EssentialRulesFlowchart from "./flow/EssentialRulesFlowchart";

const items = [
  <div>
    <Text strong>Time Requirement Proportion: </Text>The employee must spend at
    least 50% of their working time on qualifying R&D activities during a
    calendar month.
  </div>,
  <div>
    <Text strong>Minimum R&D Hours: </Text>
    The 50% must correspond to at least 15 actual R&D hours during the month,
    meaning that 50% of their total working time must amount to **at least 15
    hours**.
  </div>,
];
function EligibleEmployee() {
 
  return (
    <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay:  0.3, duration: 0.8 }}
   >
    <div className={`app-container`} style={{ maxWidth: 900 }}>
      <div style={{ textAlign: "left" }}>
        <Title
          level={1}
          style={{
            fontSize: 36,
            fontWeight: 700,
            textAlign: "left",
          }}
        >
          Eligible Employee
        </Title>
        <Title level={3}>Requirements for Deductions (Very Important)</Title>
        <Paragraph className="para" style={{ paddingBottom: 5 }}>
          To be eligible as an employer, a company must fulfill certain
          important criteria related to its operations and workforce.
        </Paragraph>

        <List
          dataSource={items}
          renderItem={(item) => (
            <List.Item style={{ maxWidth: 700 }}>
              <CheckCircleOutlined style={{ color: "green", marginRight: 8 }} />
              {item}
            </List.Item>
          )}
        />
      </div>
      <Alert
        type="info"
        style={{ marginTop: 20, marginBottom: 50 }}
        message={
          <Typography.Text strong>Note:</Typography.Text> }
        description = {
          <Paragraph style={{ marginTop: 8 }}>
        All of the above requirements apply within the scope of a{" "}
        <strong>monthly study period</strong>. Our analysis is based
        specifically on the hours worked during a particular month,
        considering all related data for that month only.
      </Paragraph>}
        
      />
      <Divider />
      <Title level={4} style={{ marginBottom: 10 }}>
        1- How the 50% and Minimum 15-Hour Rules Work?{" "}
        <Text italic>(An Interactive Example)</Text>
      </Title>
      <Paragraph className="para" style={{ paddingBottom: 40 }}>
        Let's assume we have a full-time employee with the following contractual
        working hours, absences, and R&D hours.
      </Paragraph>
      <EssentialRulesFlowchart />
      <Title level={4} style={{ marginBottom: 10 }}>
        2- How the 50% and Minimum 15-Hour Are Being Calculted?{" "}
        <Text italic>(An Interactive Example)</Text>
      </Title>
      <Paragraph className="para" style={{ paddingBottom: 40 }}>
        The following is an example of how we calculate eligibility based on
        working hours. Let's assume an employee with the following working hours
        data:
      </Paragraph>
      <EssentialRulesFlow />
    </div>
    </motion.div>
  );
}

export default EligibleEmployee;

