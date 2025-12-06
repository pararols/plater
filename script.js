// ==========================================
// 1. Chat Widget Logic
// ==========================================

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

// ==========================================
// 2. Smooth Scroll for Anchor Links
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// ==========================================
// 3. Lightbox Logic
// ==========================================
function openLightbox(imgSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    if (lightbox && lightboxImg) {
        lightboxImg.src = imgSrc;
        lightbox.style.display = 'block';
    }
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

// Initialize Lightbox on Zoomable Images
document.addEventListener('DOMContentLoaded', () => {
    // Add click event to any image with class 'zoomable'
    // Note: Currently no images have this class in the new HTML, 
    // but this preserves the functionality for future use or docs pages.
    const zoomableImages = document.querySelectorAll('.feature-img.zoomable');
    zoomableImages.forEach(img => {
        img.addEventListener('click', () => {
            openLightbox(img.src);
        });
    });
});
