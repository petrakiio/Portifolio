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

if (elements.btn) {
    elements.btn.onclick = () => {
        clearTimeout(animacaoTimeout)
        elements.msg.textContent = ""
        char = 0
        index = 0
        apagando = false
        escreverTexto()
    };
}

if (elements.input) {
    elements.input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const nome = elements.input.value.trim()
            if (nome) {
                escreverResposta(nome);
                elements.input.value = ""
            }
        }
    });
}

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

if (elements.git) elements.git.onclick = () => window.open('https://github.com/petrakiio', '_blank')
if (elements.link) elements.link.onclick = () => window.open('https://linkedin.com/in/petrakiio', '_blank')
if (elements.what) elements.what.onclick = () => window.open('https://wa.me/5516999999999', '_blank')
if (elements.disc) elements.disc.onclick = () => window.open('https://discord.com/users/1325631694773944320', '_blank')
if (elements.script) elements.script.onclick = () => window.open('https://github.com/petrakiio/projetos-python','_blank')
if (elements.pj) elements.pj.onclick = () => window.open('https://petrakiio.github.io/WoodLab/index.html','_blank')

const projetosData = [
    {
        tipo: "Projeto Web",
        titulo: "WoodLab",
        descricao: "Site de marcenaria moderna com foco em apresentação visual e navegação clara para clientes.",
        tech: "HTML • CSS • JavaScript",
        mediaClass: "card-woodlab",
        tags: ["frontend", "publicado"],
        onlineUrl: "https://petrakiio.github.io/WoodLab/index.html",
        codeUrl: "https://github.com/petrakiio"
    },
    {
        tipo: "Automação",
        titulo: "Scripts Python",
        descricao: "Coleção de scripts para treino lógico, produtividade e resolução de problemas do dia a dia.",
        tech: "Python • Git • CLI",
        mediaClass: "card-python",
        tags: ["backend", "publicado"],
        onlineUrl: "https://github.com/petrakiio/projetos-python",
        codeUrl: "https://github.com/petrakiio/projetos-python"
    },
    {
        tipo: "Cassino",
        titulo: "Cacino",
        descricao: "Jogo para entretenimento, sem perda real de dinheiro, focado em diversão casual.",
        tech: "HTML • CSS • JavaScript",
        mediaClass: "card-python",
        tags: ["frontend", "publicado"],
        onlineUrl: "https://petrakiio.github.io/Cacino/",
        codeUrl: "https://github.com/petrakiio/Cacino"
    },
    {
        tipo: "Lista de Tarefas",
        titulo: "Lista de Tarefas",
        descricao: "Aplicação simples para organização de tarefas com foco em produtividade.",
        tech: "HTML • CSS • JavaScript",
        mediaClass: "card-python",
        tags: ["frontend", "publicado"],
        onlineUrl: "https://petrakiio.github.io/Lista/",
        codeUrl: "https://github.com/petrakiio/lista"
    },
    {
        tipo: "Projeto Web",
        titulo: "Documentação Natsuki Bot",
        descricao: "Documentação de bot de Discord inspirada na Natsuki, com foco em organização e leitura rápida.",
        tech: "HTML • CSS • JavaScript",
        mediaClass: "card-dashboard",
        tags: ["frontend", "publicado"],
        onlineUrl: "https://petrakiio.github.io/documenta-o-bots-discord/",
        codeUrl: "https://github.com/petrakiio/documenta-o-bots-discord"
    },
    {
        tipo: "Portfólio",
        titulo: "Meu Portfólio",
        descricao: "Página pessoal com animações, interação com visitante e links para redes e trabalhos.",
        tech: "HTML • CSS • JavaScript",
        mediaClass: "card-portfolio",
        tags: ["frontend", "publicado"],
        onlineUrl: "https://petrakiio.github.io/WoodLab/index.html",
        codeUrl: "https://github.com/petrakiio"
    },
    {
        tipo: "ValeLer",
        titulo: "ValeLer",
        descricao: "CRUD para administração de biblioteca com sistema de login e painel de controle.",
        tech: "HTML • CSS • JavaScript • Python • MySQL",
        mediaClass: "card-portfolio",
        tags: ["backend", "publicado"],
        onlineUrl: "https://senior-rosamond-petrakiio-48bbb25c.koyeb.app/index",
        codeUrl: "https://github.com/petrakiio/APIS"
    },
    {
        tipo: "Back-End",
        titulo: "ChatEat",
        descricao: "CRUD baseado em operações de lanchonete com administração visual.",
        tech: "Python • MySQL • Flask",
        mediaClass: "card-api",
        tags: ["backend", "dev"],
        onlineUrl: "",
        codeUrl: "https://github.com/petrakiio/APIs"
    },
    {
        tipo: "Projeto Web",
        titulo: "Cinetrakiio",
        descricao: "Projeto inspirado na Netflix para atividade acadêmica, ainda em desenvolvimento.",
        tech: "HTML • CSS • JavaScript • Python (futuramente)",
        mediaClass: "card-dashboard",
        tags: ["frontend", "dev"],
        onlineUrl: "",
        codeUrl: "https://github.com/petrakiio/Cinetrakiio"
    }
]

