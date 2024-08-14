export default function findAdjacentNearestTarget(p5, currentRouter, allRouters, target) {
    let adjacents = [];

    if (currentRouter.closestRouter.length === 0) {
      adjacents = currentRouter.closestRouters.filter (
        (router) => routers.find((e)=> e.entrancePoint.x === router.x && e.entrancePoint.y === router.y).visited === false 
        && (router.type === "router" || p5.dist(router.x, router.y, target.x, target.y) === 0)
      )
      // If the router has two or more closest routers that are not yet visited ***
      adjacents.filter((router) => {
        let counter = 0;
        if (routers.find((e)=> e.entrancePoint.x === router.x && e.entrancePoint.y === router.y).closestRouters.some((element)=>routers.find((e)=> e.entrancePoint.x === element.x && e.entrancePoint.y === element.y).visited === false))  {
          counter ++;
        }
        return counter >= 2
      })
    }
    
    let nearestToTarget = currentRouter;
    
    if (Math.random() <= 0.1) {
      let randomIndex = Math.floor(Math.random()*adjacents.length);
      nearestToTarget = routers.find((e)=> {        
        return e.entrancePoint.x === adjacents[randomIndex].x && e.entrancePoint.y === adjacents[randomIndex].y
      });
    } else {
      adjacents.forEach((adjacent) => {
        if (
          p5.dist(
            adjacent.x,
            adjacent.y,
            target.x,
            target.y
          ) <
          p5.dist(
            nearestToTarget.entrancePoint.x,
            nearestToTarget.entrancePoint.y,
            target.x,
            target.y
          )
        ) 
          nearestToTarget = routers.find((e)=> e.entrancePoint.x === adjacent.x && e.entrancePoint.y === adjacent.y);
      });
    }
    if (routerMovements.includes(routers[0]) === false) {
      routerMovements.push(routers[0]);
      routers[0].visited = true;
    }
    if (routerMovements.includes(nearestToTarget) === false) {
      routerMovements.push(nearestToTarget);
      nearestToTarget.visited = true;
    }
    if (
      nearestToTarget.entrancePoint.x === target.x &&
      nearestToTarget.entrancePoint.y === target.y
    ) {
      return true;
    } else {
      findAdjacentNearestTarget(p5, nearestToTarget, allRouters, target);
    }
}