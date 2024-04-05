// Display all of todos in this calender. This calender displays due date of todos, and terms of todos are planed.

import { useContext } from 'react';
import { IonDatetime } from '@ionic/react';
import { TodosContext } from '../Memo_card/TodoApp';

function Calender() {
    const TodosArray = useContext(TodosContext);
    const handleConsoleLog = () => {
        console.log(TodosArray.todos);
    }
    return (
        <>
            <button onClick={handleConsoleLog}>ボタン</button>
        </>
    );
}

export default Calender;