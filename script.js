
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const pythonCode = [
    'def hack():', 'import os', 'socket.connect()', 'for i in range(10):',
    'if __name__ ==', 'class Exploit:', 'try:', 'except:', 'while True:',
    'print("pwned")', 'return 0', 'sys.exit()', 'buffer = []', 'payload = ""',
    'shellcode =', 'lambda x:', 'enumerate()', 'with open():', '__init__(self)',
    'subprocess.call()', 'base64.decode()', 'hashlib.sha256()', 'requests.get()',
    'BeautifulSoup()', 'asyncio.run()', 'threading.Thread()', '@property',
    'yield from', 'assert', 'global', 'nonlocal', 'pass', 'break', 'continue'
];

const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

for (let i = 0; i < columns; i++) {
    drops[i] = 0;
}

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0080ff';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = pythonCode[Math.floor(Math.random() * pythonCode.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(draw, 50);


window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.links li');
    links.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(10px)';
        setTimeout(() => {
            link.style.transition = 'all 0.5s ease';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, 200 * (index + 1));
    });
});


document.addEventListener('mousemove', function(e) {
    if (Math.random() > 0.95) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = e.clientX + 'px';
        particle.style.top = e.clientY + 'px';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.backgroundColor = '#0080ff';
        particle.style.pointerEvents = 'none';
        particle.style.opacity = '0.8';
        particle.style.zIndex = '4';
        document.body.appendChild(particle);

        let opacity = 0.8;
        const fade = setInterval(() => {
            opacity -= 0.05;
            particle.style.opacity = opacity;
            if (opacity <= 0) {
                clearInterval(fade);
                particle.remove();
            }
        }, 50);
    }
});


const glitchText = document.querySelector('.glitch');
const codes = ['0x7f454c46', '0xdeadbeef', '0x41414141', '0x90909090', '0xc0ffee'];
setInterval(() => {
    glitchText.textContent = codes[Math.floor(Math.random() * codes.length)];
}, 3000);