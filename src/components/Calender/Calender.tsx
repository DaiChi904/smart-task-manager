// Display all of todos in this calender. This calender displays due date of todos, and terms of todos are planed.

import { useContext } from 'react';
import { IonDatetime } from '@ionic/react';
import { todosAtom } from '../Memo_card/TodoApp';
import { useAtom } from 'jotai';

function Calender() {
    const [todos, setTodos] = useAtom(todosAtom);
    const handleConsoleLog = () => {
        console.log(todos);
    }
    return (
        <>
            <button onClick={handleConsoleLog}>ボタン</button>
        </>
    );
}

export default Calender;