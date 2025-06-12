import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

type ListenerContextType = {
    focusMode: boolean;
    setFocusMode: (value: boolean) => void;
};

const ListenerContext = createContext<ListenerContextType | undefined>(
    undefined
);

export const ListenerProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [focusMode, setFocusMode] = useState(false);

    return (
        <ListenerContext.Provider value={{ focusMode, setFocusMode }}>
            {children}
        </ListenerContext.Provider>
    );
};

type ListenerTypes = Pick<
    React.HTMLAttributes<any>,
    "onTouchStart" | "onMouseDown" | "onFocusCapture" | "onMouseEnter" | "onKeyDown"
>;

/** Returns the listeners that need to be attached to each Project. Changes the index */
export const useListeners = (pushInd): ListenerTypes & { isFocus: boolean } => {
    const { focusMode, setFocusMode } = useContext(ListenerContext);

    const pushTrue = useCallback((e) => {
        if(e.target.tagName === "A")
            return;

        setFocusMode(true); 
        pushInd()
    }, []);
    const pushFalse = useCallback((e) => {
        if(e.target.tagName === "A")
            return;

        setFocusMode(false); 
        pushInd()
    }, []);

    return focusMode
        ? {
            isFocus: true,
            onTouchStart: pushFalse,
            onMouseDown: pushFalse,
            onFocusCapture: pushTrue,
        }
        : {
            isFocus: false,
            onTouchStart: pushFalse,
            onMouseEnter: pushFalse,
            onFocusCapture: pushTrue,
        };
};
