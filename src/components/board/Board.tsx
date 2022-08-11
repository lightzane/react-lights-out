import React from 'react';
import { useContext } from 'react';
import { XY } from '../../shared/interfaces/xy.interface';
import { BoardContext } from '../../store/BoardContext';
import style from './Board.module.scss';
import { RowLight } from './RowLight';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { useState } from 'react';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

export const Board: React.FC = () => {

    const boardCtx = useContext(BoardContext);

    const switchLight = boardCtx.switchLight;

    const [totalMoves, setTotalMoves] = useState(0);

    const toast = useRef<Toast>();

    const rowLightClicked = (coordinates: XY) => {
        const { x, y } = coordinates;

        // update origin
        switchLight(x, y);

        setTotalMoves(current => current + 1);

        if (boardCtx.isAllLightsOn()) {
            toast.current.show({
                severity: 'success',
                summary: 'Lights On!',
                detail: 'All lights are now turned ON'
            });
        }
    };

    const resetHandler = () => {
        boardCtx.startGame();
        setTotalMoves(0);
    };

    return <>
        <Toast ref={toast} position='center' />
        <div className={style.board}>
            <div className='flex justify-content-center mb-3'>
                <Button
                    label='RESET GAME'
                    className='p-button-sm p-button-rounded'
                    onClick={resetHandler}
                />
            </div>
            {
                Array(5).fill('').map((v, i) => (
                    <RowLight key={i} index={i} onClick={rowLightClicked} />
                ))
            }
            <div className='flex justify-content-center mt-5'>
                <Badge
                    severity='info'
                    size='xlarge'
                    value={totalMoves}
                />
            </div>
        </div>
    </>;
};