/* eslint-disable no-console */
import axios from 'axios'
import { tns } from 'tiny-slider/src/tiny-slider'

import '../css/main.css'

const initScrollNavigation = () => {
    const links = document.querySelectorAll('#header-nav a')

    links.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault()
            const section = document.querySelector(`[data-section="${(event.target?.hash || '').replace('#', '')}"]`)

            section?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
        })
    })

    const feedbackLink = document.querySelector('#feedback-link')
    feedbackLink.addEventListener('click', (event) => {
        event.preventDefault()
        const section = document.querySelector('[data-section="feedback"]')
        section?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
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
        const successElement = document.querySelector('#feedback-success')
        const errorElement = document.querySelector('#feedback-error')

        form.addEventListener('submit', (event) => {
            event.preventDefault()
            const formData = new FormData(form)
            axios
                .post(
                    form.getAttribute('action'),
                    formData,
                )
                .then((response) => {
                    console.log(response)
                    successElement.style.display = 'block'
                    errorElement.style.display = 'none'
                })
                .catch((exception: Error) => {
                    console.error(exception)
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

initScrollNavigation()
initCertsSlider()
initFeedbackForm()
skillsWidth()

window.addEventListener('resize', () => {
    skillsWidth()
})
