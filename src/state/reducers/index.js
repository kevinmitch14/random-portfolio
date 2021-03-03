const initalState = {
    numberStocks: '',
    numberDays: '',
    SPStocks: [],
    historicalData: [],
    error: null,
}


const reducer = (state = initalState, action) => {
    switch (action.type) {
        case 'USER_INPUT':
            return {
                ...state,
                numberDays: state.numberDays + action.payload.days,
                numberStocks: state.numberStocks + action.payload.stocks
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