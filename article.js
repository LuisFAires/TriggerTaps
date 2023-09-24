//This file is responsible for everything that happens into the article tag

backToGame.style.opacity = 0
window.addEventListener("scroll", () => {
    if (scrollY < 50) {
        backToGame.style.display = "none"
        backToGame.style.opacity = 0
    } else if (scrollY < 150) {
        backToGame.style.display = "block"
        backToGame.style.opacity = ((scrollY - 50) / 150);
    } else {
        backToGame.style.display = "block"
        backToGame.style.opacity = 1
    }
})

function languageSwitcher(language) {
    document.cookie = cookieExpires ? `lang=${language};expires=${cookieExpires};` : `lang=${language}`
    window.history.replaceState({}, document.title, `/?lang=${language}`);
    location.reload();
}