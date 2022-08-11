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
import { SOUND } from '../../audio/sound.service';

const LOCAL_STORAGE_MOVES = 'moves';

export const Board: React.FC = () => {

    const m = localStorage.getItem(LOCAL_STORAGE_MOVES);

    const savedMove: number = !isNaN(+m) ? +m : 0;

    const boardCtx = useContext(BoardContext);

    const switchLight = boardCtx.switchLight;

    const [totalMoves, setTotalMoves] = useState(savedMove || 0);

    const [isGameOver, setIsGameOver] = useState(false);

    const toast = useRef<Toast>();

    const rowLightClicked = (coordinates: XY) => {
        SOUND.Move.play();

        const { x, y } = coordinates;

        // update origin
        switchLight(x, y);

        setTotalMoves(current => {
            const newMove = current + 1;
            localStorage.setItem(LOCAL_STORAGE_MOVES, newMove.toString());
            return newMove;
        });

        if (boardCtx.isAllLightsOn()) {
            SOUND.Winner.play();
            toast.current.show({
                severity: 'success',
                summary: 'Lights On!',
                detail: 'All lights are now turned ON'
            });
            setIsGameOver(true);
        }
    };

    const resetHandler = () => {
        SOUND.Reset.play();
        boardCtx.startGame();
        if (isGameOver) {
            setTotalMoves(0);
            setIsGameOver(false);
            localStorage.clear();
        }
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