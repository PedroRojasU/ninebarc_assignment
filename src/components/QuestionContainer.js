import React, { useState } from 'react';
import './QuestionContainer.scss';

import questions from '../assets/data/questions.json';
import * as costs from '../assets/data/costs';
import questionSelector from '../services/questionSelector';
import validateInput from '../services/validateInput';
import { rules } from '../services/questionSelector';

const QuestionContainer = props => {

    const [currentQuestionText, setCurrentQuestionText] = useState(questions.getName);
    const [questionLog, setQuestionLog] = useState([]);
    const [currentInputValue, setCurrentInputValue] = useState("");
    const [currentChoiceValue, setCurrentChoiceValue] = useState("");
    const [userName, setUserName] = useState("");
    const [numberOfPassengers, setNumberOfPassengers] = useState(1);
    const [age, setAge] = useState([]);//[44,12,33,2,4]
    const [areReducedTickets, setAreReducedTickets] = useState(false);
    const [bicycles, setBicycles] = useState(0);
    const [zone, setZone] = useState([]); //["ABC","AB"]
    const [ridesPerDay, setRidesPerDay] = useState([]); //[1, 2, 5, 10]
    const [stayTimeDays, setStayTimeDays] = useState(1); //[1, 2, 5, 10]
    const [costPerDay, setCostPerDay] = useState([]); //wip
    const [isSingleRide, setIsSingleRide] = useState();
    const [isSigleDay, setIsSingleDay] = useState();
    const [isShortRide, setIsShortRide] = useState();
    const [manyRides, setManyRides] = useState();
    const [bicycleSubtotal, setBicycleSubtotal] = useState(0);
    const [treeLocation, setTreeLocation] = useState([]);

    const [stage, setStage] = useState("questions");

    // console.log(costs);

    const inputChangeHandler = e => {
        setCurrentInputValue(e.target.value);
    }

    const questionChangeHandler = () => {

        console.log(currentInputValue);
        // setQuestionLog(prevState => [...prevState].push({ question: currentQuestionText, answer: currentInputValue }));

        // if (userName === "" && validateInput("name", currentInputValue)) {
        //     setUserName(currentInputValue);
        //     setCurrentInputValue("");
        //     setCurrentQuestionText(questions.getAgeOfPassenger);
        //     return;
        // }
        // if (age === "" && validateInput("age", currentInputValue)) {
        //     setAge(currentInputValue);
        //     age <= 14 ? setAreReducedTickets(true) : setAreReducedTickets(false);
        //     setCurrentInputValue("");
        //     setCurrentQuestionText(questions.bikes);
        //     return;
        // }
        // if (bicycles === "" && validateInput("bicycle", currentInputValue)) {
        //     setBicycles(currentInputValue);
        //     setCurrentInputValue("");
        //     return;
        // }
        console.log(questionLog);

        if (!questionLog.slice(-1)[0] && validateInput("name", currentInputValue)) {
            setQuestionLog(prevState => [...prevState, { question: currentQuestionText, answer: currentInputValue, key: "name" }]);
            setCurrentInputValue("");
            setCurrentQuestionText(questions.getAgeOfPassenger);
            return;
        }
        if (questionLog.slice(-1)[0].key === "name" && validateInput("age", currentInputValue)) {
            setQuestionLog(prevState => [...prevState, { question: currentQuestionText, answer: currentInputValue, key: "age" }]);
            rules.ridingRules.ageGroup.forEach(rule => {
                if (currentInputValue >= rule.min && currentInputValue <= rule.max) {
                    setAreReducedTickets(rule.isReducedPrice);
                }
            });
            setCurrentInputValue("");
            setCurrentQuestionText(questions.singleRide);
            return;
        }
        if (questionLog.slice(-1)[0].key === "age" && validateInput("single ride", currentInputValue)) {
            setQuestionLog(prevState => [...prevState, { question: currentQuestionText, answer: currentInputValue, key: "single ride" }]);
            if (currentInputValue.toLowerCase().trim() === "yes") {
                setCurrentQuestionText(questions.zone);
                setTreeLocation(["single ride"]);
            } else {
                setCurrentQuestionText(questions.singleDay);
                setTreeLocation(["multiple ride"]);
            }
            setCurrentInputValue("");
            return;
        }
        if (treeLocation.slice(-1)[0] === "single ride" && validateInput("zone", currentInputValue)) {
            setQuestionLog(prevState => [...prevState, { question: currentQuestionText, answer: currentInputValue, key: "zone" }]);
            setCurrentQuestionText(questions.short);
            setTreeLocation(prevState => [...prevState, "zone"]);
            setCurrentInputValue("");
            return;
        }
        if (treeLocation.slice(-1)[0] === "multiple ride" && validateInput("single day", currentInputValue)) {
            setQuestionLog(prevState => [...prevState, { question: currentQuestionText, answer: currentInputValue, key: "single day" }]);
            setCurrentQuestionText(questions.zone);
            if (currentInputValue.toLowerCase().trim() === "yes") {
                setTreeLocation(prevState => [...prevState, "single day"]);
            } else {
                setTreeLocation(prevState => [...prevState, "multiple day"]);
            }
            setCurrentInputValue("");
            return;
        }






        // if (questionLog.slice(-1)[0].key === "age" && validateInput("bikes", currentInputValue)) {
        //     setQuestionLog(prevState => [...prevState, { question: currentQuestionText, answer: currentInputValue, key: "bikes" }]);
        //     setBicycleSubtotal(currentInputValue * costs.bikeFare)
        //     setCurrentInputValue("");
        //     setCurrentQuestionText(questions.singleRide);
        //     return;
        // }




        // if (questionLog.slice(-1)[0].key === "single ride" && validateInput("zone", currentInputValue)) {
        //     setQuestionLog(prevState => [...prevState, { question: currentQuestionText, answer: currentInputValue, key: "zone" }]);
        //     setIsSingleRide(true);
        //     setCurrentInputValue("");
        //     setCurrentQuestionText(questions.singleRide);
        //     return;
        // }
        if (isSingleRide) {
            if (isShortRide) {
                //Calculate bike subtotal
                //Get one short ride ticket
                return;
            } else {
                //Calculate bike subtotal
                //Get one one way ride ticket
                return;
            }
        } else {
            if (isSigleDay) {
                if (manyRides) {
                    //Calculate bike subtotal
                    //Get one day tickets
                    return;
                } else {
                    //Calculate bike subtotal
                    //Get X single ride tickets
                    return;
                }
            } else {
                if (manyRides) {
                    //Calculate bike subtotal
                    //Get seven day tickets
                    return;
                } else {
                    //Calculate bike subtotal
                    //Get X day tickets
                    return;
                }
            }
        }
    }

    const resetHandler = () => {
        setCurrentQuestionText(questions.getName);
        setQuestionLog([]);
        setCurrentInputValue("");
        setCurrentChoiceValue("");
        setUserName("");
        setNumberOfPassengers(1);
        setAge([]);
        setAreReducedTickets(false);
        setBicycles(0);
        setZone([]);
        setRidesPerDay([]);
        setStayTimeDays(1);
        setCostPerDay([]);
        setIsSingleRide();
        setIsSingleDay();
        setIsShortRide();
        setManyRides();
        setBicycleSubtotal();
        setTreeLocation();
    }

    const results = (
        <div className="results-container">
            {questionLog.map(entry => {
                return (
                    <div>
                        <p>{entry.question}</p>
                        <p>{entry.answer}</p>
                    </div>
                )
            })}
        </div>
    )

    return (
        <div className="question-container">
            {stage === "questions" ? <React.Fragment>
                {currentQuestionText}
                <input onChange={e => inputChangeHandler(e)} value={currentInputValue || ""} />
                <div className="button-container">
                    <button onClick={resetHandler}><strong>Start Over</strong></button>
                    <button onClick={questionChangeHandler}><strong>Continue</strong></button>
                </div>
            </React.Fragment> : results}
        </div>
    );
}

export default QuestionContainer;