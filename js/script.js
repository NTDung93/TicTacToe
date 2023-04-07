const gameZone = document.querySelector(".gameZone")
const displayTurn = document.querySelector(".turn")
const cells = ["", "", "", "", "", "", "", "", ""]

let go = "circle"
let gogo = "doge"
// displayTurn.textContent = "Circle goes first!"
displayTurn.textContent = "Doge goes first!"

function displayBoard() {
    cells.forEach((_cell, index) => {
        const singleCell = document.createElement('div')
        singleCell.classList.add('singleSquare')
        singleCell.id = index
        singleCell.addEventListener('click', handleClick, { once: true }) // { once: true } is to keep the element can't be clicked again
        gameZone.append(singleCell)
    })
}

//create and display the game board
displayBoard()

//handle all events that happen when click a single cell
function handleClick(e) {
    const circle = document.createElement('div')
    circle.classList.add(go)

    if (go === "circle") {
        circle.innerHTML = `  
            <img src="/image/dogecoin-logo.png" alt="" />
        `
    } else {
        circle.innerHTML = `  
            <img src="/image/salad-cat.png" alt="" />
        `
    }

    e.target.append(circle)

    //if this turn the value of go is "circle" already, change the value of the next turn
    go = (go === "circle" ? "cross" : "circle")
    gogo = (go === "circle" ? "doge" : "cat")
    displayTurn.textContent = "it is " + gogo + "'s turn."

    //check win
    checkWin()

}

let cntChecked = 0
let winAlready = false

function checkWin() {
    cntChecked++;

    const allSquares = document.querySelectorAll(".singleSquare")
    console.log(allSquares);
    console.log(cntChecked);
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    winningCombos.forEach(array => {
        const circleWins = array.every(indexCell =>
            //check cái ô có index là indexCell có tồn tại k, nếu có thì check tiếp xem classList có chứa class 'circle' không?
            allSquares[indexCell].firstChild?.classList.contains('circle')
        )

        if (circleWins) {
            // displayTurn.textContent = "Circle Wins!"
            winAlready = true
            displayTurn.textContent = "Doge Wins!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            //restart button
            document.querySelector(".restart").style.display = 'block'
            console.log("aaaaa");
            return
        }

    })

    winningCombos.forEach(array => {
        const crossWins = array.every(indexCell =>
            allSquares[indexCell].firstChild?.classList.contains('cross')
        )

        if (crossWins) {
            // displayTurn.textContent = "Cross Wins!"
            winAlready = true
            displayTurn.textContent = "Cat Wins!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            //restart button
            document.querySelector(".restart").style.display = 'block'
            console.log("bbbbb");
            return
        }

    })

    if (cntChecked == 9 && winAlready === false) {
        displayTurn.textContent = "Draw!"
        allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
        //restart button
        document.querySelector(".restart").style.display = 'block'
        return
    }

    // winningCombos.forEach(array => {
    //     const circleWins = array.every(indexCell =>
    //         allSquares[indexCell].firstChild?.classList.contains('circle')
    //     )

    //     const crossWins = array.every(indexCell =>
    //         allSquares[indexCell].firstChild?.classList.contains('cross')
    //     )

    //     const isDraw = [...allSquares].every(index =>
    //         allSquares[index].classList.contains('circle')
    //         ||
    //         allSquares[index].classList.contains('cross')
    //     )
    //     if (circleWins) {
    //         // displayTurn.textContent = "Circle Wins!"
    //         winAlready = true
    //         displayTurn.textContent = "Doge Wins!"
    //         allSquares.forEach(square => square.replaceWith(square.cloneNode(true))) //xóa hết các event listener của các square
    //         //restart button
    //         document.querySelector(".restart").style.display = 'block'
    //         console.log("aaaaa");
    //         return
    //     }
    //     else if (crossWins) {
    //         // displayTurn.textContent = "Cross Wins!"
    //         winAlready = true
    //         displayTurn.textContent = "Cat Wins!"
    //         allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
    //         //restart button
    //         document.querySelector(".restart").style.display = 'block'
    //         console.log("bbbbb");
    //         return
    //     }
    //     // cntChecked === 9 && !circleWins && !crossWins
    //     else if (isDraw) {
    //         displayTurn.textContent = "Draw!"
    //         allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
    //         //restart button
    //         document.querySelector(".restart").style.display = 'block'
    //         return
    //     }
    // })
}

function clearBoard() {
    gameZone.innerHTML = ""
}

//restart game
document.querySelector(".restart").addEventListener('click', event => {
    clearBoard()
    document.querySelector(".restart").style.display = 'none'
    go = "circle"
    gogo = "doge"
    displayTurn.textContent = "Doge goes first!"
    cntChecked = 0
    winAlready = false
    displayBoard()
})

