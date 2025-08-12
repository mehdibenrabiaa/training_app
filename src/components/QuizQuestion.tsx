import { useState } from "react";
import { Card, Col, Row, Typography, Badge, Button } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

interface Option {
  key: number; // Unique identifier for the question
  option: string; // The text of the question/option
}

interface QuizElement {
  question: string;
  options: Option[]; // An array of Question objects
  answer: number; // The key of the correct answer
  explanation: React.ReactNode; // Explanation of the correct answer
}

interface QuizQuestionProps {
  element: QuizElement; // The prop that takes a QuizElement object
  index: number;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ element, index }) => {
  const [answerSelected, setAnswerSelected] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [coloring, setColoring] = useState([0, 0, 0, 0]); // for 4 options, 0 means
  const { question, options, answer, explanation } = element;

  const selectOption = (answerSelectedIndex: number) => {
    setAnswerSelected(true);
    if (answer === answerSelectedIndex) {
      setCorrect(true);
      setColoring((prevState) => {
        setAnswerSelected(true);

        const newState = [...prevState];
        newState[answerSelectedIndex] = 1;
        return newState;
      });
    } else {
      setCorrect(false);
      setColoring((prevState) => {
        setAnswerSelected(true);

        const newState = [...prevState];
        newState[answerSelectedIndex] = 2;
        return newState;
      });
    }
  };

  return (
    <Card>
      <div style={{ marginBottom: 20 }}>Question: {index + 1}</div>
      <Row gutter={5} style={{ marginBottom: 30 }} justify="center">
        <Col span={24} style={{ textAlign: "center" }}>
          <Text style={{ fontSize: 18, fontWeight: 600, padding: 12 }}>
            {question}
          </Text>
        </Col>
      </Row>
      {answerSelected && (
        <div>
          {correct ? (
            <div>
              <Title
                level={1}
                style={{ textAlign: "center", color: "#73d13d" }}
              >
                Correct <SmileOutlined style={{ color: "#73d13d" }} />
              </Title>
            </div>
          ) : (
            <div>
              <Title
                level={1}
                style={{ textAlign: "center", color: "#ff4d4f" }}
              >
                Incorrect <FrownOutlined style={{ color: "#ff4d4f" }} />
              </Title>
            </div>
          )}
          <Card style={{ margin: "10px 0" }}>{explanation}</Card>
        </div>
      )}
      <Row gutter={[10, 10]} style={{ marginBottom: "15px" }}>
        {options.map((q, index) => {
          return (
            <Col key={`question${q.key}`} span={12}>
              <Badge.Ribbon text={index + 1} placement="start">
                <Button
                  style={{
                    backgroundColor:
                      coloring[index] == 1
                        ? "#73d13d"
                        : coloring[index] == 2
                        ? "#ff4d4f"
                        : "",
                  }}
                  disabled={answerSelected}
                  className="quiz-option"
                  block
                  onClick={() => {
                    selectOption(index);
                  }}
                >
                  {q.option}
                </Button>
              </Badge.Ribbon>
            </Col>
          );
        })}
      </Row>
    </Card>
  );
};

export default QuizQuestion;
