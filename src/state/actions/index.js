export const inputHandler = (stocks, days) => {
    return {
        type: 'USER_INPUT',
        payload: {
            stocks: stocks,
            days: days
        }
    }
}


export const SP_Fetcher = () => {
    return async (dispatch) => {
        dispatch({
            type: "SP_Fetcher_INIT"
        });

        try {
            let data = await fetch(`https://finnhub.io/api/v1/index/constituents?symbol=^GSPC&token=bv4bhc748v6qpatdfb4g`)
            data = await data.json()

            dispatch({
                type: "SP_FETCHER_SUCCESS",
                payload: data
            })

        } catch (err) {
            dispatch({
                type: "SP_FETCHER_ERROR",
                payload: err.message
            })
        }
    }
}


export const testingFetch = (data) => {
    return {
        type: "DATA_FETCHER",
        payload: data
    }

}
