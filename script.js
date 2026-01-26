const elements = {
    msg: document.getElementById("msg"),
    btn: document.getElementById("btn"),
    input: document.getElementById("input"),
    sobre: document.getElementById("sobre"),
    git: document.getElementById("git"),
    what: document.getElementById("what"),
    link: document.getElementById("link"),
    disc: document.getElementById("disc"),
    script: document.getElementById("scr"),
    pj: document.getElementById("pj")
};

const textos = [
    "Dev Back-End 💻",
    "Estudante 🎓",
    "2º ano de Informática 📚"
]

let index = 0
let char = 0
let apagando = false
let animacaoTimeout

function escreverTexto() {
    const textoAtual = textos[index]
    if (!apagando) {
        elements.msg.textContent = textoAtual.slice(0, ++char)
        if (char === textoAtual.length) {
            apagando = true;
            animacaoTimeout = setTimeout(escreverTexto, 1500)
            return
        }
    } else {
        elements.msg.textContent = textoAtual.slice(0, --char)
        if (char === 0) {
            apagando = false
            index = (index + 1) % textos.length
        }
    }
    const velocidade = apagando ? 50 : 100
    animacaoTimeout = setTimeout(escreverTexto, velocidade)
}

escreverTexto();

elements.btn.onclick = () => {
    clearTimeout(animacaoTimeout)
    elements.msg.textContent = ""
    char = 0
    index = 0
    apagando = false
    escreverTexto()
};

elements.input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const nome = elements.input.value.trim()
        if (nome) {
            escreverResposta(nome);
            elements.input.value = ""
        }
    }
});

function escreverResposta(nome) {
    const textoProfissional = `Prazer, ${nome}! Me chamo Pedro. Tenho 15 anos e iniciei minha jornada na programação em março de 2025. Desde então, dedico-me ao aprimoramento técnico contínuo com foco em Backend, buscando transformar aprendizado em soluções reais e me preparar para os desafios do mercado de tecnologia.`
    elements.sobre.textContent = ""
    let i = 0
    if (window.respostaInterval) clearInterval(window.respostaInterval)
    window.respostaInterval = setInterval(() => {
        elements.sobre.textContent += textoProfissional[i]
        i++
        if (i === textoProfissional.length) clearInterval(window.respostaInterval)
    }, 25)
}

elements.git.onclick = () => window.open('https://github.com/SEU_USER', '_blank')
elements.link.onclick = () => window.open('https://linkedin.com/in/SEU_PERFIL', '_blank')
elements.what.onclick = () => window.open('https://wa.me/5516999999999', '_blank')
elements.disc.onclick = () => window.open('https://discord.com/users/1325631694773944320', '_blank')
elements.script.onclick = () => window.open('https://github.com/petrakiio/projetos-python','_blank')
elements.pj.onclick = () => window.open('https://petrakiio.github.io/WoodLab/index.html','_blank')