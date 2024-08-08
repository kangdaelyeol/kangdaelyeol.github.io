import {
    SCENE4_SLIDER_ACTIVE,
    SCENE4_IMAGE_ACTIVE,
    SCENE4_MESSAGE_ACTIVE,
} from '../constant.js'

export const activeScene4ImageSlider = (ratio, dom) => {
    if (ratio > SCENE4_SLIDER_ACTIVE.from && ratio < SCENE4_SLIDER_ACTIVE.to)
        dom.classList.add('active')
    else dom.classList.remove('active')
}

export const activeScene4ImageList = (ratio, domList) => {
    domList.forEach((el, index) => {
        if (
            ratio > SCENE4_IMAGE_ACTIVE[index].from &&
            ratio < SCENE4_IMAGE_ACTIVE[index].to
        )
            el.classList.add('active')
        else el.classList.remove('active')
    })
}

export const activeScene4MessageSlider = (ratio, domList) => {
    domList.forEach((el, index) => {
        if (ratio <= SCENE4_MESSAGE_ACTIVE[index].from) {
            el.classList.add('before')
            el.classList.remove('after')
        } else if (
            SCENE4_MESSAGE_ACTIVE[index].from < ratio &&
            ratio < SCENE4_MESSAGE_ACTIVE[index].to
        ) {
            el.classList.remove('before')
            el.classList.remove('after')
        } else {
            el.classList.add('after')
            el.classList.remove('before')
        }
    })
}
