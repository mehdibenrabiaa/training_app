import { useState } from "react";
import { Layout, Menu } from "antd";
import { ReadOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import SectionTopBar from "../components/SectionTopBar";
import History from "../components/RD Theory/History";
import RDDeduction from "../components/RD Theory/RDDeduction";
import EmployerContributions from "../components/RD Theory/EmployerContributions";
import RDTheoryEssentialsQuiz from "../components/RD Theory/RDTheoryEssentialsQuiz";
import RDTheorySummary from "../components/RD Theory/RDTheorySummary";
import EligibleEmployer from "../components/Financial Rules/EligibleEmployer";
import EligibleEmployee from "../components/Financial Rules/EligibleEmployee";
import ExceptionRule from "../components/Financial Rules/ExceptionRule";

const { Sider, Content } = Layout;

const items2: MenuProps["items"] = [
  {
    key: "sub1",
    icon: <ReadOutlined />,
    label: "Chapter I: Essentials",
    children: [
      { key: "History", label: "1 - History of the Swedish R&D" },
      { key: "RDDeduction", label: "2 - The Basis for R&D Deduction" },
      { key: "EmployerContributions", label: "3 - Employer Contributions" },
      { key: "RDTheorySummary", label: "4 - R&D Essentials Summmary" },
      { key: "RDTheoryEssentialsQuiz", label: "Essentials: Quiz!" },
    ],
  },
  {
    key: "sub2",
    icon: <ReadOutlined />,
    label: "Chapter II: Financial Rules",
    children: [
      {
        key: "EligibleEmployer",
        label: "1 - Eligible Employer",
      },
      { key: "EligibleEmployee", label: "2 - Eligible Employee" },
      { key: "ExceptionRule", label: "3 - Exception Rule" },
      { key: "option4", label: "option4" },
    ],
  },
];

function App() {
  const [currentPage, setCurrentPage] = useState<string>("History");

  // Handle the menu item click
  const handleMenuClick = (e: { key: string }) => {
    setCurrentPage(e.key);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="app-container">
      {/* Fixed Top Bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
          background: "#fff",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <SectionTopBar title={"Research & Development Theory"} />
      </div>

      <Layout>
        {/* Fixed Sider */}
        <Sider
          style={{
            position: "fixed",
            top: 50,
            left: 0,
            height: "calc(100vh - 64px)",
            background: "#fff",
            overflow: "auto",
            borderRight: "1px solid #ddd",
          }}
          width={300}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["History"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%" }}
            items={items2}
            onClick={handleMenuClick}
          />
        </Sider>

        {/* Adjust Content to avoid overlap */}
        <Layout style={{ marginLeft: 320, marginTop: 64 }}>
          <Content style={{ padding: "24px", minHeight: "calc(100vh - 64px)" }}>
            {currentPage === "History" && <History />}
            {currentPage === "RDDeduction" && <RDDeduction />}
            {currentPage === "EmployerContributions" && (
              <EmployerContributions />
            )}
            {currentPage === "RDTheoryEssentialsQuiz" && (
              <RDTheoryEssentialsQuiz />
            )}
            {currentPage === "RDTheorySummary" && <RDTheorySummary />}
            {currentPage === "EligibleEmployer" && <EligibleEmployer />}
            {currentPage === "EligibleEmployee" && <EligibleEmployee />}
            {currentPage === "ExceptionRule" && <ExceptionRule />}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
