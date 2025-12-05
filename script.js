
// Chat Widget Logic
function toggleChat() {
    const widget = document.getElementById('chat-widget');
    widget.classList.toggle('hidden');
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

async function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value.trim();

    if (message) {
        // Add User Message
        addMessage(message, 'user');
        input.value = '';

        // Call Netlify Function (Real AI)
        try {
            const response = await fetch('/.netlify/functions/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message })
            });

            const data = await response.json();

            if (data.reply) {
                addMessage(data.reply, 'bot');
            } else if (data.error) {
                addMessage(`Error del servidor: ${data.error}`, 'bot');
            } else {
                addMessage("Error desconegut: El servidor no ha retornat resposta.", 'bot');
            }
        } catch (error) {
            console.error('Error:', error);
            addMessage(`Error de connexió: ${error.message}`, 'bot');
        }
    }
}

// Helper function to add message to UI
function addMessage(text, sender) {
    const body = document.getElementById('chat-body');
    const div = document.createElement('div');
    div.classList.add('message', sender);

    // Convert newlines to <br> for better formatting if it comes from AI
    if (sender === 'bot') {
        div.innerHTML = text.replace(/\n/g, '<br>');
    } else {
        div.innerText = text;
    }

    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Lightbox Logic
function openLightbox(imgSrc) {
    // Create lightbox element if it doesn't exist
    let lightbox = document.getElementById('lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <span class="close-btn" onclick="closeLightbox()">&times;</span>
            <img class="lightbox-content" id="lightbox-img">
        `;
        document.body.appendChild(lightbox);
    }

    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = imgSrc;
    lightbox.style.display = 'block';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
    }
}

// Close lightbox when clicking outside the image
window.onclick = function (event) {
    const lightbox = document.getElementById('lightbox');
    if (event.target === lightbox) {
        closeLightbox();
    }
}
