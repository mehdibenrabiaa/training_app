import { Button, Flex, Typography } from "antd";
import { HomeFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title } = Typography;
type SectionTopBarProps = {
  title: string;
};
const SectionTopBar: React.FC<SectionTopBarProps> = ({ title }) => {
  return (
    <Flex
      justify="space-between"
      style={{
        margin: 0,
        padding: "6px 10px",
        backgroundColor: "rgb(55, 0, 180)",
      }}
    >
      <Title style={{ color: "#ffffff", margin: 5 }} level={4}>
        {title}
      </Title>
      <Link to="/">
        <Button>
          <HomeFilled style={{ color: "rgb(55, 0, 180)" }} />
        </Button>
      </Link>
    </Flex>
  );
};

export default SectionTopBar;
