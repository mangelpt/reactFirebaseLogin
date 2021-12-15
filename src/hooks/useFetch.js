import {useCallback, useReducer} from "react";

const initialState = {error: null, isLoading: false}
const reducer = (state, action) => {
    switch (action.type) {
        case 'LOADING':
            return {error: state.error, loading: action.isLoading}
        default:
            throw  new Error("option incorrect")
    }
}
export const useHTTP = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const sendRequest = useCallback(async (requestConfig) => {
        dispatch({type: 'LOADING', isLoading: true});
        try {
            const response = await fetch(requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : "GET",
                headers: requestConfig.headers ? requestConfig.headers : {},
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
            });
            return await response.json();
        } catch (e) {
            console.log("Error");
        } finally {
            dispatch({type: 'LOADING', isLoading: false});
        }
    }, []);

    return (
        [state.loading, sendRequest]
    )
}
