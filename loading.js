//dish load screen

window.addEventListener('load', () => {
    const loader = document.getElementById('loadingScreen');

    loader.style.opacity = '1';

    setTimeout(() => {
        loader.style.opacity = '0';

        //remove screen after fade out
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }, 1500); //1.5 seconds visible
});