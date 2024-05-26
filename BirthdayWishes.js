window.onload = function() {
    const canvas = document.getElementById('scratchCard');
    const ctx = canvas.getContext('2d');
    const message = document.getElementById('message');
    const surpriseButton = document.getElementById('surpriseButton');
    const scratchHeader = document.getElementById('scratchHeader');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let totalArea = width * height;
    let scratchedArea = 0;
    const rect = canvas.getBoundingClientRect();

    // Function to draw the big love letter symbol on the canvas
    function drawLoveLetterSymbol() {
        ctx.fillStyle = '#C0C0C0';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = '#FF69B4';
        ctx.font = '150px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('♥️', width / 2, height / 2);
    }

    drawLoveLetterSymbol();

    // Function to handle scratching
    function scratch(e) {
        if (!isDrawing) return;

        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = 20;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
        [lastX, lastY] = [e.clientX - rect.left, e.clientY - rect.top];

        scratchedArea += 20 * 20; // Approximate increase in scratched area

        if (scratchedArea / totalArea > 0.40) {
            canvas.style.display = 'none';
            scratchHeader.style.display = 'none';
            message.classList.remove('hidden');
            surpriseButton.classList.remove('hidden');
        }
    }

    // Mouse events
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        [lastX, lastY] = [e.clientX - rect.left, e.clientY - rect.top];
    });

    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);

    // Mobile touch events
    canvas.addEventListener('touchstart', (e) => {
        isDrawing = true;
        const touch = e.touches[0];
        [lastX, lastY] = [touch.clientX - rect.left, touch.clientY - rect.top];
    });

    canvas.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        scratch(touch);
    });

    canvas.addEventListener('touchend', () => isDrawing = false);
    canvas.addEventListener('touchcancel', () => isDrawing = false);

    // Event listener for the surprise button
    surpriseButton.addEventListener('click', () => {
        alert("I don't know why aloo fry makes you happy,\n" +
            "I don't know why tea brings you comfort,\n" +
            "I don't know why non-veg food satisfies you,\n" +
            "I don't know why you feel shy to talk with girls,\n" +
            "I don't know why you make excuses when I ask to go outside,\n" +
            "I don't know why your character is different..\n"+
            "But Bro...!!\n" +
            "I know that your mental condition is not well, please consult a doctor, and make sure to come outside on your birthday");
    });    
}


