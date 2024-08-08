import {
    SCENE2_SLIDER_ACTIVE,
    SCENE2_IMAGE_ACTIVE,
    SCENE2_MESSAGE_ACTIVE,
} from '../constant.js'

export const activeScene2ImageSlider = (ratio, dom) => {
    if (ratio > SCENE2_SLIDER_ACTIVE.from && ratio < SCENE2_SLIDER_ACTIVE.to)
        dom.classList.remove('before')
    else dom.classList.add('before')
}

export const activeScene2ImageList = (ratio, domList) => {
    domList.forEach((el, index) => {
        if (index === 0) return
        if (ratio > SCENE2_IMAGE_ACTIVE[index]) el.classList.remove('before')
        else el.classList.add('before')
    })
}

export const activeScene2MessageSlider = (ratio, domList) => {
    domList.forEach((el, index) => {
        if (ratio <= SCENE2_MESSAGE_ACTIVE[index].from) {
            el.classList.add('before')
            el.classList.remove('after')
        } else if (
            SCENE2_MESSAGE_ACTIVE[index].from < ratio &&
            ratio < SCENE2_MESSAGE_ACTIVE[index].to
        ) {
            el.classList.remove('before')
            el.classList.remove('after')
        } else {
            el.classList.add('after')
            el.classList.remove('before')
        }
    })
}
