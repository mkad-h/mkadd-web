
let drawInterval;
let glitchInterval;
let particleCount = 0;
const MAX_PARTICLES = 50; 
let lastResize = 0;
let lastMouseMove = 0;

const canvas = document.getElementById('matrix');
if (!canvas) {
    console.error('Canvas elemento no encontrado');
    throw new Error('Canvas requerido no está disponible');
}

const ctx = canvas.getContext('2d');
if (!ctx) {
    console.error('Contexto 2D no soportado por el navegador');
    throw new Error('Canvas 2D context no disponible');
}

canvas.width = Math.min(window.innerWidth, 3840);
canvas.height = Math.min(window.innerHeight, 2160);


const matrixChars = [
    'ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ', 'サ', 'シ', 'ス', 'セ', 'ソ',
    'タ', 'チ', 'ツ', 'テ', 'ト', 'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
    'マ', 'ミ', 'ム', 'メ', 'モ', 'ヤ', 'ユ', 'ヨ', 'ラ', 'リ', 'ル', 'レ', 'ロ', 'ワ', 'ヲ', 'ン',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    '!', '@', '#', '


let lastFontSize = fontSize;
function validateFontSize() {
    const computedStyle = window.getComputedStyle(document.body);
    const currentBaseFontSize = parseFloat(computedStyle.fontSize) || 16;
    
   
    if (currentBaseFontSize < 8 || currentBaseFontSize > 72) {
        console.warn('Tamaño de fuente sospechoso detectado, usando valor seguro');
        return 14; 
    
    return Math.min(Math.max(currentBaseFontSize * 0.875, 10), 24); 
}
const fontSize = validateFontSize();
let columns = Math.floor(canvas.width / fontSize);
const drops = [];

function initializeDrops() {
    drops.length = 0;
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * canvas.height / fontSize); 
}

initializeDrops();


function draw() {
    try {

        if (!ctx || !canvas) return;
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0080ff';
        ctx.font = validateFontSize() + 'px monospace';
        
        for (let i = 0; i < drops.length && i < columns; i++) {
            // Seleccionar carácter aleatorio del estilo Matrix
            const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            
            // Validar que las coordenadas están dentro del canvas
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            
            if (x >= 0 && x < canvas.width && y >= 0) {
                ctx.fillText(char, x, y);
            }
            
            // Reset con probabilidad más baja para mejor rendimiento
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    } catch (error) {
        console.error('Error en la función draw:', error);
        stopAnimation(); // Detener animación si hay errores
    }
}

// Gestión segura de intervalos
function startAnimation() {
    // Limpiar intervalos existentes antes de crear nuevos
    stopAnimation();
    
    drawInterval = setInterval(draw, 50);
    
    // Glitch text con validación
    const glitchText = document.querySelector('.glitch');
    if (glitchText) {
        const codes = ['0x7f454c46', '0xdeadbeef', '0x41414141', '0x90909090', '0xc0ffee'];
        glitchInterval = setInterval(() => {
            try {
                const randomCode = codes[Math.floor(Math.random() * codes.length)];
                glitchText.textContent = randomCode;
            } catch (error) {
                console.error('Error actualizando glitch text:', error);
            }
        }, 3000);
    }
}

// Función para detener animaciones y limpiar recursos
function stopAnimation() {
    if (drawInterval) {
        clearInterval(drawInterval);
        drawInterval = null;
    }
    if (glitchInterval) {
        clearInterval(glitchInterval);
        glitchInterval = null;
    }
}

// Event listener con throttling para resize
window.addEventListener('resize', () => {
    const now = Date.now();
    if (now - lastResize > 100) { // Throttle a 100ms
        lastResize = now;
        
        try {
            // Limitar dimensiones máximas para prevenir ataques
            canvas.width = Math.min(window.innerWidth, 3840);
            canvas.height = Math.min(window.innerHeight, 2160);
            
            // Recalcular columnas y reinicializar drops
            const safeFontSize = validateFontSize();
            columns = Math.floor(canvas.width / safeFontSize);
            initializeDrops();
        } catch (error) {
            console.error('Error en resize:', error);
        }
    }
});

// Event listener seguro para DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    try {
        const links = document.querySelectorAll('.links li');
        
        // Validar que existen elementos antes de procesarlos
        if (links.length > 0) {
            links.forEach((link, index) => {
                // Validar que el elemento existe y es válido
                if (link && link.style) {
                    link.style.opacity = '0';
                    link.style.transform = 'translateY(10px)';
                    
                    // Usar setTimeout con validación
                    setTimeout(() => {
                        if (link && link.style) {
                            link.style.transition = 'all 0.5s ease';
                            link.style.opacity = '1';
                            link.style.transform = 'translateY(0)';
                        }
                    }, 200 * (index + 1));
                }
            });
        }
        
   
        startAnimation();
    } catch (error) {
        console.error('Error en DOMContentLoaded:', error);
    }
});

