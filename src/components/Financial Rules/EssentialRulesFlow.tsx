import { useState, useEffect } from "react";
import {
  Card,
  InputNumber,
  Select,
  Divider,
  Form,
  Typography,
  Row,
  Col,
  Statistic,
  Modal,
} from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";
const { Option } = Select;
const { Text } = Typography;
import Calendar from "./Calendar";

const monthIndex = {
  January: "01",
  February: "02",
  March: "03",
  April: "04",
  May: "05",
  June: "06",
  July: "07",
  August: "08",
  September: "09",
  October: "10",
  November: "11",
  December: "12",
};

const contractualHoursByMonth = {
  January: 176,
  February: 160,
  March: 168,
  April: 160,
  May: 160,
  June: 144,
  July: 184,
  August: 168,
  September: 176,
  October: 184,
  November: 160,
  December: 168,
};

type MonthKey = keyof typeof contractualHoursByMonth;

export default function WorkingHoursCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [month, setMonth] = useState<MonthKey>("January");
  const [contractualHours, setContractualHours] = useState<number>(
    contractualHoursByMonth["January"]
  );
  const [absences, setAbsences] = useState<number>(0);
  const [rdHours, setRdHours] = useState<number>(90);

  useEffect(() => {
    setContractualHours(contractualHoursByMonth[month]);
  }, [month]);

  const actualWorkingHours = contractualHours - absences;
  const rdPercentage =
    actualWorkingHours > 0 ? rdHours / actualWorkingHours : 0;

  return (
    <>
      <Modal
        width={600}
        footer={null}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <Calendar selectedMonth={"2025-" + monthIndex[month]} />
      </Modal>
      <Row gutter={16}>
        {/* Column 1 */}
        <Col span={12}>
          <Row gutter={[0, 16]}>
            <Col span={24}>
              <Card
                title="The 50% Rule"
                style={{
                  borderWidth: "2px",
                  borderStyle: "solid",
                  borderColor: rdPercentage >= 0.5 ? "#52c41a" : "#f5222d",
                }}
              >
                <BlockMath>
                  {`\\text{R\\&D \\%} = \\frac{${rdHours}\\ \\text{(R\\&D Hours)}}{${actualWorkingHours}\\ \\text{(Actual Working Hours)}} = ${(
                    rdPercentage * 100
                  ).toFixed(2)}\\%`}
                </BlockMath>

                <Typography.Paragraph>
                  <Text type={rdPercentage >= 0.5 ? "success" : "danger"}>
                    {rdPercentage >= 0.5 ? (
                      <span>
                        <CheckCircleOutlined /> The employee satisfies the 50%
                        rule.
                      </span>
                    ) : (
                      <span>
                        <CloseCircleOutlined /> The employee does not satisfy
                        the 50% rule.
                      </span>
                    )}
                  </Text>
                </Typography.Paragraph>
              </Card>
            </Col>
            <Col span={24}>
              <Card
                title="The 15-Hour Minimum R&D Rule"
                style={{
                  borderWidth: "2px",
                  borderStyle: "solid",
                  borderColor: rdHours >= 15 ? "#52c41a" : "#f5222d",
                }}
              >
                <div
                  style={{
                    fontFamily: `"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,
                    fontSize: 16,
                  }}
                >
                  {rdHours >= 15 ? (
                    <BlockMath>{`\\text{R\\&D Hours} = ${rdHours}\\, \\geq\\, 15`}</BlockMath>
                  ) : (
                    <BlockMath>{`\\text{R\\&D Hours} = ${rdHours}\\, <\\, 15`}</BlockMath>
                  )}
                </div>

                <Typography.Paragraph>
                  <Text type={rdHours >= 15 ? "success" : "danger"}>
                    {rdHours >= 15 ? (
                      <span>
                        <CheckCircleOutlined /> The employee meets the minimum
                        15 R&D hours requirement.
                      </span>
                    ) : (
                      <span>
                        <CloseCircleOutlined /> The employee does not meet the
                        minimum 15 R&D hours requirement.
                      </span>
                    )}
                  </Text>
                </Typography.Paragraph>
              </Card>
            </Col>
          </Row>
        </Col>

        {/* Column 2 */}
        <Col span={12}>
          <Card>
            <Form
              labelCol={{ span: 14 }}
              wrapperCol={{ span: 10 }}
              layout="horizontal"
            >
              <Form.Item label="Month (Year 2025)">
                <Select<MonthKey> value={month} onChange={setMonth}>
                  {Object.keys(contractualHoursByMonth).map((m) => (
                    <Option key={m} value={m as MonthKey}>
                      {m}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label={
                  <>
                    <span style={{ marginRight: 5 }}>
                      Contractual Working Hours{" "}
                    </span>
                    <InfoCircleOutlined
                      onClick={() => {
                        setIsModalOpen(true);
                      }}
                      style={{ cursor: "pointer", color: "#1890ff" }}
                    />
                  </>
                }
              >
                <InputNumber
                  value={contractualHours}
                  disabled
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item label="Absences">
                <InputNumber
                  min={0}
                  max={contractualHours}
                  value={absences}
                  onChange={(val) => setAbsences(val ?? 0)}
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item label="Actual Working Hours ">
                <InputNumber
                  value={actualWorkingHours}
                  disabled
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Divider />

              <Form.Item label="R&D Working Hours">
                <InputNumber
                  min={0}
                  max={actualWorkingHours}
                  value={rdHours}
                  onChange={(val) => setRdHours(val ?? 0)}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Form>
            <Statistic
              title="R&D Hours Proportion in Percent"
              value={(rdPercentage * 100).toFixed(2)}
              precision={2}
              valueStyle={{
                color: rdPercentage >= 0.5 ? "#52c41a" : "#ff4d4f",
              }}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}
