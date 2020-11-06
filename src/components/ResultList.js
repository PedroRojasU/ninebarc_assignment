import React from 'react';

import './ResultList.scss';

const ResultList = props =>{

        return (
        <div className="results-container">
            <div className="ticket-results-container">
                <h4>Recommended Ticket(s):</h4>
                {props.ticket.map((entry, index) => {
                    return (
                        <div key={index}>
                            <p>{entry}€</p>
                        </div>
                    );
                })}
                <h4>Total cost: {props.totalCost}€</h4>
            </div>
            <h4>Questions:</h4>
            {props.questionLog.map((entry, index) => {
                return (
                    <div key={index}>
                        <p>{entry.question}</p>
                        <p>{entry.answer}</p>
                    </div>
                )
            })}
            <button onClick={props.reset}><strong>Start Over</strong></button>
        </div>
        )

};

export default ResultList;