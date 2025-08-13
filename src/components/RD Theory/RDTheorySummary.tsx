 
import { Typography, List, Alert } from 'antd';
import { CheckOutlined    } from '@ant-design/icons';
import { motion } from 'motion/react';
const { Title, Text, Paragraph } = Typography;

const thingsToRememeber = [
  <span>
    <Text strong code>
      Arbetsgivaravgift
    </Text>{' '}
    is an employer’s mandatory social security contribution in Sweden.
  </span>,
  'The total employer contribution rate for 2024 is 31.42% of the employee’s gross salary.',
  'Employer contributions are paid on top of the employee’s salary (not deducted from it).',
  'The R&D deduction reduces employer contributions by 20% of the taxable salary for employees involved in R&D.',
  'The R&D deduction effectively lowers the total cost of employment for qualifying R&D staff.',
];

const RDTheorySummary = () => {
 
  return (
    <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay:  0.3, duration: 0.8 }}
   >
    <div className={`app-container`} style={{ maxWidth: 900 }}>
      <div style={{ textAlign: 'left' }}>
        <Title
          level={1}
          style={{
            fontSize: 36,
            fontWeight: 700,
            textAlign: 'left',
          }}
        >
          Summary
        </Title>
        <Paragraph className="para" style={{ paddingBottom: 20 }}>
          In Sweden, employers must pay{' '}
          <Text strong code>
            Arbetsgivaravgift
          </Text>{' '}
          (Employer Contributions) on top of employee salaries to cover social
          security and other public welfare expenses. This contribution is a
          fixed percentage (31.42% for 2024) of the gross salary and funds
          health insurance, pensions, parental leave, unemployment, and other
          benefits.
        </Paragraph>
        <Paragraph className="para" style={{ paddingBottom: 20 }}>
          The R&D Deduction incentive allows companies engaged in{' '}
          <Text underline strong>
            qualifying
          </Text>{' '}
          research and development activities to reduce their employer
          contributions by 20% of the taxable salary for R&D employees. This
          deduction lowers the overall employment cost and incentivizes
          investment in innovation.
        </Paragraph>
        <div style={{ paddingBottom: 30 }}>
          <Title level={4}>Important Points to Remember:</Title>
          <List
            bordered
            dataSource={thingsToRememeber}
            renderItem={(item) => (
              <List.Item>
                <CheckOutlined style={{ color: 'green', marginRight: 8 }} />
                {item}
              </List.Item>
            )}
          />
        </div>

        <Paragraph className="para" style={{ paddingBottom: 20 }}>
          Understanding employer social security contributions is essential
          because the R&D deduction directly reduces these contributions,
          meaning companies that qualify pay less in employer fees for eligible
          R&D employees.
        </Paragraph>

        <Alert  
          style={{ marginBottom: 50 }}
          message={<Text strong>Important Note:</Text>}
          description={
            <Paragraph className="para" >
              Understanding employer social security contributions is essential
              because the R&D deduction directly reduces these contributions,
              meaning companies that qualify pay less in employer fees for
              eligible R&D employees.
            </Paragraph>
          }
          type="info"
        />
      </div>
    </div>
    </motion.div>
  );
};

export default RDTheorySummary;
