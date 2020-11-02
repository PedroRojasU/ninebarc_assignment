import React from 'react';
import './AppFooter.scss';

const AppFooter = () => {
    return (
        <div className={"app-footer"}>
            <a target="_blank" rel="noreferrer" href="https://www.berlin.de/en/public-transportation/1772016-2913840-tickets-fares-and-route-maps.en.html">Learn more about transport tickets in Berlin</a>
            <a target="_blank" rel="noreferrer" href="https://sbahn.berlin/en/tickets/the-vbb-fare-explained/fare-zones/">Learn more about the fare zones</a>
        </div>
    )
};

export default AppFooter;