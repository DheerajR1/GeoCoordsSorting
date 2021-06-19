
function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}

function distanceFunc(lat1, lat2, lon1, lon2) {
    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 = degrees_to_radians(lon1);
    lon2 = degrees_to_radians(lon2);
    lat1 = degrees_to_radians(lat1);
    lat2 = degrees_to_radians(lat2);

    // Haversine formula
    var dlon = lon2 - lon1;
    var dlat = lat2 - lat1;
    var a = Math.pow(Math.sin(dlat / 2), 2)
        + Math.cos(lat1) * Math.cos(lat2)
        * Math.pow(Math.sin(dlon / 2), 2);

    var c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956
    // for miles
    var r = 6371;
    // calculate the result
    return (c * r);
}

function findMinRoute(tsp) {
    var sum = 0;
    var counter = 0;
    var j = 0, i = 0;
    var min = 99999.0;
    var visitedRouteList = [];
    var visitedWeight = [];

    // Starting from the 0th indexed
    // city i.e., the first city
    visitedRouteList.push(0);
    visitedWeight.push(0);

    var route = [tsp.length];

    // Traverse the adjacency
    // matrix tsp[][]
    while (i < tsp.length && j < tsp[i].length) {

        // Corner of the Matrix
        if (counter >= tsp[i].length - 1) {
            break;
        }

        // If this path is unvisited then
        // and if the cost is less then
        // update the cost
        if (j != i && !(visitedRouteList.includes(j))) {
            if (tsp[i][j] < min) {
                min = tsp[i][j];
                route[counter] = j + 1;
            }
        }
        j++;

        // Check all paths from the
        // ith indexed city
        if (j == tsp[i].length) {
            sum += min;
            min = 9999999;
            visitedRouteList.push(route[counter] - 1);
            visitedWeight.push(tsp[i][j - 1]);
            j = 0;
            i = route[counter] - 1;
            counter++;
        }
    }

    // Update the ending city in array
    // from city which was last visited
    i = route[counter - 1] - 1;

    for (j = 0; j < tsp.length; j++) {

        if ((i != j) && tsp[i][j] < min) {
            min = tsp[i][j];
            route[counter] = j + 1;
        }
    }
    sum += min;

    // Started from the node where
    // we finished as well.
    console.log("Minimum path is : ", { visitedRouteList });
    console.log("Minimum visitedWeight is : " + visitedWeight);
    console.log("Minimum Cost is : " + sum);

    return visitedRouteList;
}

function sortCord() {
    var rawCoord = document.getElementById("rawData").value.trim();
    document.getElementById("sortedData").value = "";
    if (rawCoord === "") {
        alert("add few coords please");
    } else {
        var s = rawCoord.replaceAll("\n", ",").replaceAll(" ", "").split(",");

        var namesList1 = [];

        for (var i = 0; i < s.length; i++) {
            namesList1[i] = s[i];
        }
        console.log({ namesList1 });
        var count = (namesList1.length / 2);
        console.log({ count });
        if (count <= 1) {
            alert("please add more than 1 way points please.")
        } else {
            var distance = Array.from(Array(count), () => new Array(count));
            var coords = [count];
            console.log({ count });

            for (var i = 0; i < namesList1.length; i += 2) {
                for (var j = 0; j < namesList1.length; j += 2) {
                    distance[i / 2][j / 2] = distanceFunc(namesList1[i], namesList1[j], namesList1[i + 1], namesList1[j + 1]);
                }
            }

            console.log({ distance });

            var completecoords = [count];
            var individualVals = s.toString().split(",");
            console.log({ individualVals });

            var kk = 0;
            for (var i = 0; i < individualVals.length; i++) {
                completecoords[kk] = individualVals[i] + "," + individualVals[i + 1];
                kk += 1;
                i += 1;
            }
            console.log({ completecoords });

            var visitedRouteList = findMinRoute(distance);

            for (var i = 0; i < visitedRouteList.length; i++) {
                console.log(completecoords[visitedRouteList[i]]);
                document.getElementById("sortedData").value += completecoords[visitedRouteList[i]] + "\n";
            }
            console.log(completecoords.values(0));
            console.log({ visitedRouteList });
        }
    }
}