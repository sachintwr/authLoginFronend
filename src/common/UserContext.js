import { createContext, useState } from 'react';

export const UserContextData = createContext({
    storeData: {},
    updateStoreData: () => { },
});

export const UserContextProvider = ({ children }) => {
    const [storeData, setStoreData] = useState({});

    const updateStoreData = (data) => {
        setStoreData(data);
    };

    return (
        <UserContextData.Provider value={{ storeData, updateStoreData }}>
            {children}
        </UserContextData.Provider>
    );
};