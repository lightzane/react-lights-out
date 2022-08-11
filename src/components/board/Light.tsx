import React from 'react';
import { useContext } from 'react';
import { BoardContext } from '../../store/BoardContext';
import style from './Light.module.scss';

interface Props {
    className?: string;
    index?: number;
    onClick?: (index: number) => void;
    parentRow: number;
}

export const Light: React.FC<Props> = ({ parentRow, className, index, onClick }) => {

    const boardCtx = useContext(BoardContext);

    const board = boardCtx.board;

    const handler = () => {

        if (boardCtx.isAllLightsOn()) {
            return;
        }

        if (onClick && index !== undefined) {
            onClick(index);
        }
    };

    return <>
        <div
            onClick={handler}
            className={`
                ${style.light}
                ${board[parentRow][index] === 1 ? style.on : ''}
                ${className}
            `}
        ></div>
    </>;
};