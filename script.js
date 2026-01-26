const elements = {
    msg: document.getElementById("msg"),
    btn: document.getElementById("btn"),
    input: document.getElementById("input"),
    sobre: document.getElementById("sobre")
};

const textos = [
    "Dev Back-End 💻",
    "Estudante 🎓",
    "2º ano de Informática 📚"
];

let index = 0;
let char = 0;
let apagando = false;
let animacaoTimeout;

function escreverTexto() {
    const textoAtual = textos[index];
    
    if (!apagando) {
        elements.msg.textContent = textoAtual.slice(0, ++char);
        if (char === textoAtual.length) {
            apagando = true;
            animacaoTimeout = setTimeout(escreverTexto, 1500); // Pausa quando termina de escrever
            return;
        }
    } else {
        elements.msg.textContent = textoAtual.slice(0, --char);
        if (char === 0) {
            apagando = false;
            index = (index + 1) % textos.length;
        }
    }

    const velocidade = apagando ? 50 : 100; // Apaga mais rápido do que escreve
    animacaoTimeout = setTimeout(escreverTexto, velocidade);
}

escreverTexto();

elements.btn.textContent = "Reiniciar animação";
elements.btn.onclick = () => {
    clearTimeout(animacaoTimeout);
    elements.msg.textContent = "";
    char = 0;
    index = 0;
    apagando = false;
    escreverTexto();
};

elements.input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const nome = elements.input.value.trim();
        if (nome) {
            escreverResposta(`Prazer, ${nome} 😄,Eu sou o Pedro,e tenho 15 anos,iniciei na prgramação em março de 2025
                dês de então venho estudado com o foco de melhorar meus conhecimentos e entrar no mercado de trabalho`);
            elements.input.value = "";
        }
    }
});

function escreverResposta(texto) {
    elements.sobre.textContent = "";
    let i = 0;
    
    if (window.respostaInterval) clearInterval(window.respostaInterval);

    window.respostaInterval = setInterval(() => {
        elements.sobre.textContent += texto[i];
        i++;
        if (i === texto.length) clearInterval(window.respostaInterval);
    }, 50);
}

//Redes Sociais

const disc = document.getElementById('disc')