document.addEventListener('mousemove', function(e) {
    const now = Date.now();
    

    if (now - lastMouseMove < 16) return; 
    lastMouseMove = now;

    if (Math.random() > 0.95 && 
        particleCount < MAX_PARTICLES && 
        e.clientX >= 0 && e.clientX <= window.innerWidth &&
        e.clientY >= 0 && e.clientY <= window.innerHeight) {
        
        try {
            const particle = document.createElement('div');
            

            particle.style.cssText = `
                position: fixed;
                left: ${Math.round(e.clientX)}px;
                top: ${Math.round(e.clientY)}px;
                width: 2px;
                height: 2px;
                background-color: #0080ff;
                pointer-events: none;
                opacity: 0.8;
                z-index: 4;
                border-radius: 50%;
            `;
            
            document.body.appendChild(particle);
            particleCount++;
            
            let opacity = 0.8;
            const fadeInterval = setInterval(() => {
                try {
                    opacity -= 0.05;
                    
                    if (particle && particle.style) {
                        particle.style.opacity = opacity;
                    }
                                        if (opacity <= 0 || !particle.parentNode) {
                        clearInterval(fadeInterval);
                        if (particle && particle.parentNode) {
                            particle.parentNode.removeChild(particle);
                        }
                        particleCount = Math.max(0, particleCount - 1);
                    }
                } catch (error) {

                    clearInterval(fadeInterval);
                    if (particle && particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                    particleCount = Math.max(0, particleCount - 1);
                }
            }, 50);
            
        } catch (error) {
            console.error('Error creando partícula:', error);
            particleCount = Math.max(0, particleCount - 1);
        }
    }
});


window.addEventListener('beforeunload', () => {
    stopAnimation();
        const particles = document.querySelectorAll('div[style*="pointer-events: none"]');
    particles.forEach(particle => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    });
    particleCount = 0;
});


window.addEventListener('error', (e) => {
    if (e.message && e.message.includes('canvas')) {
        console.error('Error relacionado con canvas detectado:', e);
        stopAnimation();
    }
});


document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopAnimation();
    } else {
        startAnimation();
    }
});

setInterval(() => {

    const actualParticles = document.querySelectorAll('div[style*="pointer-events: none"]').length;
    if (Math.abs(actualParticles - particleCount) > 5) {
        console.warn('Discrepancia en contador de partículas detectada, corrigiendo...');
        particleCount = actualParticles;
    }
    
    // Si hay demasiadas partículas, forzar limpieza
    if (particleCount > MAX_PARTICLES) {
        const excessParticles = document.querySelectorAll('div[style*="pointer-events: none"]');
        for (let i = MAX_PARTICLES; i < excessParticles.length; i++) {
            if (excessParticles[i] && excessParticles[i].parentNode) {
                excessParticles[i].parentNode.removeChild(excessParticles[i]);
            }
        }
        particleCount = MAX_PARTICLES;
    }
}, 5000); 
    '|', '\\', ';', ':', '"', "'", '<', '>', ',', '.', '?', '/', '~', '`'
];

const fontSize = 14;
let columns = Math.floor(canvas.width / fontSize);
const drops = [];

// Inicialización segura del array drops
function initializeDrops() {
    drops.length = 0; // Limpiar array existente
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * canvas.height / fontSize); // Posiciones aleatorias iniciales
    }
}

initializeDrops();


function draw() {
    try {
  
        if (!ctx || !canvas) return;
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0080ff';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length && i < columns; i++) {
            const textIndex = Math.floor(Math.random() * pythonCode.length);
            const text = pythonCode[textIndex];
            
     
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            
            if (x >= 0 && x < canvas.width && y >= 0) {
                ctx.fillText(text, x, y);
            }
            
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    } catch (error) {
        console.error('Error en la función draw:', error);
        stopAnimation(); 
    }
}


function startAnimation() {
  
    stopAnimation();
    
    drawInterval = setInterval(draw, 50);
    
   
    const glitchText = document.querySelector('.glitch');
    if (glitchText) {
        const codes = ['0x7f454c46', '0xdeadbeef', '0x41414141', '0x90909090', '0xc0ffee'];
        glitchInterval = setInterval(() => {
            try {
                const randomCode = codes[Math.floor(Math.random() * codes.length)];
                glitchText.textContent = randomCode;
            } catch (error) {
                console.error('Error actualizando glitch text:', error);
            }
        }, 3000);
    }
}


