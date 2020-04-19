const initialValue = {
  dataCovidWorld: [],
  dataCovidAllCountry: [],
  errMsg: [],
  isPending: false,
  isRejected: false,
  isFulfilled: false,
};

const productReducer = (state = initialValue, action) => {
  switch (action.type) {
    case 'GET_COVID_ALL_PENDING':
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'GET_COVID_ALL_REJECTED':
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data,
      };
    case 'GET_COVID_ALL_FULFILLED':
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        dataCovidWorld: action.payload.data,
      };
    case 'GET_COVID_COUNTRY_PENDING':
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'GET_COVID_COUNTRY_REJECTED':
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data,
      };
    case 'GET_COVID_COUNTRY_FULFILLED':
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        dataCovidAllCountry: action.payload.data,
      };

    default:
      return state;
  }
};

export default productReducer;
