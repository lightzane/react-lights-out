import React from 'react';
import { useContext } from 'react';
import { XY } from '../../shared/interfaces/xy.interface';
import { BoardContext } from '../../store/BoardContext';
import { Light } from './Light';

interface Props {
    index?: number;
    onClick?: (coordinates: XY) => void;
}

export const RowLight: React.FC<Props> = ({ index, onClick }) => {

    const boardCtx = useContext(BoardContext);

    const board = boardCtx.board;

    if (!board.length) {
        return <></>;
    }

    const onLightClicked = (key: number) => {
        if (onClick && index !== undefined) {
            onClick({
                x: key,
                y: index
            });
        }
    };

    return <>
        <div className='my-2 flex justify-content-center align-items-center'>
            {
                Array(5).fill('').map((v, i) => (
                    <Light
                        parentRow={index}
                        index={i}
                        key={i}
                        className='mx-2'
                        onClick={onLightClicked}
                    />
                ))
            }
        </div>
    </>;
};