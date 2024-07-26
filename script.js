let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGamebtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let xBtn = document.querySelector(".x-btn");
let oBtn = document.querySelector(".o-btn");

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let turnO = false;
let turnX = false;
const resetGame = () => {
    turnO = false;
    turnX = false;
    xBtn.style.backgroundColor = "white";
    oBtn.style.backgroundColor = "white";
    xBtn.disabled = false;
    oBtn.disabled = false;
    enableBoxes();
    disableBoxes();
    isGameOver = false;
    msgContainer.classList.add("hide");
};
let player = "X";
xBtn.addEventListener("click", () => {
    turnX = true;
    xBtn.style.backgroundColor = "black";
    oBtn.style.backgroundColor = "white";
    xBtn.disabled = true;
    oBtn.disabled = true;
    enableBoxes();
    player = "X";
});

oBtn.addEventListener("click", () => {
    turnO = true;
    oBtn.style.backgroundColor = "black";
    xBtn.style.backgroundColor = "white";
    oBtn.disabled = true;
    xBtn.disabled = true;
    enableBoxes();
    player = "O";
});
console.log(boxes);
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.style.color = "blue"
            box.style.backgroundColor = "black"

        }
        else if (turnX) {
            box.innerText = "X";
            box.style.color = "red"
            box.style.backgroundColor = "black"
        }
        box.disabled = true;
        checkWinner();
        checkDraw();
        compMoves();
    })
});

const validMove = () => {
    let moves = [];
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        if (pos1val === "") moves.push(pattern[0]);
        if (pos2val === "") moves.push(pattern[1]);
        if (pos3val === "") moves.push(pattern[2]);
    }
    return moves;
}

const findRandomMove = () => {
    let moves = validMove();
    return moves[Math.floor(Math.random() * moves.length)];
}

const compMoves = () => {
    if (isGameOver) return;

    let m = findRandomMove();
    if (m !== undefined) {
        if (turnO) {
            boxes[m].innerText = "X";
            boxes[m].style.color = "red"
            boxes[m].style.backgroundColor = "black"

        }
        if (turnX) {
            boxes[m].innerText = "O";
            boxes[m].style.color = "blue"
            boxes[m].style.backgroundColor = "black"

        }
        boxes[m].disabled = true;
        checkWinner();
        checkDraw();
    }
}

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = "white"
    }
};
let isGameOver = false;
const showWinner = (winner) => {
    isGameOver = true;
    console.log(player);
    if (player === winner) {
        msg.innerText = `Congratulation, You Won`;
        msgContainer.classList.remove("hide");
    }
    else {
        msg.innerText = `Better Luck Next Time`;
        msgContainer.classList.remove("hide");
    }
    disableBoxes();
};

const checkWinner = () => {
    for (pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
            }
        }
    }

};

const checkDraw = () => {
    if (isGameOver != true) {
        let isDraw = true;
        boxes.forEach(e => {
            if (e.innerText === "") isDraw = false;
        })
        if (isDraw) {
            msg.innerText = `DRAW`;
            msgContainer.classList.remove("hide");
            disableBoxes();
            isGameOver = false;
        }
    }
};

newGamebtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

