import React, { useState } from 'react';
import './QuestionContainer.scss';

import questions from '../assets/data/questions.json';
import tickets from '../assets/data/tickets.json';
import validateInput from '../services/validateInput';
import { rules } from '../services/rules';

const QuestionContainer = props => {

    const [currentQuestionText, setCurrentQuestionText] = useState(questions.getName);
    const [questionLog, setQuestionLog] = useState([]);
    const [currentInputValue, setCurrentInputValue] = useState("");
    const [numberOfPassengers, setNumberOfPassengers] = useState(1);
    const [areReducedTickets, setAreReducedTickets] = useState(false);
    const [zone, setZone] = useState([]); //["ABC","AB"]
    const [treeLocation, setTreeLocation] = useState([]);
    const [bikeSubtotal, setBikeSubtotal] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [recommendedTicket, setRecommendedTicket] = useState([]);
    const [stage, setStage] = useState("questions");
    const [isValidInput, setIsValidInput] = useState(true);

    const inputChangeHandler = e => {
        setCurrentInputValue(e.target.value);
    }

    const questionChangeHandler = () => {
        setIsValidInput(true);

        console.log(`Are reduced?: ${areReducedTickets}`);
        console.log(treeLocation);
        console.log(questionLog);
        console.log(currentQuestionText);
        //Getting name
        if (!questionLog.slice(-1)[0] && validateInput("name", currentInputValue)) {
            console.log("Getting name");
            setQuestionLog(prevState => [...prevState, { question: currentQuestionText, answer: currentInputValue, key: "name" }]);
            setCurrentInputValue("");
            setCurrentQuestionText(questions.getAgeOfPassenger);
            setTreeLocation(["name"]);
            return;
        }
        //Getting age
        if (treeLocation.slice(-1)[0] === "name" && validateInput("age", currentInputValue)) {
            console.log("Getting age");
            setQuestionLog(prevState => [...prevState, { question: currentQuestionText, answer: currentInputValue, key: "age" }]);
            rules.ridingRules.ageGroup.forEach(rule => {
                if (parseInt(currentInputValue) > rule.min && parseInt(currentInputValue) <= rule.max) {
                    console.log("Ticket is reduced!");
                    setAreReducedTickets(rule.isReducedPrice);
                }
            });
            setCurrentInputValue("");
            setCurrentQuestionText(questions.singleRide);
            setTreeLocation(["age"]);
            return;
        }
        //Asking if single ride
        if (treeLocation.slice(-1)[0] === "age" && validateInput("single ride", currentInputValue.toLowerCase().trim())) {
            console.log("Asking if single ride");
            setQuestionLog(prevState => [...prevState, { question: currentQuestionText, answer: currentInputValue, key: "single ride" }]);
            if (currentInputValue === "yes") {
                setCurrentQuestionText(questions.zone);
                setTreeLocation(["single ride"]);
            } else {
                setCurrentQuestionText(questions.singleDay);
                setTreeLocation(["multiple ride"]);
            }
            setCurrentInputValue("");
            return;
        }
        //Single ride - Getting zone
        if (treeLocation.slice(-1)[0] === "single ride" && validateInput("zone", currentInputValue.trim().toUpperCase())) {
            console.log("Single ride - Getting zone");
            setQuestionLog(prevState => [...prevState, { question: currentQuestionText, answer: currentInputValue.trim().toUpperCase(), key: "zone" }]);
            setCurrentQuestionText(questions.short);
            setZone(currentInputValue.trim().toUpperCase());
            setTreeLocation(prevState => [...prevState, "zone"]);
            setCurrentInputValue("");
            return;
        }
        //Multiple ride - Asking if single day
        if (treeLocation.slice(-1)[0] === "multiple ride" && validateInput("single day", currentInputValue.toLowerCase().trim())) {
            console.log("Multiple ride - Asking if single day");
            setQuestionLog(prevState => [...prevState, { question: currentQuestionText, answer: currentInputValue, key: "single day" }]);
            setCurrentQuestionText(questions.zone);
            if (currentInputValue.toLowerCase().trim() === "one") {
                setTreeLocation(prevState => [...prevState, "single day"]);
            } else {
                setTreeLocation(prevState => [...prevState, "multiple day"]);
            }
            setCurrentInputValue("");
            return;
        }
        //Single ride - Asking if short ride
        if (treeLocation.slice(-2)[0] === "single ride" && treeLocation.slice(-1)[0] === "zone" && validateInput("short ride", currentInputValue)) {
            console.log("Single ride - Asking if short ride");
            setQuestionLog(prevState => [...prevState, { question: currentQuestionText, answer: currentInputValue, key: "short ride" }]);
            setCurrentQuestionText(questions.bikes);
            if (currentInputValue.toLowerCase().trim() === "yes") {
                setTreeLocation(prevState => [...prevState, "short ride"]);
            } else {
                setTreeLocation(prevState => [...prevState, "long ride"]);
            }
            setCurrentInputValue("");
            return;
        }
        //Multiple ride, single day - Getting zone
        if (treeLocation.slice(-2)[0] === "multiple ride" && treeLocation.slice(-1)[0] === "single day" && validateInput("zone", currentInputValue.trim().toUpperCase())) {
            console.log("Multiple ride, single day - Getting zone");
            setQuestionLog(prevState => [...prevState, { question: currentQuestionText, answer: currentInputValue.trim().toUpperCase(), key: "zone" }]);
            setCurrentQuestionText(questions.bikes);
            setZone(currentInputValue.trim().toUpperCase());
            setTreeLocation(prevState => [...prevState, "zone"]);
            setCurrentInputValue("");
            return;
        }
        //Multiple ride, multiple day - Getting zone
        if (treeLocation.slice(-2)[0] === "multiple ride" && treeLocation.slice(-1)[0] === "multiple day" && validateInput("zone", currentInputValue.trim().toUpperCase())) {
            console.log("Multiple ride, multiple day - Getting zone");
            setQuestionLog(prevState => [...prevState, { question: currentQuestionText, answer: currentInputValue.trim().toUpperCase(), key: "zone" }]);
            setCurrentQuestionText(questions.bikes);
            setZone(currentInputValue.trim().toUpperCase());
            setTreeLocation(prevState => [...prevState, "zone"]);
            setCurrentInputValue("");
            return;
        }
        //Single ride, short ride - Asking if bike
        if (treeLocation.slice(-3)[0] === "single ride" && treeLocation.slice(-2)[0] === "zone" && treeLocation.slice(-1)[0] === "short ride" && validateInput("bike", currentInputValue)) {
            console.log("Single ride, short ride - Asking if bike");
            setQuestionLog(prevState => [...prevState, { question: currentQuestionText, answer: currentInputValue, key: "bike" }]);
            let ticketType = areReducedTickets ? "reduced" : "normal";
            let ticketCost = rules.ridingRules.singlePassenger.ride.single.rideDistance.short.price;
            let resultArray = [numberOfPassengers + " " + tickets.short + " (" + ticketType + "): " + rules.ridingRules.singlePassenger.ride.single.rideDistance.short.price];
            if (parseInt(currentInputValue) > 0) {
                ticketCost = ticketCost + rules.ridingRules.bike.price[zone] * numberOfPassengers;
                resultArray.push("1 " + tickets.bicycle + ": " + rules.ridingRules.bike.price[zone]);
                console.log("HEEEEEEEEEEEERE");
                console.log(rules.ridingRules.bike.price[zone]);
                console.log(rules);
            }
            setRecommendedTicket(resultArray);
            setTotalCost(ticketCost);
            setCurrentInputValue("");
            setStage("results");
            return;
        }
        //Single ride, long ride - Asking if bike
        if (treeLocation.slice(-3)[0] === "single ride" && treeLocation.slice(-2)[0] === "zone" && treeLocation.slice(-1)[0] === "long ride" && validateInput("bike", currentInputValue)) {
            console.log("Single ride, long ride - Asking if bike");
            setQuestionLog(prevState => [...prevState, { question: currentQuestionText, answer: currentInputValue, key: "bike" }]);
            let ticketType = areReducedTickets ? "reduced" : "normal";
            let ticketCost = rules.ridingRules.singlePassenger.ride.single.rideDistance.long.prices[zone][ticketType];
            let resultArray = [numberOfPassengers + " " + tickets.oneWay + " (" + ticketType + "): " + rules.ridingRules.singlePassenger.ride.single.rideDistance.long.prices[zone][ticketType]];
            if (parseInt(currentInputValue) > 0) {
                ticketCost = ticketCost + rules.ridingRules.bike.price[zone] * numberOfPassengers;
                resultArray.push("1 " + tickets.bicycle + ": " + rules.ridingRules.bike.price[zone]);
            }
            setRecommendedTicket(resultArray);
            setTotalCost(ticketCost);
            setCurrentInputValue("");
            setStage("results");
            return;
        }
        //Multiple ride, single day - Asking if bike
        if (treeLocation.slice(-2)[0] === "single day" && treeLocation.slice(-1)[0] === "zone" && validateInput("bike", currentInputValue)) {
            console.log("Multiple ride, single day - Asking if bike");
            setQuestionLog(prevState => [...prevState, { question: currentQuestionText, answer: currentInputValue, key: "bike" }]);
            areReducedTickets ? setCurrentQuestionText(questions.dayVsSingleReduced) : setCurrentQuestionText(questions.dayVsSingleNormal);
            if (parseInt(currentInputValue) > 0) {
                setBikeSubtotal(rules.ridingRules.bike.price[zone] * numberOfPassengers);
            }
            setTreeLocation(prevState => [...prevState, "bike"]);
            setCurrentInputValue("");
            return;
        }
        //Multiple ride, multiple day - Asking if bike
        if (treeLocation.slice(-2)[0] === "multiple day" && treeLocation.slice(-1)[0] === "zone" && validateInput("bike", currentInputValue)) {
            console.log("Multiple ride, multiple day - Asking if bike");
            setQuestionLog(prevState => [...prevState, { question: currentQuestionText, answer: currentInputValue, key: "bike" }]);
            if (zone === "AB" || zone === "BC") {
                setCurrentQuestionText(questions.weekVsDayTicketNormalAB);
            } else {
                setCurrentQuestionText(questions.weekVsDayTicketNormalABC);
            }
            if (parseInt(currentInputValue) > 0) {
                setBikeSubtotal(rules.ridingRules.bike.price[zone] * numberOfPassengers);
            }
            setTreeLocation(prevState => [...prevState, "bike"]); ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            setCurrentInputValue("");
            return;
        }
        //Multiple ride, single day - day vs multi one way ticket (reduced)
        if (treeLocation.slice(-3)[0] === "single day" && treeLocation.slice(-2)[0] === "zone" && areReducedTickets && validateInput("day vs one way", currentInputValue)) {
            console.log("Multiple ride, single day - day vs multi one way ticket (reduced)");
            setQuestionLog(prevState => [...prevState, { question: currentQuestionText, answer: currentInputValue, key: "day vs one way" }]);
            let ticketType = areReducedTickets ? "reduced" : "normal";
            let resultArray = [];
            let ticketCost;
            if (currentInputValue === "yes") {
                resultArray = [numberOfPassengers + " " + tickets.day + " (" + ticketType + "): " + rules.ridingRules.singlePassenger.ride.multiple.singleDay.ticketType.reduced.typeOfRide.overThreshold[zone]];
                ticketCost = rules.ridingRules.singlePassenger.ride.multiple.singleDay.ticketType.reduced.typeOfRide.overThreshold[zone];
            } else {
                resultArray = [currentInputValue + " " + tickets.oneWay + " (" + ticketType + "): " + parseInt(currentInputValue) * rules.ridingRules.singlePassenger.ride.multiple.singleDay.ticketType.reduced.typeOfRide.overThreshold[zone]];
                ticketCost = currentInputValue * rules.ridingRules.singlePassenger.ride.single.rideDistance.long.prices[zone].reduced;
            }
            if (bikeSubtotal > 0) {
                ticketCost = ticketCost + (rules.ridingRules.bike.price[zone] * numberOfPassengers);
                resultArray.push("1 " + tickets.bicycle + ": " + rules.ridingRules.bike.price[zone]);
            }
            setRecommendedTicket(resultArray);
            setTotalCost(ticketCost);
            setCurrentInputValue("");
            setStage("results");
            return;
        }
        //Multiple ride, single day - day vs multi one way ticket (normal)
        if (treeLocation.slice(-3)[0] === "single day" && treeLocation.slice(-2)[0] === "zone" && !areReducedTickets && validateInput("day vs one way", currentInputValue)) {
            console.log("Multiple ride, single day - day vs multi one way ticket (normal)");
            setQuestionLog(prevState => [...prevState, { question: currentQuestionText, answer: currentInputValue, key: "day vs one way" }]);
            let ticketType = areReducedTickets ? "reduced" : "normal";
            let resultArray = [];
            let ticketCost;
            if (currentInputValue === "yes") {
                resultArray = [numberOfPassengers + " " + tickets.day + " (" + ticketType + "): " + rules.ridingRules.singlePassenger.ride.multiple.singleDay.ticketType.normal.typeOfRide.overThreshold[zone]];
                ticketCost = rules.ridingRules.singlePassenger.ride.multiple.singleDay.ticketType.normal.typeOfRide.overThreshold[zone];
            } else {
                resultArray = [currentInputValue + " " + tickets.oneWay + " (" + ticketType + "): " + parseInt(currentInputValue) * rules.ridingRules.singlePassenger.ride.single.rideDistance.long.prices[zone].normal];
                ticketCost = currentInputValue * rules.ridingRules.singlePassenger.ride.single.rideDistance.long.prices[zone].normal;
            }
            if (bikeSubtotal > 0) {
                ticketCost = ticketCost + (rules.ridingRules.bike.price[zone] * numberOfPassengers);
                resultArray.push("1 " + tickets.bicycle + ": " + rules.ridingRules.bike.price[zone]);
            }
            console.log(resultArray);
            setRecommendedTicket(resultArray);
            setTotalCost(ticketCost);
            setCurrentInputValue("");
            setStage("results");
            return;
        }
        //Multiple ride, multiple day - week vs multi day ticket (AB||BC)
        if (treeLocation.slice(-3)[0] === "multiple day" && treeLocation.slice(-2)[0] === "zone" && (zone === "AB" || zone === "BC") && validateInput("weekly vs day tickets", currentInputValue)) {
            console.log("Multiple ride, multiple day - week vs multi day ticket (AB||BC)");
            setQuestionLog(prevState => [...prevState, { question: currentQuestionText, answer: currentInputValue, key: "week vs multiple one day" }]);
            let ticketType = areReducedTickets ? "reduced" : "normal";
            let resultArray;
            let ticketCost;
            if (currentInputValue === "yes") {
                resultArray = [numberOfPassengers + " " + tickets.week + " (" + ticketType + "): " + rules.ridingRules.singlePassenger.ride.multiple.multipleDay.ticketType[zone].overThreshold.cost];
                ticketCost = rules.ridingRules.singlePassenger.ride.multiple.multipleDay.ticketType[zone].overThreshold.cost;
            } else {
                resultArray = [currentInputValue + " " + tickets.day + " (" + ticketType + "): " + parseInt(currentInputValue) * rules.ridingRules.singlePassenger.ride.multiple.singleDay.ticketType[ticketType].typeOfRide.overThreshold[zone]];
                ticketCost = currentInputValue * rules.ridingRules.singlePassenger.ride.multiple.singleDay.ticketType[ticketType].typeOfRide.overThreshold[zone];
            }
            if (bikeSubtotal > 0) {
                ticketCost = ticketCost + (rules.ridingRules.bike.price[zone] * numberOfPassengers);
                resultArray.push("1 " + tickets.bicycle + ": " + rules.ridingRules.bike.price[zone]);
            }
            setRecommendedTicket(resultArray);
            setTotalCost(ticketCost);
            setCurrentInputValue("");
            setStage("results");
            return;
        }
        //Multiple ride, multiple day - week vs multi day ticket (ABC)
        if (treeLocation.slice(-3)[0] === "multiple day" && treeLocation.slice(-2)[0] === "zone" && zone === "ABC" && validateInput("weekly vs day tickets", currentInputValue)) {
            console.log("Multiple ride, multiple day - week vs multi day ticket (ABC)");
            setQuestionLog(prevState => [...prevState, { question: currentQuestionText, answer: currentInputValue, key: "week vs multiple one day" }]);
            let ticketType = areReducedTickets ? "reduced" : "normal";
            let resultArray;
            let ticketCost;
            if (currentInputValue === "yes") {
                resultArray = [numberOfPassengers + " " + tickets.week + " (" + ticketType + "): " + rules.ridingRules.singlePassenger.ride.multiple.multipleDay.ticketType[zone].overThreshold.cost];
                ticketCost = rules.ridingRules.singlePassenger.ride.multiple.multipleDay.ticketType[zone].overThreshold.cost;
            } else {
                resultArray = [currentInputValue + " " + tickets.day + " (" + ticketType + "): " + parseInt(currentInputValue) * rules.ridingRules.singlePassenger.ride.multiple.singleDay.ticketType[ticketType].typeOfRide.overThreshold[zone]];
                ticketCost = currentInputValue * rules.ridingRules.singlePassenger.ride.multiple.singleDay.ticketType[ticketType].typeOfRide.overThreshold[zone];
            }
            if (bikeSubtotal > 0) {
                ticketCost = ticketCost + (rules.ridingRules.bike.price[zone] * numberOfPassengers);
                resultArray.push("1 " + tickets.bicycle + ": " + rules.ridingRules.bike.price[zone]);
            }
            setRecommendedTicket(resultArray);
            setTotalCost(ticketCost);
            setCurrentInputValue("");
            setStage("results");
            return;
        }

        setIsValidInput(false);

    }

    const resetHandler = () => {
        setCurrentQuestionText(questions.getName);
        setQuestionLog([]);
        setCurrentInputValue("");
        setNumberOfPassengers(1);
        setAreReducedTickets(false);
        setZone([]);
        setTreeLocation();
        setBikeSubtotal(0);
        setTotalCost(0);
        setRecommendedTicket([]);
        setStage("questions");
        setIsValidInput(true);
    }

    const results = (
        <div className="results-container">
            <div className="ticket-results-container">
                <h4>Recommended Ticket(s):</h4>
                {recommendedTicket.map((entry, index) => {
                    return (
                        <div key={index}>
                            <p>{entry}€</p>
                        </div>
                    );
                })}
                <h4>Total cost: {totalCost}€</h4>
            </div>
            <h4>Questions:</h4>
            {questionLog.map((entry, index) => {
                return (
                    <div key={index}>
                        <p>{entry.question}</p>
                        <p>{entry.answer}</p>
                    </div>
                )
            })}
            <button onClick={resetHandler}><strong>Start Over</strong></button>
        </div>
    )

    let errorText = (
        !isValidInput ? <p className="error-message">Invalid input. Please try again</p> : null
    )
    return (
        <div className="question-container">
            {stage === "questions" ? <React.Fragment>
                <h4>{currentQuestionText}</h4>
                <input onChange={e => inputChangeHandler(e)} value={currentInputValue || ""} />
                {errorText}
                <div className="button-container">
                    <button onClick={resetHandler}><strong>Start Over</strong></button>
                    <button onClick={questionChangeHandler}><strong>Continue</strong></button>
                </div>
            </React.Fragment> : results}
        </div>
    );
}

export default QuestionContainer;