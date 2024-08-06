const headerEl = document.querySelector('header')

const onWindowScroll = (event) => {
    if (scrollY > 100) {
        headerEl.classList.add('active')
    } else {
        headerEl.classList.remove('active')
    }
}

window.addEventListener('scroll', onWindowScroll)
