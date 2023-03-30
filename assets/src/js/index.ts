/* eslint-disable no-console */
import axios from 'axios'
import { tns } from 'tiny-slider/src/tiny-slider'

import '../css/main.css'

const buttonOpen = document.getElementById('header-nav-mobile-toggler')
const buttonClose = document.getElementById('header-nav-mobile-closer')
const linksWrapper = document.querySelector('.header-nav-mobile-links')
const body = document.querySelector('body')

const initScrollNavigation = () => {
    const links = document.querySelectorAll('#header-nav a')

    links.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault()
            const section = document.querySelector(`[data-section="${(event.target?.hash || '').replace('#', '')}"]`)

            section?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
        })
    })

    const feedbackLink = document.querySelector('#feedback-link')
    feedbackLink.addEventListener('click', (event) => {
        event.preventDefault()
        const section = document.querySelector('[data-section="feedback"]')
        section?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
    })
}

const openMobileMenu = () => {
    body.style.overflow = 'hidden'
    linksWrapper.classList.add('header-nav-mobile-links--visible')
    buttonClose.classList.add('header-nav-mobile-closer--visible')
}

const closeMobileMenu = () => {
    body.style.overflow = ''
    linksWrapper.classList.remove('header-nav-mobile-links--visible')
    buttonClose.classList.remove('header-nav-mobile-closer--visible')
}

const initScrollNavigationMobile = () => {
    const links = document.querySelectorAll('#header-nav-mobile a')

    links.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault()

            closeMobileMenu()

            setTimeout(() => {
                const section = document.querySelector(`[data-section="${(event.target?.hash || '').replace('#', '')}"]`)
                section?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
            }, 1)
        })
    })
}

const initCertsSlider = () => {
    const slider = tns({
        autoplay: false,
        container: '.certs-slider',
        controls: false,
        gutter: 10,
        mouseDrag: true,
        nav: false,
        swipeAngle: 35,
        slideBy: 'page',
        responsive: {
            0: {
                items: 1,
                edgePadding: 20,
            },
            320: {
                items: 1,
                edgePadding: 32,
            },
            600: {
                items: 2,
                edgePadding: 32,
            },
            768: {
                items: 3,
                edgePadding: 32,
            },
        },
    })
}

const initFeedbackForm = () => {
    const form: HTMLFormElement | null = document.querySelector('#feedback-form')
    if (form !== null) {
        const buttonSubmit = form.querySelector('button[type="submit"')
        const successElement = document.querySelector('#feedback-success')
        const errorElement = document.querySelector('#feedback-error')

        form.addEventListener('submit', (event) => {
            event.preventDefault()
            buttonSubmit.setAttribute('disabled', 'disabled')
            const formData = new FormData(form)
            axios
                .post(
                    form.getAttribute('action'),
                    formData,
                )
                .then(() => {
                    setTimeout(() => {
                        buttonSubmit.removeAttribute('disabled')
                    }, 1_000)
                    successElement.style.display = 'block'
                    errorElement.style.display = 'none'
                })
                .catch((exception: Error) => {
                    console.error(exception)
                    setTimeout(() => {
                        buttonSubmit.removeAttribute('disabled')
                    }, 1_000)
                    successElement.style.display = 'none'
                    errorElement.style.display = 'block'
                })
        })
    } else {
        console.warn('Form doesn exists')
    }
}

const skillsWidth = () => {
    const skills = document.querySelectorAll('.skill-items li')

    skills.forEach((skill, idx) => {
        if (window.matchMedia('(min-width: 769px)').matches) {
            skill.style.width = [ 0, 1, 2 ].includes(idx % 5) ? '30%' : '46%'
        } else {
            skill.style.width = [ 0, 1 ].includes(idx % 3) ? '48%' : '100%'
        }
    })
}

const initMobileMenu = () => {
    buttonOpen.addEventListener('click', () => {
        openMobileMenu()
    })

    buttonClose.addEventListener('click', () => {
        closeMobileMenu()
    })
}

initScrollNavigation()
initScrollNavigationMobile()
initMobileMenu()
initCertsSlider()
initFeedbackForm()
skillsWidth()

window.addEventListener('resize', () => {
    skillsWidth()
})
