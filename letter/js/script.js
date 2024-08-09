import {
    activeScene1ImageSlider,
    activeScene1MessageSlider,
    setScene1Opacity,
} from './helpers/scene1Helpers.js'
import {
    activeScene2ImageSlider,
    activeScene2ImageList,
    activeScene2MessageSlider,
} from './helpers/scene2Helpers.js'

import {
    activeScene3ImageSlider,
    activeScene3ImageList,
    activeScene3MessageSlider,
} from './helpers/scene3Helpers.js'

import {
    activeScene4ImageSlider,
    activeScene4ImageList,
    activeScene4MessageSlider,
} from './helpers/scene4Helpers.js'

// Constant variables

const SCENE_HEIGHT_RATIO = 100

// Global variables

let sceneHeight
let isUnlocked = false
let isStarWar = false
let starWarY = 0

// Elements

const starWarEl = document.querySelector('.star_warz')
const sceneContainerEl = document.querySelector('.scene_container')
const lastMessageEl = document.querySelector('.last_message')

const letterContainer = document.querySelector('.letter_container')
const scene = document.querySelector('.scene')
const letterFormEl = document.querySelector('.input_form')
const passwordInputEl = document.querySelector('.password_input')

const loadingSpinnerEl = document.querySelector('.loading_container')

// Scene1 Elements

const scene1ImageElList = document.querySelectorAll(
    '.image_slider .image_container'
)

const scene1MessageElList = document.querySelectorAll('.slider1 .message')

// Scene2 Elements

const scene2ImageSlider = document.querySelector('.image_slider2')

const scene2ImageElList = scene2ImageSlider.querySelectorAll('.image_container')

const scene2messageElList = document.querySelectorAll('.slider2 .message')

// Scene3 Elements

const scene3ImageSlider = document.querySelector('.image_slider3')

const scene3ImageElList = scene3ImageSlider.querySelectorAll('.image_container')

const scene3messageElList = document.querySelectorAll('.slider3 .message')

// Scene4 Elements

const scene4ImageSlider = document.querySelector('.image_slider4')

const scene4ImageElList = scene4ImageSlider.querySelectorAll('.image_container')

const scene4messageElList = document.querySelectorAll('.slider4 .message')

// Helpers

const getScrollRatio = () => {
    return (scrollY - window.innerHeight) / sceneHeight
}

// Event Listenters

const onWindowScroll = () => {
    if (!isUnlocked) return
    // calculater scene ratio
    const scrollratio = getScrollRatio()
    console.log(scrollratio)
    activeScene1ImageSlider(scrollratio, scene1ImageElList)
    activeScene1MessageSlider(scrollratio, scene1MessageElList)
    setScene1Opacity(scrollratio, scene)

    activeScene2ImageSlider(scrollratio, scene2ImageSlider)
    activeScene2ImageList(scrollratio, scene2ImageElList)
    activeScene2MessageSlider(scrollratio, scene2messageElList)

    activeScene3ImageSlider(scrollratio, scene3ImageSlider)
    activeScene3ImageList(scrollratio, scene3ImageElList)
    activeScene3MessageSlider(scrollratio, scene3messageElList)

    activeScene3ImageSlider(scrollratio, scene3ImageSlider)
    activeScene3ImageList(scrollratio, scene3ImageElList)
    activeScene3MessageSlider(scrollratio, scene3messageElList)

    activeScene4ImageSlider(scrollratio, scene4ImageSlider)
    activeScene4ImageList(scrollratio, scene4ImageElList)
    activeScene4MessageSlider(scrollratio, scene4messageElList)
}

const onWindowLoad = () => {
    // loadingSpinnerEl.remove()
    const innerH = window.innerHeight
    letterContainer.style.height = innerH * SCENE_HEIGHT_RATIO + 'px'
    sceneHeight = innerH * SCENE_HEIGHT_RATIO
    setScene1Opacity(0, scene)
    activeScene1ImageSlider(0, scene1ImageElList)
    activeScene1MessageSlider(0, scene1MessageElList)

    activeScene2ImageSlider(0, scene2ImageSlider)
    activeScene2ImageList(0, scene2ImageElList)
    activeScene2MessageSlider(0, scene2messageElList)

    activeScene3ImageSlider(0, scene3ImageSlider)
    activeScene3ImageList(0, scene3ImageElList)
    activeScene3MessageSlider(0, scene3messageElList)

    activeScene3ImageSlider(0, scene3ImageSlider)
    activeScene3ImageList(0, scene3ImageElList)
    activeScene3MessageSlider(0, scene3messageElList)

    activeScene4ImageSlider(0, scene4ImageSlider)
    activeScene4ImageList(0, scene4ImageElList)
    activeScene4MessageSlider(0, scene4messageElList)
}

const starWarCheck = () => {
    if (getScrollRatio() > 0.75) isStarWar = true
    else isStarWar = false

    if (starWarY > 150) {
        sceneContainerEl.classList.add('active')
        starWarEl.classList.add('active')
        lastMessageEl.classList.add('active')
    } else {
        sceneContainerEl.classList.remove('active')
        starWarEl.classList.remove('active')
        lastMessageEl.classList.remove('active')
    }

    if (isStarWar) {
        console.log('starwar')
        starWarEl.style.transform = `translateY(${-starWarY}px)`
        starWarY++
    } else {
        starWarY = 0
        starWarEl.style.transform = `translateY(${-starWarY}px)`
    }
    requestAnimationFrame(starWarCheck)
}

const init = () => {
    letterFormEl.addEventListener('submit', (e) => {
        e.preventDefault()
        const password = passwordInputEl.value
        passwordInputEl.value = ''
        if (password === 'A308') {
            isUnlocked = true
            document.querySelector('.lock_container').remove()
            scrollTo({
                top: 0,
            })
        }
    })

    window.addEventListener('load', onWindowLoad)
    window.addEventListener('scroll', onWindowScroll)
    starWarCheck()
}

init()
