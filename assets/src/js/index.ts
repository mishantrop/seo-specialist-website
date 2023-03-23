import { tns } from 'tiny-slider/src/tiny-slider'

import '../css/main.css'

const initScrollNavigation = () => {
    const links = document.querySelectorAll('#header-nav a')

    links.forEach((link) => {
        link.addEventListener('click', (event) => {
            const section = document.querySelector(`[data-section="${(event.target?.hash || '').replace('#', '')}"]`)

            section?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
        })
    })
}

const initCertsSlider = () => {
    const slider = tns({
        container: '.certs-slider',
        slideBy: 'page',
        autoplay: false,
        mouseDrag: true,
        gutter: 10,
        responsive: {
            0: {
                items: 2,
                edgePadding: 30,
            },
            768: {
                items: 4,
                edgePadding: 50,
            },
        },
    })
    console.log(slider)
}

initScrollNavigation()
initCertsSlider()
