/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import Data from "./data.json";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    return (
        <GlobalContext.Provider value={Data}>
            {children}
        </GlobalContext.Provider>
    );
};

GlobalProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
