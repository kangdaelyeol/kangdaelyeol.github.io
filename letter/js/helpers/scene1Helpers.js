import {
    SCENE1_IMAGE_ACTIVE,
    SCENE1_MESSAGE_ACTIVE,
    SCENE1_OPACITY_ACTIVE,
} from '../constant.js'

export const activeScene1ImageSlider = (ratio, domList) => {
    domList.forEach((el, index) => {
        if (ratio > SCENE1_IMAGE_ACTIVE[index]) {
            el.classList.add('move_left')
        } else {
            el.classList.remove('move_left')
        }
    })
}

export const activeScene1MessageSlider = (ratio, domList) => {
    domList.forEach((el, index) => {
        if (ratio <= SCENE1_MESSAGE_ACTIVE[index].from) {
            el.classList.add('before')
            el.classList.remove('after')
        } else if (
            SCENE1_MESSAGE_ACTIVE[index].from < ratio &&
            ratio < SCENE1_MESSAGE_ACTIVE[index].to
        ) {
            el.classList.remove('before')
            el.classList.remove('after')
        } else {
            el.classList.add('after')
            el.classList.remove('before')
        }
    })
}

export const setScene1Opacity = (ratio, dom) => {
    if (ratio < 0) {
        dom.style.opacity = 0
        return
    }
    dom.style.opacity =
        ratio / (SCENE1_OPACITY_ACTIVE.to - SCENE1_OPACITY_ACTIVE.from)
}
