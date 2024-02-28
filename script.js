const canvas = document.getElementById('signatureCanvas');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let penColor = '#000000';
    let penWidth = 2;

    function drawLine(x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = penColor;
        ctx.lineWidth = penWidth;
        ctx.lineCap = 'round'; // Smooth line endings
        ctx.stroke();
    }

    function getTouchPos(canvasDom, touchEvent) {
        const rect = canvasDom.getBoundingClientRect();
        return {
            x: touchEvent.touches[0].clientX - rect.left,
            y: touchEvent.touches[0].clientY - rect.top
        };
    }

    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    canvas.addEventListener('mousemove', (e) => {
        if (isDrawing) {
            drawLine(lastX, lastY, e.offsetX, e.offsetY);
            [lastX, lastY] = [e.offsetX, e.offsetY];
        }
    });

    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent scrolling
        const pos = getTouchPos(canvas, e);
        isDrawing = true;
        [lastX, lastY] = [pos.x, pos.y];
    });

    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault(); // Prevent scrolling
        if (isDrawing) {
            const pos = getTouchPos(canvas, e);
            drawLine(lastX, lastY, pos.x, pos.y);
            [lastX, lastY] = [pos.x, pos.y];
        }
    });

    canvas.addEventListener('touchend', () => {
        isDrawing = false;
    });

    document.getElementById('downloadBtn').addEventListener('click', () => {
        const signatureImage = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = signatureImage;
        downloadLink.download = 'signature.png';
        downloadLink.click();
    });

    document.getElementById('color').addEventListener('input', (e) => {
        penColor = e.target.value;
    });

    document.getElementById('width').addEventListener('input', (e) => {
        penWidth = e.target.value;
    });

    document.getElementById('refreshBtn').addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
