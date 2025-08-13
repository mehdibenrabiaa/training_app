import { useState, useEffect } from 'react';
import { Typography, Popover } from 'antd';
import { QuestionCircleTwoTone } from '@ant-design/icons';
import { motion } from 'motion/react';
const { Title, Text, Paragraph } = Typography;

const popoverContent = {
  pension: (
    <Paragraph style={{ maxWidth: 400 }}>
      A <Text strong>pension</Text> is a long-term savings and investment
      vehicle designed to provide individuals with income during retirement. It
      is structured to replace a portion of the income lost once an individual
      retires and stops receiving regular wages or salary.
    </Paragraph>
  ),
};

const EmployerContributions = () => {
  const [animation, setAnimation] = useState('animation-class');
  useEffect(() => {
    setAnimation('animation-release');
  }, []);
  return (
    <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay:  0.3, duration: 0.8 }}
   >
    <div className={`app-container ${animation}`} style={{ maxWidth: 900 }}>
      <div style={{ textAlign: 'left' }}>
        <Title
          level={1}
          style={{
            fontSize: 36,
            fontWeight: 700,
            textAlign: 'left',
          }}
        >
          Employer Contributions and Payroll Taxes
        </Title>
        <Paragraph className="para" style={{ paddingBottom: 20 }}>
          In Sweden, employer contributions are mandatory payments that
          employers make on behalf of their employees to finance various social
          insurance programs, public services, and government taxes. These
          contributions help ensure that employees have access to social
          benefits such as healthcare,{' '}
          <Popover
            content={popoverContent.pension}
            title="Pension or Old age pension"
            trigger="hover"
          >
            <Text strong code style={{ fontSize: 16 }}>
              pensions
            </Text>
            <QuestionCircleTwoTone />
          </Popover>
          , unemployment insurance, and worker's compensation.
        </Paragraph>
        <Paragraph className="para" style={{ paddingBottom: 20 }}>
          Employer contributions are a significant part of the overall cost of
          employment in Sweden and are calculated as a percentage of the
          employee's salary or wages. These payments are not given directly to
          the employee but are remitted to various social insurance funds and
          government agencies.
        </Paragraph>
        <Title level={4}>Components of Employer's Contributions:</Title>
        <ul style={{ fontSize: 16 }}>
          <li>Health insurance fee: 3.55%</li>
          <li>Parental insurance fee: 2.60%</li>
          <li>
            <strong>Retirement pension contribution: 10.21%</strong> (This
            percentage cannot be lower than 10.21%)
          </li>
          <li>Survivor's pension contribution: 0.60%</li>
          <li>Labor market contribution: 2.64%</li>
          <li>Worker's compensation fee: 0.20%</li>
          <li>
            <strong>General wage contribution: 11.62%</strong>
          </li>
        </ul>
        <ul style={{ listStyleType: 'none' }}>
          <li>
            <Title level={4}>Total Contribution for 2024: 31.42%</Title>
          </li>
        </ul>

        <Title level={3}>R&D Deduction</Title>
        <Paragraph className="para">
          Swedish employers that qualify for the Research & Development (R&D)
          tax incentive can benefit from a reduction in their employer
          contributions. Specifically, the R&D deduction allows companies to
          reduce their employer contributions by 20% of the taxable salaries
          total for employees directly involved in R&D activities.
        </Paragraph>
      </div>
    </div>
    </motion.div>
  );
};

export default EmployerContributions;
