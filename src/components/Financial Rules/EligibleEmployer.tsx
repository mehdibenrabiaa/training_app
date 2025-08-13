 
import { Typography, List } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { motion } from 'motion/react';
const { Title, Text, Paragraph } = Typography;
const items = [
  <div>
    <Text strong>Employer Contributions Location: </Text>
    The employer could be either a Swedish or foreign company paying employer
    contributions in Sweden.
  </div>,
  <div>
    <Text strong>Scope of Company Size and Industry: </Text>The company can be
    of any size or industry, provided the work involves systematic and qualified
    R&D.
  </div>,
  <div>
    <Text strong>Direct Employment of R&D Employees: </Text>Employees must be
    directly employed by the company conducting the R&D, not by another company
    (e.g., consulting or staffing firms).
  </div>,
  <div>
    <Text strong>Social Security Contributions:</Text>The employer must be
    paying social security contributions for the employees involved in the R&D.
  </div>,
];
function EligibleEmployer() {
 
  return (
    <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay:  0.3, duration: 0.8 }}
   >
    <div className={`app-container  `} style={{ maxWidth: 900 }}>
      <div style={{ textAlign: 'left' }}>
        <Title
          level={1}
          style={{
            fontSize: 36,
            fontWeight: 700,
            textAlign: 'left',
          }}
        >
          Eligible Employer
        </Title>
        <Title level={2}>What Makes an Employer Eligible?</Title>
        <Paragraph className="para" style={{ paddingBottom: 5 }}>
          To be eligible as an employer, a company must fulfill certain
          important criteria related to its operations and workforce.
        </Paragraph>
        <Paragraph>
          <Text strong>Employer Contributions Location: </Text>
        </Paragraph>

        <List
          dataSource={items}
          renderItem={(item) => (
            <List.Item style={{ maxWidth: 700 }}>
              <CheckOutlined style={{ color: 'green', marginRight: 8 }} />
              {item}
            </List.Item>
          )}
        />
      </div>
    </div>
    </motion.div>
  );
}

export default EligibleEmployer;
