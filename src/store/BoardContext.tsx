import React, { createContext, useEffect, useState } from 'react';

export interface BoardContextType {
    board: number[][];
    isAllLightsOn: () => boolean;
    updateBoard: (board: number[][]) => void;
    switchLight: (x: number, y: number) => void;
    startGame: () => void;
}

export const BoardContext: React.Context<BoardContextType> = createContext({
    board: [],
    isAllLightsOn: () => false,
    updateBoard: () => { },
    switchLight: () => { },
    startGame: () => { }
});

export const BoardProvider: React.FC<{ children: React.ReactNode; }> = ({ children }) => {

    const [board, setBoard] = useState([]);

    useEffect(() => {
        const _board: number[][] = [];

        for (let y = 0; y < 5; y++) {
            _board[y] = [];
            for (let x = 0; x < 5; x++) {
                _board[y].push(0);
            }
        }

        setBoard(_board);
    }, []);

    const isAllLightsOn = (): boolean => {

        for (let y = 0; y < 5; y++) {
            for (let x = 0; x < 5; x++) {
                if (board[y][x] === 0) {
                    return false;
                }
            }
        }

        return true;
    };

    const updateBoard = (board: number[][]): void => {
        setBoard(JSON.parse(JSON.stringify(board)));
    };

    const switchLight = (x: number, y: number) => {
        // origin
        toggleLight(x, y);

        const n = y - 1;
        const e = x - 1;
        const w = x + 1;
        const s = y + 1;

        if (n >= 0) {
            toggleLight(x, n);
        }

        if (e >= 0) {
            toggleLight(e, y);
        }

        if (w <= 4) {
            toggleLight(w, y);
        }

        if (s <= 4) {
            toggleLight(x, s);
        }

        updateBoard(board);
    };

    const toggleLight = (x: number, y: number) => {
        const binary = board[y][x];
        board[y][x] = binary === 1 ? 0 : 1;
    };

    const startGame = () => {
        // Repeat 25x repeating the random toggleLight
        if (board.length) {
            const maxRepetition = Math.floor(Math.random() * 25);
            for (let i = 0; i < maxRepetition; i++) {
                if (Math.random() > 0.5) {
                    const x = Math.floor(Math.random() * 5);
                    const y = Math.floor(Math.random() * 5);
                    switchLight(x, y);
                }
            }
            updateBoard(board);
        }
    };

    const context: BoardContextType = {
        board,
        isAllLightsOn,
        updateBoard,
        switchLight,
        startGame
    };

    return <>
        <BoardContext.Provider value={context}>
            {children}
        </BoardContext.Provider>
    </>;
};