const gridProjetos = document.getElementById("grid-projetos")
const projetosVazio = document.getElementById("projetos-vazio")
const filtroBtns = document.querySelectorAll(".filtro-btn")

function renderProjetoCard(projeto) {
    const isDev = projeto.tags.includes("dev")
    const statusClass = isDev ? "projeto-status dev" : "projeto-status"
    const statusLabel = isDev ? "Em desenvolvimento" : "Publicado"

    const onlineAcao = projeto.onlineUrl
        ? `<a href="${projeto.onlineUrl}" target="_blank" rel="noopener noreferrer">Ver online</a>`
        : `<span class="btn-projeto indisponivel">Em breve</span>`

    const codigoAcao = projeto.codeUrl
        ? `<a href="${projeto.codeUrl}" target="_blank" rel="noopener noreferrer">Ver código</a>`
        : `<span class="btn-projeto indisponivel">Código privado</span>`

    return `
        <article class="card-projeto reveal">
            <div class="card-media ${projeto.mediaClass}" aria-hidden="true"></div>
            <div class="projeto-topo">
                <p class="projeto-tipo">${projeto.tipo}</p>
                <span class="${statusClass}">${statusLabel}</span>
            </div>
            <h3>${projeto.titulo}</h3>
            <p class="projeto-desc">${projeto.descricao}</p>
            <p class="projeto-tech">${projeto.tech}</p>
            <div class="acoes-projeto">
                ${onlineAcao}
                ${codigoAcao}
            </div>
        </article>
    `
}

function setupProjectReveal() {
    const cardsProjeto = document.querySelectorAll(".card-projeto.reveal")

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active")
                    obs.unobserve(entry.target)
                }
            })
        }, { threshold: 0.2 })

        cardsProjeto.forEach((card, idx) => {
            card.style.transitionDelay = `${idx * 0.08}s`
            observer.observe(card)
        })
    } else {
        cardsProjeto.forEach((card) => card.classList.add("active"))
    }
}

function renderProjetos(filter = "todos") {
    if (!gridProjetos) return

    const projetosFiltrados = projetosData.filter((projeto) => {
        if (filter === "todos") return true
        return projeto.tags.includes(filter)
    })

    gridProjetos.innerHTML = projetosFiltrados.map(renderProjetoCard).join("")

    if (projetosVazio) {
        projetosVazio.hidden = projetosFiltrados.length > 0
    }

    setupProjectReveal()
}

filtroBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        filtroBtns.forEach((item) => item.classList.remove("active"))
        btn.classList.add("active")
        renderProjetos(btn.dataset.filter || "todos")
    })
})

renderProjetos()

const topbarLinks = document.querySelectorAll(".topbar a")

topbarLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        const targetId = link.getAttribute("href")
        if (!targetId || !targetId.startsWith("#")) return

        const target = document.querySelector(targetId)
        if (!target) return

        e.preventDefault()
        const topbarHeight = document.querySelector(".topbar")?.offsetHeight || 0
        const y = target.getBoundingClientRect().top + window.scrollY - topbarHeight - 12

        window.scrollTo({
            top: y,
            behavior: "smooth"
        })
    })
})

const sections = ["#inicio", "#sobre-mim", "#tecnologias", "#projetos", "#contato"]
    .map((id) => document.querySelector(id))
    .filter(Boolean)

function updateActiveTopbarLink() {
    if (!sections.length) return

    const topbarHeight = document.querySelector(".topbar")?.offsetHeight || 0
    const marker = window.scrollY + topbarHeight + 20
    const reachedBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
    let currentId = sections[0].id

    if (reachedBottom) {
        currentId = sections[sections.length - 1].id
    } else {
        sections.forEach((section) => {
            if (section.offsetTop <= marker) currentId = section.id
        })
    }

    topbarLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${currentId}`
        link.classList.toggle("active", active)
    })
}

window.addEventListener("scroll", updateActiveTopbarLink, { passive: true })
window.addEventListener("resize", updateActiveTopbarLink)
updateActiveTopbarLink()
