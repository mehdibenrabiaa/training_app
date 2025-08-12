import React, { useEffect, useState, useRef } from "react";
import { Carousel, Typography, Button } from "antd";
import QuizQuestion from "../QuizQuestion";

const { Title } = Typography;

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap the elements at indices i and j
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const quizElements = [
  {
    question:
      "When a company qualifies for the R&D incentive, on which of the following does it receive a deduction?",
    options: [
      {
        key: 1,
        option:
          "The company receives a deduction on its general corporate taxes.",
      },
      {
        key: 2,
        option:
          "The company receives a deduction on its contribution to social security.",
      },
      {
        key: 3,
        option:
          "The deduction is applied to the general wage tax (11.62%) that the company pays on behalf of its employees.",
      },
      {
        key: 4,
        option:
          "Skatteverket pays a portion of the employees' salaries, and that is the deduction.",
      },
    ],
    answer: 1,
    explanation: (
      <div>
        <Title style={{ marginTop: 5 }} level={5}>
          More Info:
        </Title>
        When a company qualifies for the R&D incentive in Sweden, the deduction
        applies to the employer's <strong>social security contributions</strong>{" "}
        related to qualifying R&D employees. The idea is that reducing the
        social security contributions for these employees lowers the overall
        cost of conducting R&D, thus incentivizing innovation.
      </div>
    ),
  },
  {
    question:
      "What is the total employer contribution rate (Arbetsgivaravgift) in Sweden for 2024?",
    options: [
      { key: 1, option: "25.00%" },
      { key: 2, option: "31.42%" },
      { key: 3, option: "35.10%" },
      { key: 4, option: "29.50%" },
    ],
    answer: 1,
    explanation: (
      <div>
        <Title style={{ marginTop: 5 }} level={5}>
          More Info:
        </Title>
        The total employer contribution rate in Sweden for 2024 is{" "}
        <strong>31.42%</strong>. This rate includes various components such as
        retirement pension, health insurance, parental insurance, and more.
      </div>
    ),
  },
  {
    question:
      "Which component of the employer’s contributions has a legally required minimum rate that cannot be reduced?",
    options: [
      { key: 1, option: "Health insurance fee" },
      { key: 2, option: "Retirement pension contribution" },
      { key: 3, option: "General wage contribution" },
      { key: 4, option: "Labor market contribution" },
    ],
    answer: 1,
    explanation: (
      <div>
        <Title style={{ marginTop: 5 }} level={5}>
          More Info:
        </Title>
        The <strong>retirement pension contribution</strong> has a statutory
        minimum that cannot fall below 10.21%, regardless of any deductions.
      </div>
    ),
  },
  {
    question:
      "What is the percentage of an employee’s salary that can be deducted from the social security contributions through the R&D tax incentive?",
    options: [
      { key: 1, option: "10%" },
      { key: 2, option: "15%" },
      { key: 3, option: "20%" },
      { key: 4, option: "25%" },
    ],
    answer: 2,
    explanation: (
      <div>
        <Title style={{ marginTop: 5 }} level={5}>
          More Info:
        </Title>
        The R&D deduction allows companies to reduce employer contributions by
        up to <strong>20% of the taxable salary</strong> for qualifying R&D
        employees.
      </div>
    ),
  },
  {
    question:
      "What is the employer’s total cost for an employee with a gross salary of SEK 50,000/month without the R&D deduction?",
    options: [
      { key: 1, option: "SEK 60,000" },
      { key: 2, option: "SEK 65,710" },
      { key: 3, option: "SEK 55,000" },
      { key: 4, option: "SEK 70,000" },
    ],
    answer: 1,
    explanation: (
      <div>
        <Title style={{ marginTop: 5 }} level={5}>
          More Info:
        </Title>
        Without the R&D deduction, the employer pays the full 31.42%
        contribution. So, for a salary of SEK 50,000, the employer pays an
        additional SEK 15,710 in social security contributions, totaling{" "}
        <strong>SEK 65,710</strong>.
      </div>
    ),
  },
  {
    question:
      "Why is it important to understand social security contributions when discussing the R&D tax deduction?",
    options: [
      {
        key: 1,
        option: "Because employees can reclaim a portion of their own tax.",
      },
      {
        key: 2,
        option: "Because deductions are calculated from corporate income tax.",
      },
      {
        key: 3,
        option:
          "Because the R&D deduction reduces the employer’s social contributions directly.",
      },
      {
        key: 4,
        option:
          "Because these deductions increase the salary of R&D employees.",
      },
    ],
    answer: 2,
    explanation: (
      <div>
        <Title style={{ marginTop: 5 }} level={5}>
          More Info:
        </Title>
        The R&D deduction is specifically applied to the{" "}
        <strong>employer’s social security contributions</strong>, not corporate
        tax or employee wages. This is why understanding how these contributions
        are calculated is essential for applying the deduction properly.
      </div>
    ),
  },
];

const shuffledQuestions = shuffleArray(quizElements);

const RDTheoryQuiz = () => {
  const [animation, setAnimation] = useState("animation-class");
  const carouselRef = useRef<React.ElementRef<typeof Carousel>>(null); // Create a reference to the Carousel

  useEffect(() => {
    setAnimation("animation-release");
  }, []);

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next(); // Move to the next slide
    }
  };

  return (
    <div className={`app-container ${animation}`} style={{ maxWidth: 900 }}>
      <Button onClick={handleNext} style={{ marginBottom: 5 }}>
        NEXT
      </Button>
      <Carousel ref={carouselRef} effect="fade" dots={false}>
        {shuffledQuestions.map((element, index) => {
          return <QuizQuestion element={element} index={index} />;
        })}
      </Carousel>
    </div>
  );
};

export default RDTheoryQuiz;
