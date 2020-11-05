const validateInput = (inputType, value) => {
    switch (inputType) {
        case "name":
            return /[a-zA-Z]/.test(value);
        case "age":
            return /^(0?[1-9]|[1-9][0-9])$/.test(value);
        case "single ride":
            return /^(?:yes|no)$/.test(value);
        case "zone":
            return /^(?:AB|BC|ABC)$/.test(value);
        case "single day":
            return /^(?:one|many)$/.test(value);
        case "short ride":
            return /^(?:yes|no)$/.test(value);
        case "bike":
            return /^(0?[0-9]|[1-9][0-9])$/.test(value);
        case "day vs one way":
            return /^(?:yes|0?[0-9]|[1-9][0-9])$/.test(value);
        case "weekly vs day tickets":
            return /^(?:yes|0?[0-9]|[1-9][0-9])$/.test(value);
        default:
            return false;

    }
}

export default validateInput;