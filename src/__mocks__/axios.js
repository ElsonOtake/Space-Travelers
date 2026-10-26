// Avoid loading Axios's ESM entry point in the Create React App Jest runner.
const axios = { get: jest.fn() };
export default axios;
