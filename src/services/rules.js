export const rules = {
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
        bike: {
            price: {
                AB: 2,
                BC: 2,
                ABC: 2.6,
            }
        },
        singlePassenger: {
            ride: {
                single: {
                    rideDistance: {
                        short: {
                            price: 1.9
                        },
                        long: {
                            prices: {
                                AB: {
                                    normal: 2.9,
                                    reduced: 1.8
                                },
                                BC: {
                                    normal: 2.9,
                                    reduced: 1.8
                                },
                                ABC: {
                                    normal: 3.6,
                                    reduced: 2.6
                                }
                            }
                        }
                    }
                },
                multiple: {

                    singleDay: {
                        ticketType: {
                            normal: {
                                typeOfRide: {
                                    moreThan2: {
                                        ticketRule: "Buy day ticket",
                                        AB: 8.6,
                                        BC: 8.6,
                                        ABC: 9.6,
                                    },
                                    lessThan2: {
                                        ticketRule: "Buy single tickets",
                                        AB: 2.9,
                                        BC: 3.3,
                                        ABC: 3.6,
                                    },
                                }

                            },
                            reduced: {
                                typeOfRide: {
                                    moreThan3: {
                                        ticketRule: "Buy day ticket",
                                        AB: 5.5,
                                        BC: 5.5,
                                        ABC: 6,
                                    },
                                    lessThan3: {
                                        ticketRule: "Buy single tickets",
                                        AB: 1.8,
                                        BC: 2.3,
                                        ABC: 2.6,
                                    }
                                }
                            }
                        }
                    },
                    multipleDay: {
                        ticketType: {
                            AB: {
                                moreThan3: {
                                    ticketRule: "Buy 7 day ticket",
                                    cost: 34
                                },
                                lessThan3: {
                                    ticketRule: "Buy multiple day tickets",
                                    cost: {
                                        normal: 8.6,
                                        reduced: 5.5,
                                    }
                                },
                            },
                            BC: {
                                moreThan3: {
                                    days: ">3",
                                    ticketRule: "Buy 7 day ticket",
                                    cost: 34
                                },
                                lessThan3: {
                                    days: "<3",
                                    ticketRule: "Buy multiple day tickets",
                                    cost: {
                                        normal: 8.6,
                                        reduced: 5.5,
                                    }
                                },

                            },
                            ABC: {
                                moreThan3: {
                                    days: ">4",
                                    ticketRule: "Buy 7 day ticket",
                                    cost: 41
                                },
                                lessThan3: {
                                    days: "<4",
                                    ticketRule: "Buy multiple day tickets",
                                    cost: {
                                        normal: 9.6,
                                        reduced: 6,
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