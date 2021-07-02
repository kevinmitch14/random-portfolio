import axios from 'axios'
export const inputHandler = (stocks, days, investment) => {
    return {
        type: 'USER_INPUT',
        payload: {
            stocks: stocks,
            days: days,
            investment: investment
        }
    }
}


export const SP_Fetcher = () => {
    return async (dispatch) => {
        dispatch({
            type: "SP_Fetcher_INIT"
        });

        try {
            let { data } = await axios.get(`https://finnhub.io/api/v1/index/constituents?symbol=^GSPC&token=${process.env.REACT_APP_FINNHUB_API_KEY}`);

            dispatch({
                type: "SP_FETCHER_SUCCESS",
                payload: data
            });

        } catch (err) {
            dispatch({
                type: "SP_FETCHER_ERROR",
                payload: err.message
            });
        };
    };
};


export const testingFetch = (data) => {
    return {
        type: "DATA_FETCHER",
        payload: data
    }

}
