const drawing_board = document.createElement('div')


drawing_board.style.paddingLeft = "100px"
drawing_board.style.paddingRight = "100px"
drawing_board.style.paddingUp = "100px"
drawing_board.style.paddingDown = "100px"
drawing_board.style.backgroundColor = "beige";
drawing_board.style.top = "500px"
drawing_board.style.bottom = "500px"

document.body.append(drawing_board)

points = []

function savePoint(e){
    mouseX = e.clientX
    mouseY = e.clientY
    const tempPoint = document.createElement('div')
    tempPoint.style.top = mouseY + "px"
    tempPoint.style.left = mouseX + "px"
    tempPoint.style.display = 'inline-block'
    tempPoint.paddingLeft = "5px"
    tempPoint.paddingRight = "5px"
    tempPoint.paddingTop = "5px"
    tempPoint.paddingBottom = "5px"
    tempPoint.backgroundColor = "black"
    document.body.append(tempPoint)
    points.push(tempPoint)
}


drawing_board.addEventListener('mouse_up',savePoint)



