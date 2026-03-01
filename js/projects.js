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
        tags: ["backend","publicado"],
        onlineUrl: "./aviso.html",
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
    },
    {
        tipo: "Back-End",
        titulo: "Gerenciador de Senhas",
        descricao: "Gerenciador de senhas em terminal feito em Python, com salvamento local ou em banco de dados.",
        tech: "Python • MySQL",
        mediaClass: "card-api",
        tags: ["backend", "publicado"],
        onlineUrl: "",
        codeUrl: "https://github.com/petrakiio/Pj1"
    },
    {
        tipo:"Fron-End",
        titulo:"Landing Page",
        descricao:"Landing Page feita pra cliente",
        tech:"HTML • CSS • JavaScript",
        mediaClass:"card-dashboard",
        tags:["frontend", "publicado"],
        onlineUrl:"https://bolos-ale.onrender.com/"
    }
]

const gridProjetos = document.getElementById("grid-projetos")
const projetosVazio = document.getElementById("projetos-vazio")
const filtroBtns = document.querySelectorAll(".filtro-btn")
const githubRepoStats = new Map()
let currentFilter = "todos"

function getGithubRepoPath(url) {
    if (!url) return null

    try {
        const parsed = new URL(url)
        if (!parsed.hostname.includes("github.com")) return null

        const parts = parsed.pathname.split("/").filter(Boolean)
        if (parts.length < 2) return null
        return `${parts[0]}/${parts[1]}`
    } catch (_) {
        return null
    }
}

function formatDate(dateIso) {
    if (!dateIso) return null
    const date = new Date(dateIso)
    if (Number.isNaN(date.getTime())) return null

    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    }).format(date)
}

function renderGithubInfo(projeto) {
    const repoPath = projeto.githubRepo || getGithubRepoPath(projeto.codeUrl)
    if (!repoPath) {
        return `<p class="projeto-github projeto-github-muted">GitHub: repositório não informado</p>`
    }

    const stats = githubRepoStats.get(repoPath)

    if (!stats) {
        return `<p class="projeto-github projeto-github-loading">GitHub: carregando dados...</p>`
    }

    if (stats.error) {
        return `<p class="projeto-github projeto-github-muted">GitHub: dados indisponíveis</p>`
    }

    const parts = []
    parts.push(`★ ${new Intl.NumberFormat("pt-BR").format(stats.stars || 0)}`)

    if (stats.language) parts.push(stats.language)

    const updatedAt = formatDate(stats.updatedAt)
    if (updatedAt) parts.push(`Atualizado em ${updatedAt}`)

    return `<p class="projeto-github">${parts.join(" • ")}</p>`
}

async function carregarGithubStats() {
    const repos = [...new Set(
        projetosData
            .map((projeto) => projeto.githubRepo || getGithubRepoPath(projeto.codeUrl))
            .filter(Boolean)
    )]

    if (!repos.length) return

    await Promise.all(repos.map(async (repoPath) => {
        try {
            const response = await fetch(`https://api.github.com/repos/${repoPath}`, {
                headers: { Accept: "application/vnd.github+json" }
            })

            if (!response.ok) throw new Error(`GitHub API ${response.status}`)
            const data = await response.json()

            githubRepoStats.set(repoPath, {
                stars: data.stargazers_count,
                language: data.language,
                updatedAt: data.pushed_at
            })
        } catch (_) {
            githubRepoStats.set(repoPath, { error: true })
        }
    }))

    renderProjetos(currentFilter)
}

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
            ${renderGithubInfo(projeto)}
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
    currentFilter = filter

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
carregarGithubStats()
