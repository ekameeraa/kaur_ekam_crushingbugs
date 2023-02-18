let theButtons = document.querySelectorAll("#buttonHolder img"),
    theHeading = document.querySelector("#headLine h1"),
    puzzleBoard = document.querySelector(".puzzle-board"),
    puzzlePieces = document.querySelectorAll(".puzzle-pieces img"),
    dropZones = document.querySelectorAll('.drop-zone'),
    mainBoard = document.querySelector('.puzzle-pieces'),

    draggedPiece = null; 


function changeBGImage() {
    dropZones.forEach(zone => {
        while (zone.firstChild) {
            zone.removeChild(zone.firstChild);
        }
    });

    puzzlePieces.forEach(piece => {
        piece.classList.remove("dropped");
        mainBoard.appendChild(piece);
    });

    puzzleBoard.style.backgroundImage = `url(images/backGround${this.id}.jpg)`;
}

function handleStartDrag() { 
    console.log('started dragging this piece:', this);
    draggedPiece = this;
}

function handleDragOver(e) { 
    e.preventDefault(); 
    console.log('dragged over me');
}

function handleDrop(e) {
    e.preventDefault();
    console.log('dropped something on me');

    const dropZone = this;

    // check if the drop zone has a piece already
    const existingPiece = dropZone.querySelector('img');
    if (existingPiece) {
        puzzleBoard.insertBefore(draggedPiece, existingPiece);
        dropZone.removeChild(existingPiece);
        mainBoard.appendChild(existingPiece);
    }

    // add the dropped piece to the drop zone
    dropZone.appendChild(draggedPiece);

    // mark the piece as dropped
    draggedPiece.classList.add("dropped");

    // clear the draggedPiece reference
    draggedPiece = null;
}

theButtons.forEach(button => button.addEventListener("click", changeBGImage));

puzzlePieces.forEach(piece => piece.addEventListener("dragstart", handleStartDrag));

dropZones.forEach(zone => zone.addEventListener("dragover", handleDragOver));

dropZones.forEach(zone => zone.addEventListener("drop", handleDrop));