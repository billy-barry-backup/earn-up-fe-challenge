import { createSlice } from '@reduxjs/toolkit';


//
// PAYLOAD GENERATORS
//

/**
 * Abstracting these to functions is probably overkill here, but would match a typical implementation
 * that is dealing with less trivial data
 * @param {Array} loans Loans successfully loaded via fetch
 * @returns {Object} The payload for a home/loadLoansSuccess action
 */
function getLoadLoansSuccessPayload(loans) {
    return {
        loans
    }
}

/**
 * Abstracting these to functions is probably overkill here, but would match a typical implementation
 * that is dealing with less trivial data
 * @param {Array} errors Errors generated from a failure to load loan data via fetch
 * @returns {Object} The payload for a home/loadLoansFailure action
 */
function getLoadLoansFailurePayload(errors) {
    return {
        errors
    }
}

//
// SELECTORS
//
export const getLoans = state => state.home.loans;
export const getLoadingState = state => state.home.isLoading;
export const getErrorState = state => {
    return {
        errors: state.home.errors,
        hasErrors: Boolean(state.home.errors.length)
    };
}


//
// Home Slice
//
export const home = createSlice({
  name: 'home',
  initialState: {
    loans: [],
    isLoading: false,
    isComplete: false,
    errors: []
  },
  reducers: {
    loadLoansStarted: state => {
        state.isLoading = true
        // If we wanted to implement retry functionality, we could clear any error state here
        // but that is out of scope
    },
    loadLoansFailure: (state, action) => {
        // Handle for null or empty errors array
        state.errors = action.payload.errors?.length ? action.payload.errors : ["Unknown Error occurred"];
        state.isComplete = true;
        state.isLoading = false;
    },
    loadLoansSuccess: (state, action) => {
        // Handle for null or empty loans array
        state.loans = action.payload.loans?.length ? action.payload.loans : [];
        state.isComplete = true;
        state.isLoading = false;
    }
  },

});

// No need to export, since we're only exposing the thunk to the Component and using these internally
const { loadLoansFailure, loadLoansSuccess, loadLoansStarted } = home.actions


//
// THUNK
//

/**
 * The loadLoans function is the abstracted thunk action generator used to load loan data
 * @returns {Promise} Thunk to load loan data and dispatch appropriate dependent actions
 */
export function loadLoans() {
    return async function(dispatch, getState) {
        const currentState = getState();
        // Perform all of the validation here rather than at the invocation of `dispatch`
        // So this thunk can easily be moved to a different component
        if(currentState.home.isLoading || currentState.home.isComplete) {
            // Don't attempt to load loans if a current request is ongoing
            return;
        }

        // Dispatch the home/loadLoansStarted action
        // This prevents needless re-fetching if something else triggers a re-render of the calling component
        dispatch(loadLoansStarted());

        // In a real codebase, we probably would be using a helper instead of vanilla fetch request
        // But this is a simple GET to a single endpoint without params to be concerned about
        const response = await fetch("https://my-json-server.typicode.com/EarnUp/demo/loans");

        if(response.ok) {
            // Serialize the response
            const json = await response.json();
            // We expect our loans to be in the format of a simple array
            // but in real life we'd probably be stricter about validation here
            if(Array.isArray(json)) {
                const successfullyLoadedLoansPayload = getLoadLoansSuccessPayload(json);
                dispatch(loadLoansSuccess(successfullyLoadedLoansPayload));
            } else {
                const invalidResponsePayload = getLoadLoansFailurePayload(['Server Error: Invalid Response'])
                dispatch(loadLoansFailure(invalidResponsePayload));
            }
        } else {
            // Since we don't have documentation for how this API serializes caught errors,
            // we only handle network-layer errors here
            const networkFailurePayload = getLoadLoansFailurePayload(["Network Error"]);
            dispatch(loadLoansFailure(networkFailurePayload));
        }
    }
}

export default home.reducer;