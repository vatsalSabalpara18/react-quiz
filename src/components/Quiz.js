import React, { useState } from "react";
import quizData from "../utils/quiz.json";

export default function Quiz() {
    const [quiz, setQuiz] = useState(quizData);
    const [count, setCount] = useState(0);
    const [result, setResult] = useState(null);

    const handlePrevious = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    const handleNext = () => {
        if (count < quiz.length - 1) {
            setCount(count + 1);
        }
    };

    const handleSelectChange = (event) => {
        // console.log("select value", event.target.value);
        const quizArr = quiz.map((value, index) =>
            count === index ? { ...value, selectedValue: event.target.value } : value
        );
        setQuiz(quizArr);
    };

    const handleSubmit = () => {
        const getResult = quiz?.reduce((acc, value) => {
            if (value?.selectedValue) {
                if (value?.selectedValue === value?.correctAnswer) {
                    acc++;
                }
            }
            return acc;
        }, 0);
        setResult(getResult);
    };

    // console.log("count" , count)
    // console.log("quiz", quiz)

    return (
        <div className="container">
            <h2 style={{ textAlign: "center" }}>React Quiz</h2>
            {result === null ? (
                <>
                    <div className="btn">
                        <button className="style-button" onClick={handlePrevious}>
                            {"<< Previous"}
                        </button>
                        <button className="style-button" onClick={handleNext}>
                            {">> Next"}
                        </button>
                    </div>
                    <div className="quiz-Outside">
                        <div className="quiz-inside">
                            <h3>Q.{count + 1 + " " + quiz[count].question}</h3>
                            {quiz[count]?.options.map((option, opIndex) => {                                
                                return (
                                    <div key={opIndex + 1}>
                                        <input
                                            type="radio"
                                            value={option}
                                            checked={quiz[count]?.selectedValue === option}
                                            onChange={handleSelectChange}
                                        />{" "}
                                        {option}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="btn" style={{ marginTop: "5px" }}>
                        <div></div>
                        {count === quiz.length - 1 ? (
                            <button onClick={handleSubmit}>Submit The Quiz</button>
                        ) : null}
                    </div>
                </>
            ) : (
                <h1>
                    Congratulation! You get {result} out of the {quiz.length}
                </h1>
            )}
            {/* <div>
                {
                    result !== null ?  : null
                }
            </div> */}
        </div>
    );
}
