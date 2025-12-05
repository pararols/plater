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

function sendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value.trim();

    if (message) {
        // Add User Message
        addMessage(message, 'user');
        input.value = '';

        // Simulate AI Thinking
        setTimeout(() => {
            const response = generateResponse(message);
            addMessage(response, 'bot');
        }, 1000);
    }
}

function addMessage(text, sender) {
    const body = document.getElementById('chat-body');
    const div = document.createElement('div');
    div.classList.add('message', sender);
    div.innerText = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
}

// Simple "AI" Logic based on keywords from the Strategic Plan
function generateResponse(query) {
    const q = query.toLowerCase();

    if (q.includes('plater') || q.includes('normativa')) {
        return "El Pla Estratègic proposa utilitzar el PLATER al nostre favor. Modificarem el POUM per definir 'zones no aptes' basades en valors paisatgístics, obligant a respectar el nostre criteri local.";
    }
    if (q.includes('teulada') || q.includes('sostre') || q.includes('casa')) {
        return "La prioritat és l'ocupació de teulades. Es calcula que amb 15.000m² (municipals, agrícoles i domèstiques) cobrim el 100% de la demanda sense tocar sòl agrícola.";
    }
    if (q.includes('pages') || q.includes('agricola') || q.includes('camp')) {
        return "El sòl agrícola és intocable. Només s'acceptaran projectes d'agrivoltaica real (amb cultiu a sota) o instal·lacions en naus agrícoles, on els pagesos podran rebre una renda per llogar la coberta.";
    }
    if (q.includes('comunitat') || q.includes('veins') || q.includes('diners') || q.includes('sala nova') || q.includes('pavello')) {
        return "Ja tenim una realitat d'èxit! La instal·lació de la Sala Nova (17,2 kWp) ja serveix a 10 veïns. Ara activem la del Pavelló (127 kWp), amb 70 kWp reservats per a veïns. Pots demanar participacions de 0,5, 1, 1,5 o 2 kWp segons el teu consum, mitjançant el model de taxa municipal.";
    }
    if (q.includes('termini') || q.includes('quan')) {
        return "El Pla d'Acció Immediat comença ARA. En el primer mes es farà el Ple Municipal per la moratòria, i en el segon mes començarà el cens de teulades.";
    }

    return "Gràcies per la teva pregunta. Aquest és un tema complex recollit al Pla Estratègic. Et recomano descarregar el document complet a la secció 'Documents' o contactar amb l'Ajuntament per a detalls específics.";
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
