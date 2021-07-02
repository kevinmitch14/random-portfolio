const initalState = {
    numberStocks: '',
    numberDays: '',
    investment: 1000,
    SPStocks: [],
    historicalData: [],
    error: null,
}


const reducer = (state = initalState, action) => {
    switch (action.type) {
        case 'USER_INPUT':
            return {
                ...state,
                numberDays: action.payload.days,
                numberStocks: action.payload.stocks,
                investment: action.payload.investment
            }
        case 'SP_FETCHER_INIT':
            return {
                ...state,
                SPStocks: []
            }
        case "SP_FETCHER_SUCCESS":
            return {
                ...state,
                SPStocks: action.payload.constituents
            }

        case "SP_FETCHER_ERROR":
            return {
                ...state,
                error: action.payload
            }

        case "DATA_FETCHER":
            return {
                ...state,
                historicalData: action.payload
            }

        default:
            return state
    }
}


export default reducer;