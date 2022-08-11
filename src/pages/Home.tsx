import React from 'react';
import { Board } from '../components/board/Board';
import { BoardProvider } from '../store/BoardContext';

export const Home: React.FC = () => {
    return <>
        <BoardProvider>
            <Board />
        </BoardProvider>
    </>;
};