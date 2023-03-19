import '../css/main.css'

const initScrollNavigation = () => {
    const links = document.querySelectorAll('#header-nav a')

    links.forEach((link) => {
        link.addEventListener('click', (event) => {
            console.log(event)

            const section = document.querySelector(`[data-section="${(event.target?.hash || '').replace('#', '')}"]`)

            section?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
        })
    })
}

initScrollNavigation()
