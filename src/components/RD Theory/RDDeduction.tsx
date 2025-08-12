import { useState, useEffect } from 'react';
import { Typography, Popover, Timeline, Steps } from 'antd';
import { QuestionCircleTwoTone } from '@ant-design/icons';
import AudioPlayer from '../AudioPlayer';
import arbetsgivaravgiftAudio from '../../assets/audios/arbetsgivaravgift.mp3';

const { Title, Text, Paragraph } = Typography;

const popoverContent = {
  Arbetsgivaravgift: (
    <Paragraph style={{ maxWidth: 400 }}>
      Arbetsgivaravgift is a Swedish term for the{' '}
      <Text code>employer's social security contributions</Text>, referring to
      the mandatory payroll taxes that employers must pay based on their
      employees' wages. The rate for Arbetsgivaravgift is 31.42% of the
      employee's salary and funds various social welfare programs, such as
      pensions, healthcare, and unemployment benefits.
      <Paragraph style={{ marginTop: 20 }}>
        <Text strong underline>
          Arbetsgivaravgift
        </Text>
        {' and '}
        <Text strong underline>
          Employer Contributions
        </Text>{' '}
        are used interchangeably in this manual and refer to the same concept.
      </Paragraph>
    </Paragraph>
  ),
};

function RDDeduction() {
  const [animation, setAnimation] = useState('animation-class');
  useEffect(() => {
    setAnimation('animation-release');
  }, []);
  return (
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
          Employer's Fees Overview (Arbetsgivaravgift)
        </Title>
        <Paragraph className="para" style={{ paddingBottom: 20 }}>
          In Sweden,{' '}
          <Popover
            content={popoverContent.Arbetsgivaravgift}
            title="AR-bets-gee-var-AV-gift"
            trigger="hover"
          >
            <Text strong code style={{ fontSize: 16 }}>
              Arbetsgivaravgift
            </Text>
            <AudioPlayer audioSrc={arbetsgivaravgiftAudio} />{' '}
            <QuestionCircleTwoTone />
          </Popover>
          , or Employer's Contribution, is the amount that employers are
          required to pay on top of an employee’s salary for social security and
          other related expenses.
        </Paragraph>
        <Paragraph className="para">
          A key feature of the Arbetsgivaravgift is its role in determining the
          base for the R&D deduction. This R&D tax incentive actually acts as a
          deduction of the social security contributions or employer
          contributions, reducing the overall cost to employers for employees
          engaged in qualifying research and development work.
        </Paragraph>
        <Title level={3}>Example of R&D Deduction vs No R&D Deduction</Title>
        <Paragraph className="para">
          Let's imagine a company in Sweden that has an employee with a monthly
          salary of <Text mark>SEK 50,000</Text>. The company is subject to the
          Arbetsgivaravgift (Employer Contributions) rate of{' '}
          <Text mark>31.42%</Text>. The R&D deduction can reduce the Employer
          Contributions (Arbetsgivaravgift) for qualifying R&D activities.
        </Paragraph>
        <br />
        <Timeline
          items={[
            {
              children: (
                <div style={{ textAlign: 'left' }}>
                  <Title level={4}>Without R&D Deduction:</Title>
                  <Paragraph className="para">
                    If the company does not qualify for the R&D tax incentive,
                    it pays the full employer contribution (Arbetsgivaravgift).
                  </Paragraph>
                  <Steps
                    current={0}
                    direction="vertical"
                    items={[
                      {
                        status: 'wait',
                        title: ' Employee Salary (Gross):',
                        description: (
                          <Paragraph className="para">SEK 50 000</Paragraph>
                        ),
                      },
                      {
                        title: 'Arbetsgivaravgift (31.42%):',
                        description: (
                          <Paragraph className="para">
                            SEK 50 000 × 31,42% = SEK 15 710
                          </Paragraph>
                        ),
                      },
                    ]}
                  />
                  <Text keyboard className="para">
                    Total Employer Cost without RD Deduction: 50 000 + 15 710 =
                    SEK 65 710
                  </Text>
                </div>
              ),
            },
            {
              children: (
                <div style={{ textAlign: 'left' }}>
                  <Title level={4}>With R&D Deduction:</Title>
                  <Paragraph className="para">
                    If the company qualifies for the R&D tax incentive, it pays
                    the contribution minus the deduction.
                  </Paragraph>
                  <Steps
                    current={0}
                    direction="vertical"
                    items={[
                      {
                        status: 'wait',
                        title: ' Employee Salary (Gross):',
                        description: (
                          <Paragraph className="para">SEK 50 000</Paragraph>
                        ),
                      },
                      {
                        title: 'Arbetsgivaravgift (31.42%):',
                        description: (
                          <Paragraph className="para">
                            SEK 50 000 × 31,42% = SEK 15 710
                          </Paragraph>
                        ),
                      },
                      {
                        title: 'R&D Deduction (20%):',
                        description: (
                          <Paragraph className="para">
                            50 000 × 20% = SEK 10 000
                          </Paragraph>
                        ),
                      },
                      {
                        title: 'Employer Contribution after R&D Deduction:',
                        description: (
                          <Paragraph className="para">
                            15 710 - 10 000 = SEK 5 710
                          </Paragraph>
                        ),
                      },
                    ]}
                  />
                  <Text keyboard className="para">
                    Total Employer with R&D Deduction: 50 000 + 12 568 = SEK 62
                    568
                  </Text>
                </div>
              ),
            },
            {},
          ]}
        />
        <Title level={4}>Summary:</Title>
        <ul>
          <li>
            <Paragraph className="para">
              Without R&D Deduction, the employer's total cost is{' '}
              <Text code style={{ fontSize: 16 }}>
                SEK 65 710
              </Text>
              .
            </Paragraph>
          </li>
          <li>
            <Paragraph className="para">
              With R&D Deduction, the employer's total cost is{' '}
              <Text keyboard style={{ fontSize: 16 }}>
                SEK 62 568
              </Text>
              .
            </Paragraph>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default RDDeduction;
