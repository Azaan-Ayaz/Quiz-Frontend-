// src/Quiz.js
import React, { useState, useEffect } from 'react';
import questionsData from '../data/Question.json'; 

const getDifficultyStars = (difficulty) => {
  const levels = {
    easy: 1,
    medium: 2,
    hard: 3
  };
  return Array(levels[difficulty] || 0).fill('★').join(' ');
};

const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;
  
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
};

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [userSelectedAnswer, setUserSelectedAnswer] = useState('');
  const [answerStatus, setAnswerStatus] = useState('');
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  useEffect(() => {
    setQuestions(questionsData);
  }, []);

  useEffect(() => {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion) {
      const allAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
      setShuffledAnswers(shuffleArray(allAnswers));
    }
  }, [currentQuestionIndex, questions]);

  const handleAnswer = (answer) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (answer === currentQuestion.correct_answer) {
      setScore(score + 1);
      setAnswerStatus('correct');
    } else {
      setAnswerStatus('incorrect');
    }
    setUserAnswer(answer);
    setUserSelectedAnswer(answer);
    setTimeout(() => {
      setUserAnswer('');
      setAnswerStatus('');
      setUserSelectedAnswer('');
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }, 1000);
  };

  if (currentQuestionIndex >= questions.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-4">Your score: {score} / {questions.length}</h1>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const difficultyStars = getDifficultyStars(currentQuestion.difficulty);
  const correctPercentage = questions.length > 0 ? (score / questions.length) * 100 : 0;

  // Calculate potential score if remaining questions are answered correctly
  const remainingQuestions = questions.length - (currentQuestionIndex + 1);
  const potentialMaxScore = score + remainingQuestions;
  const maxPossiblePercentage = (potentialMaxScore / questions.length) * 100;

  const isButtonDisabled = Boolean(answerStatus);
  const btnText = currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish";

  const handleNextQuestion = () => {
    if (currentQuestionIndex >= questions.length - 1) {
      // Navigate to results or perform final actions
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <>
      {/* Progress Bar */}
      <div className="w-full h-12 mt-0 flex flex-col items-center mb-4">
        <div className="w-full bg-gray-200 h-6 relative">
          <div
            className="bg-orange-500 h-6"
            style={{ width: `${progress}%` }}
          >
            
          </div>
          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm font-semibold text-orange-600">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full mt-2 flex justify-center">
          <span className="text-sm font-semibold text-orange-600">
            Correct Answers: {Math.round(correctPercentage)}%
          </span>
        </div>
      </div>

      <div className='flex justify-center'>
        <div className="flex mt-20 text-2xl font-poppins font-semibold justify-between mb-1 w-full max-w-lg">
          <span className="font-semibold text-5xl text-orange-600">
            Question {currentQuestionIndex + 1} / {questions.length}
          </span>
        </div>
      </div>

      <div className='ml-[588px] mt-16'>
        <div className="w-full max-w-md mb-0 flex flex-col font-poppins ">
          <span className="text-2xl text-orange-600 font-poppins font-normal ">
            {difficultyStars} 
          </span>
          <span className="text-2xl font-normal text-orange-600">
            {currentQuestion.category}
          </span>
        </div>
      </div>
      <div>

      <div className="flex flex-col mt-10 items-center justify-center bg-white p-4">
        <h2 className="text-3xl font-semibold mb-4 text-center">
          {decodeURIComponent(currentQuestion.question)}
        </h2>

        <div className="w-full max-w-[900px] grid grid-cols-2 gap-8">
          {shuffledAnswers.map((answer, index) => (
            <button
              key={index}
              className={`w-full px-4 py-2 text-xl rounded focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                answerStatus && userAnswer === decodeURIComponent(answer)
                  ? answer === decodeURIComponent(currentQuestion.correct_answer)
                    ? 'bg-green-500 text-white ring-green-500'
                    : 'bg-red-500 text-white ring-red-500'
                  : 'bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:border-white hover:text-white hover:border-2'
              }`}
              onClick={() => handleAnswer(decodeURIComponent(answer))}
              disabled={isButtonDisabled}
            >
              {decodeURIComponent(answer)}
            </button>
          ))}
        </div>
        {userAnswer && (
          <div className="mt-10 flex w-full flex-col items-center gap-6">
            <div className="text-4xl font-medium text-zinc-800">
              {userAnswer === currentQuestion.correct_answer ? "Correct!" : "Sorry!"}
            </div>
          </div>
        )}
      </div>
      </div>
      <div className='mt-36 mx-96'>

      {/* Potential Score Bar */}
      <div className="w-full h-6 mt-4 flex flex-col items-center mb-4">
        <div className="w-full bg-gray-200 h-6 relative">
          <div
            className="bg-orange-500 h-6"
            style={{ width: `${maxPossiblePercentage}%` }}
          ></div>
          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm font-semibold text-orange-600">
            {Math.round(maxPossiblePercentage)}%
          </span>
        </div>
        <div className="w-full mt-2 flex justify-center">
          <span className="text-lg font-semibold text-orange-600">
            Potential Score: {Math.round(maxPossiblePercentage)}%
          </span>
        </div>
      </div>
      </div>
    </>
  );
};

export default Quiz;
