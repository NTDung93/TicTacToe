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

function checkWin() {
    cntChecked++;

    const allSquares = document.querySelectorAll(".singleSquare")
    console.log(allSquares);
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
            displayTurn.textContent = "Doge Wins!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            //restart button
            document.querySelector(".restart").style.display = 'block'
            return
        }

    })

    winningCombos.forEach(array => {
        const crossWins = array.every(indexCell =>
            allSquares[indexCell].firstChild?.classList.contains('cross')
        )

        if (crossWins) {
            // displayTurn.textContent = "Cross Wins!"
            displayTurn.textContent = "Cat Wins!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            //restart button
            document.querySelector(".restart").style.display = 'block'
            return
        }

    })

    if (cntChecked == 9) {
        displayTurn.textContent = "Draw!"
        allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
        //restart button
        document.querySelector(".restart").style.display = 'block'
        return
    }
}

function clearBoard() {
    gameZone.innerHTML = ""
}

//restart game
document.querySelector(".restart").addEventListener('click', event => {
    clearBoard()
    document.querySelector(".restart").style.display = 'none'
    let go = "circle"
    displayTurn.textContent = "Doge goes first!"
    cntChecked = 0
    displayBoard()
})

