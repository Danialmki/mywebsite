"use client";

import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

// Types
interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: number;
  question: ReactNode;
  options: Option[];
  explanation: string;
}

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedAnswerId: string | null;
  hasAnswered: boolean;
  onSelectAnswer: (optionId: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

// Sample Questions Data
const questions: Question[] = [
  {
    id: 1,
    question: "Hii",
    options: [
      { id: "a", text: "HI", isCorrect: true },
      { id: "b", text: "WHO IS THIS", isCorrect: false },
      { id: "c", text: "BYEE!", isCorrect: false },
    ],
    explanation:
      "Nice to meet you! Let's get started with the quiz.",
  },
  {
    id: 2,
    question: "Do you want to continue?",
    options: [
      { id: "yes", text: "YES", isCorrect: true },
      { id: "no", text: "NO", isCorrect: false },
    ],
    explanation:
      "Great choice! Let's continue with the quiz.",
  },
  {
    id: 3,
    question: "Do you want to talk?",
    options: [
      { id: "yes", text: "YES", isCorrect: true },
      { id: "no", text: "NO", isCorrect: false },
    ],
    explanation:
      "Great! Let's continue our conversation.",
  },
  {
    id: 4,
    question: "We don't necessarily need to talk about ourselves, We can talk about stuff, You know life and things like that.",
    options: [
      { id: "a", text: "OKAY 😊", isCorrect: true },
      { id: "b", text: "Lemme think.", isCorrect: false },
      { id: "c", text: "Ok, maybe we can talk.", isCorrect: false },
    ],
    explanation:
      "Perfect! Let's have a great conversation about life and everything.",
  },
  {
    id: 5,
    question: "If you are mad at me, i create a dummy of myself and you can hit me with a bat as much as you want :)",
    options: [
      { id: "a", text: "That's sweet!", isCorrect: true },
      { id: "b", text: "I'm not mad at you", isCorrect: true },
      { id: "c", text: "Sounds fun!", isCorrect: true },
    ],
    explanation:
      "I just want to make sure you're happy! 😊",
  },
  {
    id: 6,
    question: (
      <a
        href="https://open.spotify.com/playlist/731oeeAwoskoZd5Tp2JduR?si=6v-qpqhyTOSGETWDAOD1pg&pi=VGWtcdbKSEand"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-4 py-8 text-center hover:scale-110 transition-transform duration-300 cursor-pointer"
        aria-label="Open the Spotify playlist"
      >
        <svg
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="w-32 h-32 fill-[#1DB954]"
        >
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
        <p className="text-base text-muted-foreground">
          I created a playlist for when I'm thinking about you. Take a look!
        </p>
      </a>
    ) as any,
    options: [
      { id: "a", text: "Continue", isCorrect: true },
    ],
    explanation:
      "Give this playlist a listen: Joje",
  },
  {
    id: 7,
    question: (
      <div className="space-y-4">
        <p className="text-base leading-relaxed text-center justify-content-center align-middle space-x-5 space-y-10 ">
          I didn’t know how to make a link that opens iMessage directly,
          but here are directions you can follow:
          OPEN MESSAGES &gt; FIND DANIAL
          (OR WHATEVER YOU SAVED ME AS, LIKE " THAT DOUCHEBAG WHO LEFT ME AND NOW TRYS TO WIN ME BACK! ") &gt; WRITE AN OFFENSIVE BUT CUTE MESSAGE &gt; TAP THE BLUE
          SEND BUTTON.
        </p>
      </div>
    ) as any,
    options: [],
    explanation:
      "You can always come back and continue whenever you like.",
  },
];

// Animation variants
const fadeVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// QuestionCard Component
function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswerId,
  hasAnswered,
  onSelectAnswer,
  onNext,
  onPrev,
}: QuestionCardProps) {
  const selectedOption = question.options.find(
    (opt) => opt.id === selectedAnswerId
  );

  return (
    <Card className="shadow-xl border-2">
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl leading-tight text-card-foreground">
          {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Answer Options */}
        <div className="space-y-3">
          {question.options.map((option) => {
            const isSelected = selectedAnswerId === option.id;
            const isCorrect = option.isCorrect;
            const showCorrectness = hasAnswered;

            return (
              <Button
                key={option.id}
                onClick={() => onSelectAnswer(option.id)}
                disabled={hasAnswered}
                variant="outline"
                className={`w-full justify-start text-left h-auto py-4 px-6 transition-all ${
                  showCorrectness && isSelected && isCorrect
                    ? "border-green-500 bg-green-500/10 hover:bg-green-500/20"
                    : showCorrectness && isSelected && !isCorrect
                    ? "border-destructive bg-destructive/10 hover:bg-destructive/20"
                    : isSelected && !showCorrectness
                    ? "bg-primary/10 border-primary hover:bg-primary/20"
                    : ""
                }`}
              >
                <span className="text-base font-medium">
                  {option.text}
                </span>
              </Button>
            );
          })}
        </div>

        {/* Explanation */}
        <AnimatePresence>
          {hasAnswered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div
                className={`rounded-lg p-5 border ${
                  selectedOption?.isCorrect
                    ? "bg-green-500/10 border-green-500"
                    : "bg-destructive/10 border-destructive"
                }`}
              >
                <h3 className="font-semibold mb-2 text-lg text-card-foreground">
                  {selectedOption?.isCorrect ? "✓ Correct!" : "✗ Incorrect"}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {question.explanation}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={onPrev}
          disabled={currentIndex === 0}
          variant="ghost"
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button
          onClick={onNext}
          className="gap-2"
        >
          {currentIndex === totalQuestions - 1 ? "Finish" : "Next"}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({});
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0);
  const [noPosition, setNoPosition] = useState({ top: 0, left: 0 });
  const [question1Text, setQuestion1Text] = useState("Hii");
  const [question1ClickCount, setQuestion1ClickCount] = useState(0);
  const [noClickCount2, setNoClickCount2] = useState(0);
  const [noPosition2, setNoPosition2] = useState({ top: 0, left: 0 });
  const [clickMarks, setClickMarks] = useState<{ x: number; y: number; id: number }[]>([]);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isCursorAnimating, setIsCursorAnimating] = useState(false);
  const [headScale, setHeadScale] = useState(1);

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswerId = selectedAnswers[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleSelectAnswer = (optionId: string) => {
    // Special handling for first question (Hii)
    if (currentQuestionIndex === 0 && optionId !== "a") {
      setQuestion1ClickCount((prev) => prev + 1);
      if (question1ClickCount === 0) {
        setQuestion1Text("I Said HIII !!!");
      } else {
        setQuestion1Text("HELLOOOOO ????");
      }
      return;
    }

    // Special handling for second question (YES/NO)
    if (currentQuestionIndex === 1 && optionId === "no") {
      setNoClickCount((prev) => prev + 1);
      // Move NO button to random position
      const randomTop = Math.random() * 70 + 10; // 10-80%
      const randomLeft = Math.random() * 70 + 10; // 10-80%
      setNoPosition({ top: randomTop, left: randomLeft });
      return;
    }

    // Special handling for third question (YES/NO)
    if (currentQuestionIndex === 2 && optionId === "no") {
      setNoClickCount2((prev) => prev + 1);
      // Move NO button to random position
      const randomTop = Math.random() * 70 + 10; // 10-80%
      const randomLeft = Math.random() * 70 + 10; // 10-80%
      setNoPosition2({ top: randomTop, left: randomLeft });
      return;
    }

    if (hasAnswered) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionId,
    }));
    setHasAnswered(true);

    // Check if answer is correct
    const selectedOption = currentQuestion.options.find(
      (opt) => opt.id === optionId
    );
    if (selectedOption?.isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex === totalQuestions - 1) {
      setShowResults(true);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setHasAnswered(!!selectedAnswers[currentQuestionIndex + 1]);
      // Reset click marks and head scale when leaving question 5
      if (currentQuestionIndex === 4) {
        setClickMarks([]);
        setHeadScale(1);
      }
    }
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prev) => prev - 1);
    setHasAnswered(!!selectedAnswers[currentQuestionIndex - 1]);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setHasAnswered(false);
    setScore(0);
    setShowResults(false);
    setNoClickCount(0);
    setNoPosition({ top: 0, left: 0 });
    setQuestion1Text("Hii");
    setQuestion1ClickCount(0);
    setNoClickCount2(0);
    setNoPosition2({ top: 0, left: 0 });
    setClickMarks([]);
    setHeadScale(1);
  };



  const selectedOption = currentQuestion?.options.find(
    (opt) => opt.id === selectedAnswerId
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">
              D&D
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-16">
        <div className="flex min-h-[calc(100vh-200px)] items-center justify-center">
          <div className="w-full max-w-2xl">
            <AnimatePresence mode="wait">
              {showResults ? (
                // Results Card
                <motion.div
                  key="results"
                  variants={fadeVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <Card className="shadow-xl border-2">
                    <CardHeader className="text-center pb-4">
                      <CardTitle className="text-3xl font-bold text-card-foreground">
                        Quiz Complete! 🎉
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-6 py-8">
                      <div className="space-y-2">
                        <p className="text-6xl font-bold text-card-foreground">
                          {score}/{totalQuestions}
                        </p>
                        <p className="text-xl text-muted-foreground">
                          Correct Answers
                        </p>
                      </div>
                      <div className="pt-4">
                        <p className="text-lg text-muted-foreground">
                          {score === totalQuestions
                            ? "Perfect score! You're a master! 🏆"
                            : score >= totalQuestions * 0.7
                            ? "Great job! Well done! 👏"
                            : score >= totalQuestions * 0.5
                            ? "Good effort! Keep learning! 📚"
                            : "Keep practicing! You'll improve! 💪"}
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="justify-center">
                      <Button
                        onClick={handleRestart}
                        size="lg"
                        className="gap-2"
                      >
                        <RotateCcw className="h-4 w-4" />
                        Restart Quiz
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ) : (
                // Question Card
                <motion.div
                  key={currentQuestion.id}
                  variants={fadeVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <Card className="shadow-xl border-2">
                    <CardHeader>
                      <CardTitle className={`text-2xl md:text-3xl leading-tight text-card-foreground ${
                        currentQuestionIndex === 0 && question1ClickCount >= 1 ? "font-extrabold" : ""
                      }`}>
                        {currentQuestionIndex === 0 ? question1Text : currentQuestion.question}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Answer Options */}
                      {currentQuestionIndex === 4 ? (
                        // Special layout for Question 5 (head with baseball stick marks)
                        <div 
                          className="relative min-h-[400px] bg-muted/30 rounded-lg overflow-hidden" 
                          style={{ cursor: 'none' }}
                          onMouseMove={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                          }}
                          onMouseLeave={() => setCursorPos({ x: -100, y: -100 })}
                          onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const y = e.clientY - rect.top;
                            
                            // Trigger cursor animation
                            setIsCursorAnimating(true);
                            setTimeout(() => setIsCursorAnimating(false), 300);
                            
                            // Shrink the head by 5%
                            setHeadScale(prev => prev * 0.95);
                            
                            // Add random offset to make it look like bat spots
                            const randomOffsetX = (Math.random() - 0.5) * 60;
                            const randomOffsetY = (Math.random() - 0.5) * 60;
                            
                            setClickMarks(prev => [...prev, { 
                              x: x + randomOffsetX, 
                              y: y + randomOffsetY, 
                              id: Date.now() + Math.random() 
                            }]);
                          }}
                        >
                          {/* Custom animated cursor */}
                          <motion.div
                            className="absolute pointer-events-none z-50"
                            animate={{
                              left: `${cursorPos.x}px`,
                              top: `${cursorPos.y}px`,
                              rotate: isCursorAnimating ? 30 : 0
                            }}
                            transition={{
                              left: { duration: 0, ease: "linear" },
                              top: { duration: 0, ease: "linear" },
                              rotate: { duration: 0.3, ease: "easeOut" }
                            }}
                            style={{
                              transform: 'translate(-8px, -8px)'
                            }}
                          >
                            <svg
                              width="40"
                              height="40"
                              viewBox="0 -0.5 17 17"
                              xmlns="http://www.w3.org/2000/svg"
                              className="text-primary"
                            >
                              <path
                                d="M3.291,15.114 L3.016,14.837 C6.416,10.782 10.014,9.208 12.914,6.673 C15.865,4.094 16.016,3.788 16.364,3.439 C17.186,2.617 17.234,1.334 16.473,0.572 C15.71,-0.191 14.426,-0.143 13.604,0.679 C13.255,1.027 12.949,1.179 10.371,4.129 C7.836,7.03 5.914,10.614 2.186,14.01 L1.91,13.733 C1.774,13.597 1.479,13.673 1.25,13.902 C1.021,14.131 0.945,14.425 1.082,14.562 L2.464,15.943 C2.6,16.08 2.895,16.004 3.124,15.775 C3.352,15.546 3.429,15.251 3.291,15.114 L3.291,15.114 Z"
                                fill="currentColor"
                              />
                            </svg>
                          </motion.div>
                          {/* The "head" circle */}
                          <motion.div
                            animate={{ scale: headScale }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                            title="Click me!"
                          >
                            <img 
                              src="/Subject.png" 
                              alt="Subject" 
                              className="w-72 h-72 object-cover rounded-full"
                            />
                          </motion.div>
                          
                          {/* Render baseball stick SVGs at click positions */}
                          {clickMarks.map((mark, index) => (
                            <motion.div
                              key={mark.id}
                              className="absolute pointer-events-none"
                              initial={{ 
                                left: `${mark.x}px`,
                                top: `${mark.y}px`,
                                rotate: -30,
                                opacity: 0,
                                scale: 0.5
                              }}
                              animate={{ 
                                left: `${mark.x}px`,
                                top: `${mark.y}px`,
                                rotate: 0,
                                opacity: 1,
                                scale: 1
                              }}
                              transition={{ 
                                duration: 0.3,
                                ease: "easeOut"
                              }}
                              style={{
                                transform: 'translate(-50%, -50%)'
                              }}
                            >
                              <svg
                                width="40"
                                height="40"
                                viewBox="0 -0.5 17 17"
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-primary"
                              >
                                <path
                                  d="M3.291,15.114 L3.016,14.837 C6.416,10.782 10.014,9.208 12.914,6.673 C15.865,4.094 16.016,3.788 16.364,3.439 C17.186,2.617 17.234,1.334 16.473,0.572 C15.71,-0.191 14.426,-0.143 13.604,0.679 C13.255,1.027 12.949,1.179 10.371,4.129 C7.836,7.03 5.914,10.614 2.186,14.01 L1.91,13.733 C1.774,13.597 1.479,13.673 1.25,13.902 C1.021,14.131 0.945,14.425 1.082,14.562 L2.464,15.943 C2.6,16.08 2.895,16.004 3.124,15.775 C3.352,15.546 3.429,15.251 3.291,15.114 L3.291,15.114 Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </motion.div>
                          ))}
                        </div>
                      ) : currentQuestionIndex === 1 || currentQuestionIndex === 2 ? (
                        // Special layout for YES/NO questions
                        <div className="relative min-h-[300px] flex items-center justify-center">
                          <div className="flex gap-4 items-center justify-center">
                            <motion.div
                              animate={{
                                scale: (currentQuestionIndex === 1 ? noClickCount : noClickCount2) > 0 ? 1 + (currentQuestionIndex === 1 ? noClickCount : noClickCount2) * 0.05 : 1,
                                rotate: (currentQuestionIndex === 1 ? noClickCount : noClickCount2) > 0 ? (Math.random() - 0.5) * 4 : 0,
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              <Button
                                onClick={() => handleSelectAnswer("yes")}
                                disabled={hasAnswered}
                                variant="default"
                                className={`h-auto py-6 px-12 text-2xl font-bold ${
                                  hasAnswered && selectedAnswerId === "yes"
                                    ? "border-green-500 bg-green-500/10"
                                    : ""
                                }`}
                              >
                                YES
                              </Button>
                            </motion.div>

                            <motion.div
                              animate={{
                                scale: (currentQuestionIndex === 1 ? noClickCount : noClickCount2) > 0 ? 1 - (currentQuestionIndex === 1 ? noClickCount : noClickCount2) * 0.05 : 1,
                                top: (currentQuestionIndex === 1 ? noClickCount : noClickCount2) > 0 ? `${(currentQuestionIndex === 1 ? noPosition : noPosition2).top}%` : 0,
                                left: (currentQuestionIndex === 1 ? noClickCount : noClickCount2) > 0 ? `${(currentQuestionIndex === 1 ? noPosition : noPosition2).left}%` : 0,
                              }}
                              transition={{ duration: 0.2 }}
                              style={{
                                position: (currentQuestionIndex === 1 ? noClickCount : noClickCount2) > 0 ? "absolute" : "relative",
                              }}
                            >
                              <Button
                                onClick={() => handleSelectAnswer("no")}
                                disabled={hasAnswered}
                                variant="outline"
                                className="h-auto py-6 px-12 text-2xl font-bold"
                              >
                                NO
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                      ) : (
                        // Normal layout for other questions
                        <div className="space-y-3">
                          {currentQuestion.options.map((option) => {
                            const isSelected = selectedAnswerId === option.id;
                            const isCorrect = option.isCorrect;
                            const showCorrectness = hasAnswered;

                            return (
                              <Button
                                key={option.id}
                                onClick={() => handleSelectAnswer(option.id)}
                                disabled={hasAnswered}
                                variant="outline"
                                className={`w-full justify-start text-left h-auto py-4 px-6 transition-all ${
                                  showCorrectness && isSelected && isCorrect
                                    ? "border-green-500 bg-green-500/10 hover:bg-green-500/20"
                                    : showCorrectness && isSelected && !isCorrect
                                    ? "border-destructive bg-destructive/10 hover:bg-destructive/20"
                                    : isSelected && !showCorrectness
                                    ? "bg-primary/10 border-primary hover:bg-primary/20"
                                    : ""
                                }`}
                              >
                                <span className="text-base font-medium">
                                  {option.text}
                                </span>
                              </Button>
                            );
                          })}
                        </div>
                      )}

                      {/* Explanation */}
                      <AnimatePresence>
                        {hasAnswered && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <div
                              className={`rounded-lg p-4 border ${
                                selectedOption?.isCorrect
                                  ? "bg-green-500/10 border-green-500"
                                  : "bg-destructive/10 border-destructive"
                              }`}
                            >
                              <h3 className="font-semibold mb-2 text-lg text-card-foreground">
                                {selectedOption?.isCorrect
                                  ? "✓ Correct!"
                                  : "✗ Incorrect"}
                              </h3>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {currentQuestion.explanation}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        onClick={handlePrevious}
                        disabled={currentQuestionIndex === 0}
                        variant="ghost"
                        className="gap-2"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </Button>
                      <Button
                        onClick={() => {
                          handleNext();
                        }}
                        className="gap-2"
                      >
                        {currentQuestionIndex === totalQuestions - 1
                          ? "Finish"
                          : "Next"}
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>


          </div>
        </div>
      </main>
    </div>
  );
}
