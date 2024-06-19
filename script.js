document.addEventListener('DOMContentLoaded', () => {
    const draggables = document.querySelectorAll('.draggable');
    const droppables = document.querySelectorAll('.droppable');
    const resetButton = document.getElementById('reset-button');
    const niceJobButton = document.getElementById('nice-job-button');
    const imageContainer = document.getElementById('image-container');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });

    droppables.forEach(droppable => {
        droppable.addEventListener('dragover', dragOver);
        droppable.addEventListener('drop', drop);
    });

    resetButton.addEventListener('click', resetGame);

    function dragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.id);
    }

    function dragOver(event) {
        event.preventDefault();
    }

    function drop(event) {
        event.preventDefault();
        const id = event.dataTransfer.getData('text');
        const draggable = document.getElementById(id);
        const droppable = event.target.closest('.droppable'); // Find the closest droppable element

        if (droppable.getAttribute('data-name') === id) {
            droppable.appendChild(draggable);
            draggable.style.border = '2px solid #4caf50';
            checkCompletion();
        } else {
            alert('Wrong match! Try again.');
        }
    }

    function checkCompletion() {
        let matched = 0;
        droppables.forEach(droppable => {
            if (droppable.children.length > 0 && droppable.children[0].id === droppable.getAttribute('data-name')) {
                matched++;
            }
        });
        if (matched === draggables.length) {
            niceJobButton.style.display = 'block';
        }
    }

    // function resetGame() {
    //     droppables.forEach(droppable => {
    //         while (droppable.firstChild) {
    //             droppable.removeChild(droppable.firstChild);
    //         }
    //     });

    //     draggables.forEach(draggable => {
    //         draggable.style.border = '2px solid #00796b';
    //         imageContainer.appendChild(draggable);
    //     });

    //     niceJobButton.style.display = 'none';
    // }
    function resetGame() {
        draggables.forEach(draggable => {
            draggable.style.border = '2px solid #00796b';
            draggable.style.display = 'inline-block'; // Show the images again
            imageContainer.appendChild(draggable);
        });
    
        niceJobButton.style.display = 'none';
    }
});
