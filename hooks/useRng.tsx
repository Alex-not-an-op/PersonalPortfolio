import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

/**
 * Provides a stateful random number generator. 
 * Should not be used at top level, as it is stateful. If multiple Components require random numbers => use multiple rng`s
 */

const [SHIFT1, SHIFT2, SHIFT3, C] = [BigInt(12), BigInt(25), BigInt(27), BigInt("0x2545F4914F6CDD1DULL")];

/* Implements xorshift* https://en.wikipedia.org/wiki/Xorshift#xorshift* 
*  Returns a generator that given the same seed produces the same output sequence
*  The 'state' is not react state, but a stateful generator. As such this may be used on the server (initial render) 
*  When using on the client call useRng inside a context.  
*/

export const rng = (seed:bigint|string) => {
    let x = typeof seed === "bigint" ? seed : BigInt(seed); 

    const next = () =>  {
        x ^= x >> SHIFT1;
        x ^= x << SHIFT2;
        x ^= x >> SHIFT3;

        return x * C;
    }

    return next;
}

type RngContextType = () => bigint;
  
const RngContext = createContext<RngContextType | undefined>(undefined);
  
export const RngProvider: React.FC<{ children: React.ReactNode, seed:string|bigint }> 
    = ({ children, seed="3859305611859994361" }) => {
        const next = useCallback(rng(seed), []);
    
        return (
            <RngContext.Provider value={next}>
                {children}
            </RngContext.Provider>
        );
    };
  

export const useRng = () => {
    const gen = useContext(RngContext);
    return gen; 
}

export const useStatefulRng = (seed:bigint) => {
    const [x, setX] = useState(seed);
    const next = useRng();

    return {
        x, 
        next: () => setX(next())
    }
}