function stopAnimation() {
    if (drawInterval) {
        clearInterval(drawInterval);
        drawInterval = null;
    }
    if (glitchInterval) {
        clearInterval(glitchInterval);
        glitchInterval = null;
    }
}


window.addEventListener('resize', () => {
    const now = Date.now();
    if (now - lastResize > 100) {
        lastResize = now;
        
        try {
          
            canvas.width = Math.min(window.innerWidth, 3840);
            canvas.height = Math.min(window.innerHeight, 2160);
            

            columns = Math.floor(canvas.width / fontSize);
            initializeDrops();
        } catch (error) {
            console.error('Error en resize:', error);
        }
    }
});


document.addEventListener('DOMContentLoaded', function() {
    try {
        const links = document.querySelectorAll('.links li');
        

        if (links.length > 0) {
            links.forEach((link, index) => {
         
                if (link && link.style) {
                    link.style.opacity = '0';
                    link.style.transform = 'translateY(10px)';
                    
                
                    setTimeout(() => {
                        if (link && link.style) {
                            link.style.transition = 'all 0.5s ease';
                            link.style.opacity = '1';
                            link.style.transform = 'translateY(0)';
                        }
                    }, 200 * (index + 1));
                }
            });
        }
        
 
        startAnimation();
    } catch (error) {
        console.error('Error en DOMContentLoaded:', error);
    }
});

document.addEventListener('mousemove', function(e) {
    const now = Date.now();
    

    if (now - lastMouseMove < 16) return; 
    lastMouseMove = now;
    

    if (Math.random() > 0.95 && 
        particleCount < MAX_PARTICLES && 
        e.clientX >= 0 && e.clientX <= window.innerWidth &&
        e.clientY >= 0 && e.clientY <= window.innerHeight) {
        
        try {
            const particle = document.createElement('div');
            

            particle.style.cssText = `
                position: fixed;
                left: ${Math.round(e.clientX)}px;
                top: ${Math.round(e.clientY)}px;
                width: 2px;
                height: 2px;
                background-color: #0080ff;
                pointer-events: none;
                opacity: 0.8;
                z-index: 4;
                border-radius: 50%;
            `;
            
            document.body.appendChild(particle);
            particleCount++;
            
            let opacity = 0.8;
            const fadeInterval = setInterval(() => {
                try {
                    opacity -= 0.05;
                    
                    if (particle && particle.style) {
                        particle.style.opacity = opacity;
                    }
                    
         
                    if (opacity <= 0 || !particle.parentNode) {
                        clearInterval(fadeInterval);
                        if (particle && particle.parentNode) {
                            particle.parentNode.removeChild(particle);
                        }
                        particleCount = Math.max(0, particleCount - 1); 
                    }
                } catch (error) {
                
                    clearInterval(fadeInterval);
                    if (particle && particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                    particleCount = Math.max(0, particleCount - 1);
                }
            }, 50);
            
        } catch (error) {
            console.error('Error creando partícula:', error);
            particleCount = Math.max(0, particleCount - 1);
        }
    }
});

window.addEventListener('beforeunload', () => {
    stopAnimation();
    

    const particles = document.querySelectorAll('div[style*="pointer-events: none"]');
    particles.forEach(particle => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    });
    particleCount = 0;
});


window.addEventListener('error', (e) => {
    if (e.message && e.message.includes('canvas')) {
        console.error('Error relacionado con canvas detectado:', e);
        stopAnimation();
    }
});

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopAnimation();
    } else {
        startAnimation();
    }
});


setInterval(() => {

    const actualParticles = document.querySelectorAll('div[style*="pointer-events: none"]').length;
    if (Math.abs(actualParticles - particleCount) > 5) {
        console.warn('Discrepancia en contador de partículas detectada, corrigiendo...');
        particleCount = actualParticles;
    }
    
    if (particleCount > MAX_PARTICLES) {
        const excessParticles = document.querySelectorAll('div[style*="pointer-events: none"]');
        for (let i = MAX_PARTICLES; i < excessParticles.length; i++) {
            if (excessParticles[i] && excessParticles[i].parentNode) {
                excessParticles[i].parentNode.removeChild(excessParticles[i]);
            }
        }
        particleCount = MAX_PARTICLES;
    }
}, 5000);
