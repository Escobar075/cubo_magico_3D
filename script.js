document.addEventListener('DOMContentLoaded', () => {
    const cube = document.getElementById('rubik-cube');
    let isDragging = false;
    // Rotação inicial (corresponde ao CSS)
    let currentX = -30; 
    let currentY = 45;  
    let startX = 0;
    let startY = 0;
    const rotationSpeed = 0.5; // Ajuste a sensibilidade da rotação

    // Função para aplicar a rotação ao cubo
    function applyRotation() {
        cube.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;
    }
    
    // --- Lógica para arrastar e girar o cubo inteiro (Mouse e Toque) ---
    const startDrag = (e) => {
        isDragging = true;
        // Pega as coordenadas X/Y do mouse ou do primeiro toque
        startX = e.clientX || e.touches[0].clientX;
        startY = e.clientY || e.touches[0].clientY;
        cube.classList.add('grabbing'); // Muda o cursor
    };

    const drag = (e) => {
        if (!isDragging) return;
        
        const clientX = e.clientX || e.touches[0].clientX;
        const clientY = e.clientY || e.touches[0].clientY;

        const deltaX = clientX - startX;
        const deltaY = clientY - startY;

        // Atualiza a rotação
        currentY += deltaX * rotationSpeed;
        currentX -= deltaY * rotationSpeed; 
        
        applyRotation();

        // Atualiza o ponto de partida
        startX = clientX;
        startY = clientY;
    };

    const endDrag = () => {
        isDragging = false;
        cube.classList.remove('grabbing'); // Volta o cursor
    };

    // Eventos do Mouse
    cube.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);

    // Eventos de Toque (para telas sensíveis)
    cube.addEventListener('touchstart', (e) => startDrag(e), { passive: true });
    document.addEventListener('touchmove', (e) => drag(e), { passive: true });
    document.addEventListener('touchend', endDrag);


    // --- Lógica para mudar a cor do adesivo ao clicar ---
    const colors = ['orange', 'red', 'yellow', 'white', 'green', 'blue']; // Sequência de cores

    document.querySelectorAll('.sticker').forEach(sticker => {
        sticker.addEventListener('click', (e) => {
            // Evita a troca de cor se o usuário estiver tentando girar o cubo
            if (isDragging) return;

            let target = e.target;
            
            // Encontra a classe de cor atual
            let currentColorClass = colors.find(c => target.classList.contains(c));
            
            if (currentColorClass) {
                // Determina a próxima cor na sequência circular
                let currentIndex = colors.indexOf(currentColorClass);
                let nextIndex = (currentIndex + 1) % colors.length;
                let nextColorClass = colors[nextIndex];
                
                // Remove a classe de cor atual
                target.classList.remove(currentColorClass);
                // Adiciona a próxima cor
                target.classList.add(nextColorClass);
            }
        });
    });
});

