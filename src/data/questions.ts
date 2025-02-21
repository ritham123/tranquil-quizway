
export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export const questions: Question[] = [
  {
    id: 1,
    text: "What principle emphasizes the importance of removing unnecessary elements in design?",
    options: [
      "Maximum utilization",
      "Minimalism",
      "Complexity theory",
      "Pattern recognition"
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    text: "Which design approach focuses on making products as useful as possible?",
    options: [
      "Aesthetic design",
      "Functional design",
      "Decorative design",
      "Abstract design"
    ],
    correctAnswer: 1
  },
  {
    id: 3,
    text: "What quality is essential for creating long-lasting design solutions?",
    options: [
      "Trendiness",
      "Timelessness",
      "Complexity",
      "Ornamentation"
    ],
    correctAnswer: 1
  },
  {
    id: 4,
    text: "Which element is crucial for maintaining visual hierarchy in design?",
    options: [
      "Equal emphasis",
      "Random placement",
      "Consistent spacing",
      "Cluttered layout"
    ],
    correctAnswer: 2
  },
  {
    id: 5,
    text: "What characteristic defines good design according to modern principles?",
    options: [
      "Innovation",
      "Decoration",
      "Complexity",
      "Randomness"
    ],
    correctAnswer: 0
  }
];
