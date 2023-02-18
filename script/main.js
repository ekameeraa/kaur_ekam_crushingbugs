//variables always go at the top -> this is step 1
// these are the connections that you're making to elements on the page 
//use CSS slectors to make connection to elements with Javascript

//create a 1 to 1 connection with a variable-> querySelector("queryString")
// let theButton = document.querySelector("buttonOne");

//create a 1 to many connection with a variable -> queryselectorAll("queryString")
let theButtons = document.querySelectorAll("#buttonHolder img"), 
    theHeading = document.querySelector("#headLine h1"),
    puzzleBoard = document.querySelector(".puzzle-board"),
    puzzlePieces = document.querySelectorAll("puzzle-pieces img"),   
	puzzle = document.querySelectorAll(".puzzle-pieces"),
    dropZones = document.querySelectorAll(".drop-zone"),
// store the dragged piece in a global variable
// because wee need it in the handledrop function
draggedPiece;

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    if (event.target.tagName === 'IMG' || event.target.classList.contains('dropped')) {
      return;
    } else {
      event.target.appendChild(document.getElementById(data));
      event.target.classList.add('dropped');
      var currentDraggable = document.getElementById(data);
      currentDraggable.removeAttribute('draggable');
      currentDraggable.style.cursor = 'default';
      currentDraggable.style.position = 'static';
      currentDraggable.style.top = '';
      currentDraggable.style.left = '';
    }
  }
  



//step 3
//functionality always goes in the middle -> how do we want
//the app to behave?
	//this'' is a javascript template string. It tells the JS engine to evaluate the  expression 
	//inside the braces - run that little bit of code. In this case it's just pulling the ID
	//button we clicked on and putting it at the end of the image name (0,1,2,3)
	//and updating the background-image style of the puzzle board element. 
	
	function changeBGImage() {
	puzzleBoard.style.backgroundImage = 'url(images/backGround${this.id}.jpg)';

	dropZones.forEach(zone => {
		if (zone.firstChild) {
			puzzle.appendchild(zone.firstChild);
		}
	})
}

function handleStartDrag() {
	console.log('started dragging this pieces',this ); 

	//stora a reference to the puzzle piece image that we're dragging 
	//so we can use it later and move it to a drop zone
	draggedPiece = this;
}

function handleDragOver(e) {
	e.preventDefault();  //e is shorthand for event
	//this overrides the default dragover behaviour
	console.log('drag over me'); 
}

function handledrop(e) {
	e.preventDefault();
	console.log('dropped something on me');
	//bug fix #1 should go here, and it's at most 3 lines of JS code
	
	// this line is going to move the dragged piece from the left side of the board
	// into whatever drop zone wee choose, appendChild means "add element to the container"

	if (this.children.lenght > 0) {
		console.log('you cannot drop more than one piece in a drop zone');
	}
	else {
	this.appendchild(draggedPiece);
    }
 }

//step 2
//event handling always foes at the bottom =>
//how do we want users to interact with our app

//1 to 1 event handling
//theButton.addEventListener("click", changeBGImage);

//1 to 1 event handling
//add event handling to each button in the collection of buttons, one at a time
theButtons.forEach(button => button.addEventListener("click",changeBGImage));

//add the drag event handling to the puzzle pieces
puzzlePieces.forEach(piece => piece.addEventListener('dragstart',handleStartDrag));
function createPuzzlePieces(puzzleIndex) {
    // Remove any existing puzzle pieces
    const dragZone = document.querySelector(`#pz${puzzleIndex}_drag_zone`);
    while (dragZone.firstChild) {
      dragZone.removeChild(dragZone.firstChild);
    }
  
    const img = `images/puzzle${puzzleIndex}.jpg`;
    const pieces = 12;
  
    // Add puzzle pieces to drag zone
    for (let i = 0; i < pieces; i++) {
      const newPuzzlePiece = document.createElement("img");
      newPuzzlePiece.setAttribute("src", img);
      newPuzzlePiece.setAttribute("draggable", "true");
      newPuzzlePiece.setAttribute("id", `piece${i}`);
      newPuzzlePiece.setAttribute("class", "puzzle-piece");
      newPuzzlePiece.style.border = "2px solid black";
      dragZone.appendChild(newPuzzlePiece);
    }
  
    // Remove or reparent puzzle pieces in drop zones
    resetBoard();
  }
  
  function resetBoard() {
    const dropZones = document.querySelectorAll(".drop-zone");
    dropZones.forEach((dropZone) => {
      while (dropZone.firstChild) {
        const removedPiece = dropZone.removeChild(dropZone.firstChild);
        const dragZone = document.querySelector(`#${removedPiece.dataset.drag}`);
        dragZone.appendChild(removedPiece);
      }
    });
  }

//add the dragover AND the drop event handling to the drop zones

dropZones.forEach(zone => zone.addEventListener("dragover", handleDragOver));

//add the drop event handling
dropZones.forEach(zone => zone.addEventListener("drop", handledrop));

