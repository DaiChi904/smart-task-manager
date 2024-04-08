import "./expeliment.css"


function Expelimentalcalender() {
    const renderSet = [
        {
            day: 1,
            info: null,
        },
        {
            day: 2,
            info: [{todo: "test1"}, {todo: "test2"}]
        },
        {
            day: 3,
            info: null,
        },
        {
            day: 4,
            info: [{todo: "test3"}, {todo: "test3"}]
        },
    ]
    
    return (
        <>
            {renderSet.map((renderSet) => (
                <div className='Calendar-Children'>
                    {renderSet.day}
                    {renderSet.info && renderSet.info.map((info) => (
                        <div className="test">
                            {info.todo}
                        </div>
                    ))}
                </div>
            ))}
        </>
    )    
}

export default Expelimentalcalender;