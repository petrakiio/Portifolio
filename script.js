const elements = {
    msg: document.getElementById("msg"),
    btn: document.getElementById("btn"),
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

if (elements.git) elements.git.onclick = () => window.open('https://github.com/petrakiio', '_blank')
if (elements.link) elements.link.onclick = () => window.open('https://linkedin.com/in/petrakiio', '_blank')
if (elements.what) elements.what.onclick = () => window.open('https://wa.me/5516999999999', '_blank')
if (elements.disc) elements.disc.onclick = () => window.open('https://discord.com/users/1325631694773944320', '_blank')
if (elements.script) elements.script.onclick = () => window.open('https://github.com/petrakiio/projetos-python','_blank')
if (elements.pj) elements.pj.onclick = () => window.open('https://petrakiio.github.io/WoodLab/index.html','_blank')

const topbarLinks = document.querySelectorAll(".topbar a")
const backToTopBtn = document.getElementById("back-to-top")

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

    if (backToTopBtn) {
        const showBackToTop = currentId === "contato"
        backToTopBtn.classList.toggle("visible", showBackToTop)
        backToTopBtn.setAttribute("aria-hidden", String(!showBackToTop))
    }
}

if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    })
}

window.addEventListener("scroll", updateActiveTopbarLink, { passive: true })
window.addEventListener("resize", updateActiveTopbarLink)
updateActiveTopbarLink()
