 
import { motion } from 'motion/react';
import { Typography, Timeline, Popover } from 'antd';
import { QuestionCircleTwoTone } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const popoverContent = {
  taxRelief: (
    <Paragraph style={{ maxWidth: 400 }}>
      Tax relief is a reduction in the amount of tax a person or company owes to
      the government. It can take the form of deductions, credits, or
      exemptions, lowering the taxable income or directly reducing the tax bill.
      Tax relief is often used to encourage certain activities, like R&D, by
      making them more financially feasible for businesses.
    </Paragraph>
  ),
};

function History() {
 
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
          History of the Swedish R&D Tax Incentive
        </Title>
        <Title level={2}>What is an R&D Tax Incentive?</Title>
        <Paragraph className="para" style={{ paddingBottom: 20 }}>
          An <strong>R&D tax incentive</strong> is a government program that
          offers
          <Popover
            content={popoverContent.taxRelief}
            title="Rax Relief"
            trigger="hover"
          >
            <Text strong code style={{ fontSize: 16 }}>
              tax relief
            </Text>
            <QuestionCircleTwoTone />{' '}
          </Popover>
          to companies investing in research and development. It reduces the
          amount of tax a company has to pay, encouraging innovation and
          technological advancement. The incentive typically applies to expenses
          related to developing new products, processes, or services.
        </Paragraph>
        <Timeline
          items={[
            {
              children: (
                <div style={{ textAlign: 'left' }}>
                  <Title level={3}>
                    2014: Creation of the R&D Tax Incentive
                  </Title>
                  <Paragraph className="para">
                    The Swedish government introduced the R&D tax incentive in
                    2014 as part of its strategy to boost the research and
                    development sector. Initially, the incentive provided a tax
                    relief of 10% on qualifying R&D expenses, with a ceiling
                    amount of SEK 230,000 per month.
                  </Paragraph>
                </div>
              ),
            },
            {
              children: (
                <div style={{ textAlign: 'left' }}>
                  <Title level={3}>April 2020: Boosting Innovation</Title>
                  <Paragraph className="para">
                    In April 2020, the Swedish government reinforced the
                    incentive to make it more attractive and impactful. The tax
                    relief was increased to 19.59%. Additionally, the ceiling
                    amount was significantly raised to SEK 919,238 per month,
                    providing more substantial financial support for R&D
                    activities.
                  </Paragraph>
                </div>
              ),
            },
            {
              children: (
                <div style={{ textAlign: 'left' }}>
                  <Title level={3}>July 2021: Further Expansion</Title>
                  <Paragraph className="para">
                    The incentive was once again strengthened in July 2021. The
                    ceiling was increased further to SEK 1,225,651 per month,
                    allowing businesses to claim even more substantial relief
                    for their R&D efforts.
                  </Paragraph>
                </div>
              ),
            },
            {
              children: (
                <div style={{ textAlign: 'left' }}>
                  <Title level={3}>July 2023: Major Reinforcement</Title>
                  <Paragraph className="para">
                    In July 2023, Sweden made another significant change to the
                    incentive. The ceiling amount was drastically increased to
                    SEK 3 million per month per group, not per project or per
                    company. The aim was to prevent companies from exploiting
                    the system by creating multiple entities to bypass the SEK 3
                    million cap.
                  </Paragraph>
                </div>
              ),
            },
            {
              children: (
                <div style={{ textAlign: 'left' }}>
                  <Title level={3}>January 2024: New Strengthening</Title>
                  <Paragraph className="para">
                    The latest update to the incentive came in January 2024,
                    when the government increased the tax relief to 20%.
                  </Paragraph>
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
    </motion.div>
  );
}

export default History;
