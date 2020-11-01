// let userName = "";
// let numberOfPassengers = 1;
// let age = []; //[44,12,33,2,4]
// let areReducedTickets = false;
// let bicycles = 0;
// let zone = []; //["ABC","AB"]
// let ridesPerDay = [1, 2, 5, 10]; //[1, 2, 5, 10];
// let stayTimeDays = 3;
// let costPerDay = []; //wip

const questions = {
    getName: "What is your name?",
    getNumberOfPassengers: "Are you traveling alone? If not, how many are in your group?",
    getAgeOfPassenger: "How old are you?",
    getAgeOfPassengers: "What are the ages of the people in your group?",
    bikes: "Are you travelling with bikes? How many?",
    singleRide: "How many rides are you planning?",
    zone: "Please select the correct zone for your rides. A is the area inside the S-Bahn ring. B is outside the S-Bahn ring but within the city. C is the outskirts of the city and Potsdam",
    short: "Is your ride Short? (3 stops with S and U-Bahn or 6 stops with buses and trams. Changing trains is allowed)",
    singleDay: "Are you travelling on one or multiple days?",
    dayVsSingleNormal: "Are you planning more than 2 rides?",
    dayVsSingleReduced: "Are you planning more than 3 rides?",
    weekVsDayTicketNormalAB: "Are you travelling on more than 3 different days?",
    weekVsDayTicketNormalABC: "Are you travelling on more than 4 different days?"
}

const results = {
    short: "Short ride ticket.",
    oneWay: "One way ticket.",
    day: "Day ticket.",
    week: "Seven day ticket.",
    group: "Group day ticket."
}

const calculateTotal = (numberOfPassengers, ticketPrice, bikeTicketPrice, numberOfBikes) => {
    return (ticketPrice * numberOfPassengers) + (bikeTicketPrice * numberOfBikes);
}

export const rules = () => {

    return {
        ridingRules: {
            ageGroup: [
                {
                    min: 6,
                    max: 14,
                    isReducedPrice: true
                },
                {
                    min: 14,
                    max: 999,
                    isReducedPrice: false
                }
            ],
            singlePassenger: {
                ride: {
                    single: {
                        bike: {
                            needsTicket: true
                        },
                        rideDistance: [
                            {
                                length: "short",
                                price: 1.9
                            },
                            {
                                length: "long",
                                prices: [
                                    {
                                        zone: "AB",
                                        price: {
                                            normal: 2.9,
                                            reduced: 1.8
                                        }
                                    },
                                    {
                                        zone: "BC",
                                        price: {
                                            normal: 2.9,
                                            reduced: 1.8
                                        }
                                    },
                                    {
                                        zone: "ABC",
                                        price: {
                                            normal: 3.6,
                                            reduced: 2.6
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    multiple: {
                        bike: {
                            needsTicket: true
                        },
                        ticketSelection: {
                            singleDay: {
                                ticketType: {
                                    normal: {
                                        typeOfRide: [
                                            {
                                                rides: ">2",
                                                ticketRule: "Buy day ticket"
                                            },
                                            {
                                                rides: "<2",
                                                ticketRule: "Buy single tickets"
                                            },
                                        ]

                                    },
                                    reduced: {
                                        typeOfRide: [
                                            {
                                                rides: ">3",
                                                ticketRule: "Buy day ticket"
                                            },
                                            {
                                                rides: "<3",
                                                ticketRule: "Buy single tickets"
                                            }
                                        ]
                                    }
                                }
                            },
                            multipleDay: {
                                ticketType: {
                                    AB: {
                                        typeOfRide: [
                                            {
                                                days: ">3",
                                                ticketRule: "Buy 7 day ticket"
                                            },
                                            {
                                                days: "<3",
                                                ticketRule: "Buy multiple day tickets"
                                            },
                                        ]
                                    },
                                    BC: {
                                        typeOfRide: [
                                            {
                                                days: ">3",
                                                ticketRule: "Buy 7 day ticket"
                                            },
                                            {
                                                days: "<3",
                                                ticketRule: "Buy multiple day tickets"
                                            },
                                        ]
                                    },
                                    ABC: {
                                        typeOfRide: [
                                            {
                                                days: ">4",
                                                ticketRule: "Buy 7 day ticket"
                                            },
                                            {
                                                days: "<4",
                                                ticketRule: "Buy multiple day tickets"
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

}