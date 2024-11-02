const drawing_board = document.createElement('div')


drawing_board.style.paddingLeft = "100px"
drawing_board.style.paddingRight = "100px" //default settings
drawing_board.style.paddingUp = "100px"
drawing_board.style.paddingDown = "100px"
drawing_board.style.backgroundColor = "beige";
drawing_board.style.top = "500px"
drawing_board.style.bottom = "500px"
drawing_board.style.position = "absolute";

document.body.append(drawing_board)

points = [] //just has a list of points as the object
lines = [] //has tuples of three values: The line object, and the two point objects

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
    lines.push([line,p1,p2]) 
}


//call this function to make a line from the last point added to the first point added. This will finish the shape.
function finishShape(){
    addLine(points[0],points[points.length - 1])

    let line_info_list = [] //we store information about the length of the lines here as well as the end point coordinates.
    //[line_length, p1 coords, p2 coords]
    for (let i = 0;i < lines.length;i++){
        let line_length = lines[i][0].style.width
        let p1_coordinates = [lines[i][1].style.left,lines[i][1].style.top]//gets the coordinates of p1
        let p2_coordinates = [lines[i][2].style.left,lines[i][2].style.top]//gets coordinates of p2
        //these two points p1 and p2 are the two points that 


        line_info_list.push([line_length,p1_coordinates,p2_coordinates])
    }
    let angle_info_list = [] //we store information about the angles of the lines here
    //this will now have an angle_tuple = [[acute_angle,obtuse_angle],previous_p, after_p] in every value.

    let point_coord_list = []//uses point number coordinates instead of the point objects
    for (let i =0; i < points.length;i++){
        let x = points[i].style.left
        let y = points[i].style.up

        point_coord_list.push([x,y])
    }

    //fills up angle_info_list with angle_tuples
    for (let i = 0; i < point_coord_list.length;i++){
        let previous_p
        let after_p
        let current_p

        let angle_tuple = []
        if (i == 0){
            current_p = point_coord_list[i]
            after_p = point_coord_list[i+1]
            previous_p = point_coord_list[point_coord_list.length-1]
        }else if (i == point_coord_list.length-1){
            current_p = point_coord_list[i]
            after_p = point_coord_list[0]
            previous_p = point_coord_list[i-1]
        }else{
            current_p = point_coord_list[i]
            after_p = point_coord_list[i+1]
            previous_p = point_coord_list[i+1]
        }


        let acute_angle = calculateAngle(previous_p,current_p,after_p)
        let obtuse_angle = 180 - acute_angle
        angle_tuple.push([acute_angle,obtuse_angle])//first index of angle_tuple is a list. [acute angle, obtuse angle]

        angle_tuple.push(previous_p)
        angle_tuple.push(after_p)

        angle_info_list.push(angle_tuple)
    }

    //replaces the first index of angle_tuple, which is a pair of an obtuse or acute angle. and determines if we should be using the obtuse or acute angle.
    for (let i = 0;i < angle_info_list.length;i++){
        angle_info_list[i][0] = acuteOrObtuse(angle_info_list[i])
    }



    let jsonDict = {}

}

//given the entire angle_tuple, return either the acute or the obtuse angle, which one do we use?
function acuteOrObtuse(angle_tuple){
    let obtuse_angle = angle_tuple[0][1]
    let acute_angle = angle_tuple[0][0]



    let previous_p = angle_tuple[1]
    let after_p = angle_tiple[2]

    let x1 = previous_p[0]
    let y1 = previous_p[1]

    let x2 = after_p[0]
    let y2 = after_p[1]

    let midpoint_p = findMidpoint(previous_p,after_p)//grabs the midpoint between previous_p and after_p
    let intersect_count = 0
    for (let i = 0; i<line_info_list.length;i++){
        let first_p = line_info_list[i][1]
        let next_p = line_info_list[i][2]
        if (isIntersect(first_p,next_p,midpoint_p) == true) intersect_count+=1

    }
    //then we know that midpoint_p is not in the polygon
    if ((intersect_count % 2) == 0) return obtuse_angle
    return acute_angle
    


}

//find the midpoint between two coordinates. return the midpoint
function findMidpoint(p1_coordinates,p2_coordinates){
    let x1 = p1_coordinates[0]
    let y1= p1_coordinates[1]

    let x2 = p2_coordinates[0]
    let y2 = p2_coordinates[1]

    return [(x1+x2)/2,(y1+y2)/2]
}

function calculateAngle(previous_p,current_p,after_p) {
    let x1 = previous_p[0]
    let y1 = previous_p[1]

    let x2 = current_p[0]
    let y2 = current_p[1]

    let x3 = after_p[0]
    let y3 = after_p[1]
    // Step 1: Create vectors AB and BC
    const ABx = x2 - x1;
    const ABy = y2 - y1;
    const BCx = x3 - x2;
    const BCy = y3 - y2;

    // Step 2: Calculate the dot product of AB and BC
    const dotProduct = ABx * BCx + ABy * BCy;

    // Step 3: Calculate the magnitudes of AB and BC
    const magnitudeAB = Math.sqrt(ABx * ABx + ABy * ABy);
    const magnitudeBC = Math.sqrt(BCx * BCx + BCy * BCy);

    // Step 4: Calculate the cosine of the angle
    const cosTheta = dotProduct / (magnitudeAB * magnitudeBC);

    // Step 5: Calculate the angle in radians
    const angleRadians = Math.acos(cosTheta);

    // Convert the angle to degrees (optional)
    const angleDegrees = angleRadians * (180 / Math.PI);

    return angleDegrees; // Returns the angle in degrees
}





//calculates the linear equation between any two points
function calculateLinearEquation(p1_coordinates,p2_coordinates) {
    const x1 = p1_coordinates[0]
    const y1 = p1_coordinates[1]
    const x2 = p2_coordinates[0]
    const y2 = p2_coordinates[1]
    // Check for a vertical line to avoid division by zero
    if (x2 - x1 === 0) {
        return null; // Undefined slope, line is vertical
    }
    
    // Step 1: Calculate the slope (m)
    const m = (y2 - y1) / (x2 - x1);

    // Step 2: Calculate the y-intercept (b) using one of the points
    const b = y1 - m * x1;

    // Step 3: Return the equation in slope-intercept form y = mx + b
    return [m,b];
}

//takes in a linear equation and the Y coordinate. Output the corresponding x coordinate
function XLin(lin_equation,query_point_coordinates){
    const y = query_point_coordinates[1]
    const slope = lin_equation[0]
    const intercept = lin_equation[1]

    return (y-intercept)/slope
}



//takes in the coordinates of two points and a third coordinate point. Determines if going left, query_point intersects the hypo line between p1 and p2
//returns true or false
function isIntersect(p1_coordinates,p2_coordinates,query_point_coordinates){
    const x1 = p1_coordinates[0]
    const y1 = p1_coordinates[1]
    const x2 = p2_coordinates[0]
    const y2 = p2_coordinates[1]

    const qx = query_point_coordinates[0]
    const qy = query_point_coordinates[1]

    const highY = Math.max(y1,y2)
    const lowY = Math.min(y1,y2)

    if (qy < lowY || qy > highY ) return false


    const lin_equation = calculateLinearEquation(p1_coordinates,p2_coordinates)

    const same_x = Xlin(lin_equation,query_point_coordinates) //using the lin_equation, calculates the  corresponding x value that is on the linear equation and same y level as query_coordinates


    if (qx < same_x) return false

    return true
}


drawing_board.addEventListener('mouse_up',savePoint)



