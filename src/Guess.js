import React from 'react'
import ConfettiGenerator from "confetti-js";

export default function Guess(props){
    const [clicked, setClicked] = React.useState(false);
    const [guess, setGuess] = React.useState("");
    const [numberState, setNumberState] = React.useState(0);
    const [orderState, setOrderState] = React.useState(0);
    var confettiElement = document.getElementById('my-canvas');
    var confettiSettings = { target: confettiElement };
    var confetti = new ConfettiGenerator(confettiSettings);

    function trigger() {
        checkOnServer();
        setClicked(prevValue => !prevValue);
    }

    function toggler(e) {
        const inputValue = e.target.value;
        const change = inputValue[inputValue.length - 1];
        parseInt(inputValue);
        if (!inputValue.slice(0, inputValue.length - 1).includes(parseInt(change))) {
            if (inputValue.length <= 4) {
                setGuess(inputValue);
            } else {
                setGuess(inputValue.slice(0, 4));
            }
        }
    }

    async function checkOnServer() {
        try {
            const response = await fetch(`https://gamechecker.vercel.app/check?guess=${guess}&chatId=${props.chatId}&userId=${props.userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(`https://gamechecker.vercel.app/check?guess=${guess}&chatId=${props.chatId}&userId=${props.userId}`)
            const data = await response.json();
            setNumberState(data.Number);
            setOrderState(data.Order);

            if (data.Order === 4 && data.Number === 4) {
                alert("CONGRATULATIONS");
                confetti.render();
            } else {
                props.NewGuess();
            }
        } catch (error) {
            console.error('Error checking on server:', error);
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center mt-4 ">
                <div className="col-3 col-md-3 col-lg-1">
                    <input className="form-control text-center me-2 px-0" style={{ "min-width": "40px" }} value={guess} type="number" readOnly={clicked} onChange={toggler}></input>
                </div>
                <div className="col-2 col-md-1 btn btn-secondary me-2">{numberState}</div>
                <div className="col-2 col-md-1 btn btn-secondary me-2">{orderState}</div>
                <div className={`col-3 col-md-3 col-lg-1 btn btn-success ${clicked && "invisible"}`} onClick={() => { trigger() }}>GO</div>
            </div>
        </div>
    );
}
