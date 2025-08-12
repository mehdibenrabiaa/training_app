import { useState, useEffect } from "react";
import { Typography, List, Table } from "antd";
import {
  EditOutlined,
  CheckSquareFilled,
  CloseSquareFilled,
} from "@ant-design/icons";
const { Title, Text, Paragraph } = Typography;
import ExceptionRuleFlowchart from "./flow/ExceptionRuleFlowchart";
const checkStyles = { color: "#52c41a", fontSize: 20, marginRight: 8 };
const closeStyles = {
  color: "#f5222d",
  fontSize: 20,
  marginRight: 8,
};

const items = [
  <div>
    <Text strong>Normal Eligibility: </Text>
    An employee’s month qualifies for the R&D deduction if they spend at least{" "}
    <Text strong>50% of their working time</Text> on R&D activities{" "}
    <Text strong>and</Text> work at least <Text strong>15 hours</Text> on R&D in
    that month.
  </div>,
  <div>
    <Text strong>When the 15-Hour Rule Fails: </Text>
    Normally, if the employee works less than 15 hours of R&D in a month, that
    month is ineligible, even if the 50% threshold is met.
  </div>,
  <div>
    <Text strong>The Exception Rule (Bonus Month): </Text>
    If the employee fails the 15-hour requirement in the current month but has
    met both the 50% and 15-hour requirements for{" "}
    <Text strong>the past 4 consecutive months</Text>, the current month still
    qualifies for the deduction.
  </div>,
  <div>
    <Text strong>Why It Exists: </Text>
    This protects employees consistently engaged in R&D from losing eligibility
    during a low-activity month, recognizing that R&D work can be cyclical and
    some months may require fewer hours.
  </div>,
];

const tableColumns = [
  { title: "Month", dataIndex: "month", key: "month" },
  { title: "% R&D Time", dataIndex: "percent", key: "percent" },
  { title: "R&D Hours", dataIndex: "hours", key: "hours" },
  { title: "Normally Eligible?", dataIndex: "eligible", key: "eligible" },
  { title: "Exception Applies?", dataIndex: "exception", key: "exception" },
  { title: "Result", dataIndex: "result", key: "result" },
];

const tableData = [
  {
    key: "1",
    month: "Jan",
    percent: "60%",
    hours: "20h",
    eligible: (
      <>
        <CheckSquareFilled style={checkStyles} />
        Yes
      </>
    ),
    exception: "—",
    result: (
      <>
        <CheckSquareFilled style={checkStyles} />
        Eligible
      </>
    ),
  },
  {
    key: "2",
    month: "Feb",
    percent: "55%",
    hours: "18h",
    eligible: (
      <>
        <CheckSquareFilled style={checkStyles} />
        Yes
      </>
    ),
    exception: "—",
    result: (
      <>
        <CheckSquareFilled style={checkStyles} />
        Eligible
      </>
    ),
  },
  {
    key: "3",
    month: "Mar",
    percent: "50%",
    hours: "15h",
    eligible: (
      <>
        <CheckSquareFilled style={checkStyles} />
        Yes
      </>
    ),
    exception: "—",
    result: (
      <>
        <CheckSquareFilled style={checkStyles} />
        Eligible
      </>
    ),
  },
  {
    key: "4",
    month: "Apr",
    percent: "70%",
    hours: "16h",
    eligible: (
      <>
        <CheckSquareFilled style={checkStyles} />
        Yes
      </>
    ),
    exception: "—",
    result: (
      <>
        <CheckSquareFilled style={checkStyles} />
        Eligible
      </>
    ),
  },
  {
    key: "5",
    month: "May",
    percent: "65%",
    hours: "10h",
    eligible: (
      <>
        <CloseSquareFilled style={closeStyles} />
        No
      </>
    ),
    exception: (
      <>
        <CheckSquareFilled style={checkStyles} />
        Yes (met past 4 months)
      </>
    ),
    result: (
      <>
        <CheckSquareFilled style={checkStyles} />
        Eligible
      </>
    ),
  },
];

function ExceptionRule() {
  const [animation, setAnimation] = useState("animation-class");

  useEffect(() => {
    setAnimation("animation-release");
  }, []);

  return (
    <div className={`app-container ${animation}`} style={{ maxWidth: 900 }}>
      <div style={{ textAlign: "left" }}>
        <Title
          level={1}
          style={{
            fontSize: 36,
            fontWeight: 700,
            textAlign: "left",
          }}
        >
          Exception Rule
        </Title>
        <Title level={2}>How the “Bonus Month” Works?</Title>
        <Paragraph className="para" style={{ paddingBottom: 5 }}>
          The Swedish R&D tax incentive normally requires an employee to meet
          both the 50% R&D time and 15-hour thresholds each month. The exception
          rule lets an employee’s month still count for the R&D deduction, even
          if they worked less than 15 hours on R&D that month.
        </Paragraph>

        <List
          dataSource={items}
          renderItem={(item) => (
            <List.Item style={{ maxWidth: 700 }}>
              <EditOutlined style={{ color: "green", marginRight: 8 }} />
              {item}
            </List.Item>
          )}
        />

        <Title level={3} style={{ marginTop: 20 }}>
          Example Timeline
        </Title>
        <Table
          columns={tableColumns}
          dataSource={tableData}
          pagination={false}
          bordered
        />
      </div>
      <ExceptionRuleFlowchart />
    </div>
  );
}

export default ExceptionRule;
