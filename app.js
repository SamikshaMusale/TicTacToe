let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");

let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Box was clicked");
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        }
        else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        
        checkWinner();
    });
});

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    };
};

const resetGame = () => {
    turnO = true;
    enableBoxes();
}

const checkWinner = () => {
    let winnerFound = false;
    
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                disableAllBoxes();
                break;
            }
        }
    }
    if (!winnerFound) {
        let allFilled = true;
        boxes.forEach(box => {
            if (box.innerText === "") {
                allFilled = false;
            }
        });

        if (allFilled) {
            showTie();
        }
    }
}

let close = document.querySelector("#close");
close.onclick = () => {
    closePopup()
}

const showWinner = (winner) => {
    const popup = document.getElementById("popup");
    const winnerMessage = document.getElementById("winner-message");
    winnerMessage.innerText = `🎉 Player ${winner} Wins! 🎉`;
    popup.classList.remove("hidden");
};

const closePopup = () => {
    document.getElementById("popup").classList.add("hidden");
    location.reload(); // Optional: restart game on close
};

const disableAllBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

reset.addEventListener("click" , resetGame);

const showTie = () => {
    const popup = document.getElementById("popup");
    const winnerMessage = document.getElementById("winner-message");
    winnerMessage.innerText = `😐 It's a Tie! 😐`;
    popup.classList.remove("hidden");
};
