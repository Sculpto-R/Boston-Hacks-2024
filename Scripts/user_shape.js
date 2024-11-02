const drawing_board = document.createElement('div')


drawing_board.style.paddingLeft = "100px"
drawing_board.style.paddingRight = "100px"
drawing_board.style.paddingUp = "100px"
drawing_board.style.paddingDown = "100px"
drawing_board.style.backgroundColor = "beige";
drawing_board.style.top = "500px"
drawing_board.style.bottom = "500px"
drawing_board.style.position = "absolute";

document.body.append(drawing_board)

points = []
lines = []

//this is called to create a point at the position of the mouse. It then adds a line to any subsequent points unless it is the first point ever in points.
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
    tempPoint.position = "absolute"
    document.body.append(tempPoint)

    if (points.length == 0) pass
    else addLine(tempPoint,points[points.length-1])

    points.push(tempPoint)
}

//add a line between any two points
function addLine(p1,p2){
    x1 = p1.style.left
    y1 = p1.style.top
    
    x2 = p2.style.left
    y2 = p2.style.top

    const distance = Math.hypot(x2 - x1, y2 - y1); //distance between the two points.
    const angle = Math.atan2(y2 - y1, x2 - x1)  * (180 / Math.PI); //gets angle between two points

    const line = document.createElement('div')

    line.style.width = `${distance}px`;
    line.style.top = `${y1}px`;
    line.style.left = `${x1}px`;
    line.style.transform = `rotate(${angle}deg)`;

    document.body.append(line)
    lines.push(line)
}


//call this function to make a line from the last point added to the first point added. This will finish the shape.
function finishShape(){
    addLine(points[0],points[points.length - 1])
    line_info_list = []
    for (let i = 0;i < lines.length;i++){
        line_info_list.append(lines[i].style.width)
    }
    angle_info_list = []

    let jsonDict = {}

}


drawing_board.addEventListener('mouse_up',savePoint)



