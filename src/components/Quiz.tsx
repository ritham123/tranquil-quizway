
import { useState } from "react";
import { questions } from "../data/questions";
import Timer from "./Timer";
import { ChevronRight, CheckSquare } from "lucide-react";
import { toast } from "sonner";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [markedForReview, setMarkedForReview] = useState<boolean[]>(Array(questions.length).fill(false));
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    if (isSubmitted) return;
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else if (!isSubmitted) {
      handleSubmit();
    }
  };

  const toggleMarkForReview = () => {
    const newMarked = [...markedForReview];
    newMarked[currentQuestion] = !newMarked[currentQuestion];
    setMarkedForReview(newMarked);
    toast.success(newMarked[currentQuestion] ? "Marked for review" : "Removed from review");
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const score = selectedAnswers.reduce((acc, answer, index) => {
      return acc + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
    toast.success(`Quiz completed! Score: ${score}/${questions.length}`);
  };

  const handleTimeUp = () => {
    if (!isSubmitted) {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <Timer duration={15} onTimeUp={handleTimeUp} />
          <div className="flex items-center gap-4">
            <button
              onClick={toggleMarkForReview}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-smooth
                ${markedForReview[currentQuestion] 
                  ? 'bg-yellow-50 text-yellow-600' 
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
            >
              <CheckSquare className="w-4 h-4" />
              <span className="text-sm">Review</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">Question {currentQuestion + 1} of {questions.length}</span>
              {markedForReview[currentQuestion] && (
                <span className="text-sm text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
                  Marked for review
                </span>
              )}
            </div>
            <h2 className="text-xl font-medium text-gray-900">{questions[currentQuestion].text}</h2>
          </div>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full text-left p-4 rounded-lg transition-smooth
                  ${selectedAnswers[currentQuestion] === index 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}
                  ${isSubmitted && index === questions[currentQuestion].correctAnswer 
                    ? 'bg-green-500 text-white' 
                    : ''}`}
                disabled={isSubmitted}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {Array(questions.length).fill(0).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-smooth
                  ${currentQuestion === index ? 'bg-gray-900' : 'bg-gray-200'}
                  ${selectedAnswers[index] !== -1 ? 'bg-gray-400' : ''}
                  ${markedForReview[index] ? 'bg-yellow-400' : ''}`}
              />
            ))}
          </div>
          
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg 
              hover:bg-gray-800 transition-smooth"
          >
            <span>{currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
