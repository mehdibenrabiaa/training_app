import React, { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/en-gb";

import {
  Calendar,
  ConfigProvider,
  Flex,
  Radio,
  Select,
  theme,
  List,
  Card,
  Typography,
} from "antd";

import enGB from "antd/es/locale/en_GB";
import dayLocaleData from "dayjs/plugin/localeData";

dayjs.extend(dayLocaleData);
dayjs.locale("en-gb");

const { Title, Text } = Typography;

interface AppProps {
  selectedMonth: string; // Format: "YYYY-MM"
}

const holidaysByMonth: Record<string, { date: string; name: string }[]> = {
  "2025-01": [
    { date: "2025-01-01", name: "New Year's Day" },
    { date: "2025-01-05", name: "Twelfth Night" },
    { date: "2025-01-06", name: "Epiphany" },
  ],
  "2025-04": [
    { date: "2025-04-18", name: "Good Friday" },
    { date: "2025-04-19", name: "Holy Saturday" },
    { date: "2025-04-20", name: "Easter Sunday" },
    { date: "2025-04-21", name: "Easter Monday" },
    { date: "2025-04-30", name: "Walpurgis Night" },
  ],
  "2025-05": [
    { date: "2025-05-01", name: "May 1st" },
    { date: "2025-05-25", name: "Mother's Day" },
    { date: "2025-05-29", name: "Ascension Day" },
  ],
  "2025-06": [
    { date: "2025-06-06", name: "National Day" },
    { date: "2025-06-07", name: "Wite Saturday" },
    { date: "2025-06-08", name: "White Sunday" },
    { date: "2025-06-20", name: "Midsummer Eve" },
    { date: "2025-06-21", name: "Midsummer Day" },
  ],
  "2025-10": [{ date: "2025-10-31", name: "All Saints' Eve" }],
  "2025-11": [{ date: "2025-11-01", name: "All Saints' Day" }],
  "2025-12": [
    { date: "2025-12-24", name: "Christmas Eve" },
    { date: "2025-12-31", name: "New Year's Eve" },
  ],
};

const App: React.FC<AppProps> = ({ selectedMonth }) => {
  const { token } = theme.useToken();

  const [selectedDate, setSelectedDate] = useState(
    dayjs(`${selectedMonth}-01`)
  );

  useEffect(() => {
    setSelectedDate(dayjs(`${selectedMonth}-01`));
  }, [selectedMonth]);

  const onPanelChange = (value: Dayjs) => {
    setSelectedDate(value);
  };

  const wrapperStyle: React.CSSProperties = {
    width: 500,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const currentMonthKey = selectedDate.format("YYYY-MM");
  const holidaysThisMonth = holidaysByMonth[currentMonthKey] || [];

  const isHoliday = (dateStr: string) =>
    holidaysThisMonth.some((h) => h.date === dateStr);

  const dateFullCellRender = (current: Dayjs) => {
    const day = current.day();
    const dateStr = current.format("YYYY-MM-DD");

    const isWeekend = day === 0 || day === 6;
    const holiday = isHoliday(dateStr);

    let backgroundColor: string | undefined;
    if (holiday) backgroundColor = "#bae0ff";
    else if (isWeekend) backgroundColor = "#ffccc7";

    const style: React.CSSProperties = {
      textAlign: "center",
      backgroundColor,
      borderRadius: 4,
      cursor: "pointer",
      userSelect: "none",
    };

    return <div style={style}>{current.date()}</div>;
  };

  const year = selectedDate.year();
  const month = selectedDate.month();
  const daysInMonth = dayjs(new Date(year, month + 1, 0)).date();

  let workingDaysCount = 0;
  for (let d = 1; d <= daysInMonth; d++) {
    const date = dayjs(new Date(year, month, d));
    const day = date.day();
    const formattedDate = date.format("YYYY-MM-DD");

    const weekend = day === 0 || day === 6;
    if (!weekend && !isHoliday(formattedDate)) {
      workingDaysCount++;
    }
  }

  const workingHours = workingDaysCount * 8;

  return (
    <ConfigProvider locale={enGB}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          gap: 10,
        }}
      >
        <div style={wrapperStyle}>
          <Calendar
            fullscreen={false}
            value={selectedDate}
            headerRender={({ value, type, onChange, onTypeChange }) => {
              const month = value.month();

              const monthOptions = value
                .localeData()
                .monthsShort()
                .map((label, index) => ({
                  label,
                  value: index,
                }));

              return (
                <div style={{ padding: 8 }}>
                  <Flex gap={8}>
                    <Radio.Group
                      size="small"
                      onChange={(e) => onTypeChange(e.target.value)}
                      value={type}
                    />
                    <Select
                      size="small"
                      popupMatchSelectWidth={false}
                      value={month}
                      options={monthOptions}
                      onChange={(newMonth) => {
                        const now = value.clone().month(newMonth);
                        onChange(now);
                      }}
                    />
                  </Flex>
                </div>
              );
            }}
            onPanelChange={onPanelChange}
            dateFullCellRender={dateFullCellRender}
          />
        </div>

        <Card style={{ width: 500 }}>
          <Title level={5}>
            Holidays in {selectedDate.format("MMMM YYYY")}
          </Title>
          <List
            dataSource={holidaysThisMonth}
            renderItem={(item) => (
              <List.Item>
                <Text strong style={{ color: "#0958d9" }}>
                  {dayjs(item.date).format("MMM D, YYYY")}
                </Text>{" "}
                - <Text>{item.name}</Text>
              </List.Item>
            )}
            locale={{ emptyText: "No holidays this month" }}
          />

          <div style={{ marginTop: 16 }}>
            <Text>
              Working days: <Text strong>{workingDaysCount}</Text>
            </Text>
            <br />
            <Text>
              Working hours (8h/day): <Text strong>{workingHours}H</Text>
            </Text>
          </div>
        </Card>
      </div>
    </ConfigProvider>
  );
};

export default App;
