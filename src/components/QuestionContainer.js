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

    const inputChangeHandler = e => {
        setCurrentInputValue(e.target.value);
    }

    const questionChangeHandler = () => {

        if (!questionLog.slice(-1)[0] && validateInput("name", currentInputValue)) { //Getting name
            setQuestionLog(prevState => [...prevState, { question: currentQuestionText, answer: currentInputValue, key: "name" }]);
            setCurrentInputValue("");
            setCurrentQuestionText(questions.getAgeOfPassenger);
            return;
        }
        if (questionLog.slice(-1)[0].key === "name" && validateInput("age", currentInputValue)) { //Getting age
            setQuestionLog(prevState => [...prevState, { question: currentQuestionText, answer: currentInputValue, key: "age" }]);
            rules.ridingRules.ageGroup.forEach(rule => {
                if (parseInt(currentInputValue) >= rule.min && parseInt(currentInputValue) <= rule.max) {
                    setAreReducedTickets(rule.isReducedPrice);
                }
            });
            setCurrentInputValue("");
            setCurrentQuestionText(questions.singleRide);
            return;
        }
        if (questionLog.slice(-1)[0].key === "age" && validateInput("single ride", currentInputValue)) { //Asking if single ride
            setQuestionLog(prevState => [...prevState, { question: currentQuestionText, answer: currentInputValue, key: "single ride" }]);
            if (parseInt(currentInputValue) === 1) {
                setCurrentQuestionText(questions.zone);
                setTreeLocation(["single ride"]);
            } else {
                setCurrentQuestionText(questions.singleDay);
                setTreeLocation(["multiple ride"]);
            }
            setCurrentInputValue("");
            return;
        }
        if (treeLocation.slice(-1)[0] === "single ride" && validateInput("zone", currentInputValue)) { //Single ride - Getting zone
            setQuestionLog(prevState => [...prevState, { question: currentQuestionText, answer: currentInputValue, key: "zone" }]);
            setCurrentQuestionText(questions.short);
            setZone(currentInputValue);
            setTreeLocation(prevState => [...prevState, "zone"]);
            setCurrentInputValue("");
            return;
        }
        if (treeLocation.slice(-1)[0] === "multiple ride" && validateInput("single day", currentInputValue)) { //Multiple ride - Asking if single day
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
        if (treeLocation.slice(-2)[0] === "multiple ride" && treeLocation.slice(-1)[0] === "single day" && validateInput("zone", currentInputValue)) {
            setQuestionLog(prevState => [...prevState, { question: currentQuestionText, answer: currentInputValue, key: "zone" }]);
            setCurrentQuestionText(questions.bikes);
            setZone(currentInputValue);
            setTreeLocation(prevState => [...prevState, "zone"]);
            setCurrentInputValue("");
            return;
        }
        //Multiple ride, multiple day - Getting zone
        if (treeLocation.slice(-2)[0] === "multiple ride" && treeLocation.slice(-1)[0] === "multiple day" && validateInput("zone", currentInputValue)) {
            setQuestionLog(prevState => [...prevState, { question: currentQuestionText, answer: currentInputValue, key: "zone" }]);
            setCurrentQuestionText(questions.bikes);
            setZone(currentInputValue);
            setTreeLocation(prevState => [...prevState, "zone"]);
            setCurrentInputValue("");
            return;
        }
        //Single ride, short ride - Asking if bike
        if (treeLocation.slice(-3)[0] === "single ride" && treeLocation.slice(-2)[0] === "zone" && treeLocation.slice(-1)[0] === "short ride" && validateInput("bike", currentInputValue)) {
            setQuestionLog(prevState => [...prevState, { question: currentQuestionText, answer: currentInputValue, key: "bike" }]);
            let ticketType = areReducedTickets ? "reduced" : "normal";
            let ticketCost = rules.ridingRules.singlePassenger.ride.single.rideDistance.short.price;
            if (parseInt(currentInputValue) > 0) {
                ticketCost = ticketCost + rules.ridingRules.bike.price[zone] * numberOfPassengers;
                let resultArray = [numberOfPassengers + " " + tickets.short + " (" + ticketType + "): " + rules.ridingRules.singlePassenger.ride.single.rideDistance.short.price, "1 " + tickets.bicycle + ": " + rules.ridingRules.bike.price[zone]]
                setRecommendedTicket(resultArray);
            } else {
                setRecommendedTicket([numberOfPassengers + " " + tickets.short + " (" + ticketType + "): " + rules.ridingRules.singlePassenger.ride.single.rideDistance.short.price])
            }
            setTotalCost(ticketCost);
            setCurrentInputValue("");
            setStage("results");
            return;
        }
        //Single ride, long ride - Asking if bike
        if (treeLocation.slice(-3)[0] === "single ride" && treeLocation.slice(-2)[0] === "zone" && treeLocation.slice(-1)[0] === "long ride" && validateInput("bike", currentInputValue)) {
            setQuestionLog(prevState => [...prevState, { question: currentQuestionText, answer: currentInputValue, key: "bike" }]);
            let ticketType = areReducedTickets ? "reduced" : "normal";
            let ticketCost = rules.ridingRules.singlePassenger.ride.single.rideDistance.long.prices[zone][ticketType];
            if (parseInt(currentInputValue) > 0) {
                ticketCost = ticketCost + rules.ridingRules.bike.price[zone] * numberOfPassengers;
                let resultArray = [numberOfPassengers + " " + tickets.oneWay + " (" + ticketType + "): " + rules.ridingRules.singlePassenger.ride.single.rideDistance.long.prices[zone][ticketType], "1 " + tickets.bicycle + ": " + rules.ridingRules.bike.price[zone]]
                setRecommendedTicket(resultArray);
            } else {
                setRecommendedTicket([numberOfPassengers + " " + tickets.oneWay + " (" + ticketType + "): " + rules.ridingRules.singlePassenger.ride.single.rideDistance.long.prices[zone][ticketType]])
            }
            setTotalCost(ticketCost);
            setCurrentInputValue("");
            setStage("results");
            return;
        }
        //Multiple ride, single day - Asking if bike
        if (treeLocation.slice(-2)[0] === "single day" && treeLocation.slice(-1)[0] === "zone" && validateInput("zone", currentInputValue)) {
            setQuestionLog(prevState => [...prevState, { question: currentQuestionText, answer: currentInputValue, key: "bike" }]);
            areReducedTickets ? setCurrentQuestionText(questions.dayVsSingleReduced) : setCurrentQuestionText(questions.dayVsSingleNormal);
            if (parseInt(currentInputValue) > 0) {
                setBikeSubtotal(rules.ridingRules.bike.price[zone] * numberOfPassengers);
            }
            setCurrentInputValue("");
            return;
        }
        //Multiple ride, multiple day - Asking if bike
        if (treeLocation.slice(-2)[0] === "multiple day" && treeLocation.slice(-1)[0] === "zone" && validateInput("zone", currentInputValue)) {
            setQuestionLog(prevState => [...prevState, { question: currentQuestionText, answer: currentInputValue, key: "bike" }]);
            if (zone === "AB" || zone === "BC") {
                setCurrentQuestionText(questions.weekVsDayTicketNormalAB);
            } else {
                setCurrentQuestionText(questions.weekVsDayTicketNormalABC);
            }
            if (parseInt(currentInputValue) > 0) {
                setBikeSubtotal(rules.ridingRules.bike.price[zone] * numberOfPassengers);
            }
            setCurrentInputValue("");
            return;
        }
        //Multiple ride, single day - day vs multi one way ticket (reduced)
        console.log(treeLocation);
        console.log(treeLocation.slice(-3)[0] === "single ride");
        console.log(treeLocation.slice(-2)[0] === "zone");
        console.log(areReducedTickets);
        if (treeLocation.slice(-3)[0] === "single day" && treeLocation.slice(-2)[0] === "zone" && areReducedTickets && validateInput("day vs one way", currentInputValue)) {
            setQuestionLog(prevState => [...prevState, { question: currentQuestionText, answer: currentInputValue, key: "day vs one way" }]);
            let ticketType = areReducedTickets ? "reduced" : "normal";
            let resultArray;
            let ticketCost;
            if (currentInputValue === "yes") {
                resultArray = [numberOfPassengers + " " + tickets.day + " (" + ticketType + "): " + rules.ridingRules.singlePassenger.ride.multiple.singleDay.ticketType.reduced.typeOfRide.moreThan3[zone]];
                ticketCost = rules.ridingRules.singlePassenger.ride.multiple.singleDay.ticketType.reduced.typeOfRide.moreThan3[zone];
            } else {
                resultArray = [currentInputValue + " " + tickets.oneWay + " (" + ticketType + "): " + parseInt(currentInputValue) * rules.ridingRules.singlePassenger.ride.multiple.singleDay.ticketType.reduced.typeOfRide.moreThan3[zone]];
                ticketCost = currentInputValue * rules.ridingRules.singlePassenger.ride.single.rideDistance.long.prices[zone].reduced;
            }
            ticketCost = rules.ridingRules.singlePassenger.ride.single.rideDistance.long.prices[zone][ticketType];
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
            setQuestionLog(prevState => [...prevState, { question: currentQuestionText, answer: currentInputValue, key: "day vs one way" }]);
            let ticketType = areReducedTickets ? "reduced" : "normal";
            let resultArray;
            let ticketCost;
            if (currentInputValue === "yes") {
                resultArray = [numberOfPassengers + " " + tickets.day + " (" + ticketType + "): " + rules.ridingRules.singlePassenger.ride.multiple.singleDay.ticketType.normal.typeOfRide.moreThan2[zone].normal];
                ticketCost = rules.ridingRules.singlePassenger.ride.multiple.singleDay.ticketType.reduced.typeOfRide.moreThan3[zone];
            } else {
                resultArray = [currentInputValue + " " + tickets.oneWay + " (" + ticketType + "): " + parseInt(currentInputValue) * rules.ridingRules.singlePassenger.ride.multiple.singleDay.ticketType.normal.typeOfRide.moreThan2[zone]];
                ticketCost = currentInputValue * rules.ridingRules.singlePassenger.ride.single.rideDistance.long.prices[zone].normal;
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
        //Multiple ride, multiple day - week vs multi day ticket (AB||BC)
        if (treeLocation.slice(-3)[0] === "multiple ride" && treeLocation.slice(-2)[0] === "zone" && (zone === "AB" || zone === "BC") && validateInput("weekly vs day tickets", currentInputValue)) {
            setQuestionLog(prevState => [...prevState, { question: currentQuestionText, answer: currentInputValue, key: "week vs multiple one day" }]);
            let ticketType = areReducedTickets ? "reduced" : "normal";
            let resultArray;
            let ticketCost;
            if (currentInputValue === "yes") {
                resultArray = [numberOfPassengers + " " + tickets.week + " (" + ticketType + "): " + rules.ridingRules.singlePassenger.ride.multiple.multipleDay.ticketType[zone].moreThan3.cost];
                ticketCost = rules.ridingRules.singlePassenger.ride.multiple.multipleDay.ticketType[zone].moreThan3.cost;
            } else {
                resultArray = [currentInputValue + " " + tickets.day + " (" + ticketType + "): " + parseInt(currentInputValue) * rules.ridingRules.singlePassenger.ride.multiple.singleDay.ticketType[ticketType].typeOfRide.moreThan3[zone]];
                ticketCost = currentInputValue * rules.ridingRules.singlePassenger.ride.multiple.singleDay.ticketType[ticketType].typeOfRide.moreThan2[zone];
            }
            setRecommendedTicket(resultArray);
            setTotalCost(ticketCost);
            setCurrentInputValue("");
            setStage("results");
            return;
        }
        //Multiple ride, multiple day - week vs multi day ticket (ABC)
        if (treeLocation.slice(-3)[0] === "multiple ride" && treeLocation.slice(-2)[0] === "zone" && zone === "ABC" && validateInput("weekly vs day tickets", currentInputValue)) {
            setQuestionLog(prevState => [...prevState, { question: currentQuestionText, answer: currentInputValue, key: "week vs multiple one day" }]);
            let ticketType = areReducedTickets ? "reduced" : "normal";
            let resultArray;
            let ticketCost;
            if (currentInputValue === "yes") {
                resultArray = [numberOfPassengers + " " + tickets.week + " (" + ticketType + "): " + rules.ridingRules.singlePassenger.ride.multiple.multipleDay.ticketType[zone].moreThan3.cost];
                ticketCost = rules.ridingRules.singlePassenger.ride.multiple.multipleDay.ticketType[zone].moreThan3.cost;
            } else {
                resultArray = [currentInputValue + " " + tickets.day + " (" + ticketType + "): " + parseInt(currentInputValue) * rules.ridingRules.singlePassenger.ride.multiple.singleDay.ticketType[ticketType].typeOfRide.moreThan3[zone]];
                ticketCost = currentInputValue * rules.ridingRules.singlePassenger.ride.multiple.singleDay.ticketType[ticketType].typeOfRide.moreThan2[zone];
            }
            setRecommendedTicket(resultArray);
            setTotalCost(ticketCost);
            setCurrentInputValue("");
            setStage("results");
            return;
        }

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

    return (
        <div className="question-container">
            {stage === "questions" ? <React.Fragment>
                <h4>{currentQuestionText}</h4>
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