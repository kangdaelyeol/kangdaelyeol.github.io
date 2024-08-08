import {
    SCENE3_SLIDER_ACTIVE,
    SCENE3_IMAGE_ACTIVE,
    SCENE3_MESSAGE_ACTIVE,
} from '../constant.js'

export const activeScene3ImageSlider = (ratio, dom) => {
    if (ratio > SCENE3_SLIDER_ACTIVE.from && ratio < SCENE3_SLIDER_ACTIVE.to)
        dom.classList.remove('before')
    else dom.classList.add('before')
}

export const activeScene3ImageList = (ratio, domList) => {
    domList.forEach((el, index) => {
        let className
        switch (index % 4) {
            case 0:
                className = 'active_bottom'
                break
            case 1:
                className = 'active_right'
                break
            case 2:
                className = 'active_top'
                break
            case 3:
                className = 'active_left'
                break
        }
        if (ratio > SCENE3_IMAGE_ACTIVE[index]) el.classList.add(className)
        else el.classList.remove(className)
    })
}

export const activeScene3MessageSlider = (ratio, domList) => {
    domList.forEach((el, index) => {
        if (ratio <= SCENE3_MESSAGE_ACTIVE[index].from) {
            el.classList.add('before')
            el.classList.remove('after')
        } else if (
            SCENE3_MESSAGE_ACTIVE[index].from < ratio &&
            ratio < SCENE3_MESSAGE_ACTIVE[index].to
        ) {
            el.classList.remove('before')
            el.classList.remove('after')
        } else {
            el.classList.add('after')
            el.classList.remove('before')
        }
    })
}
