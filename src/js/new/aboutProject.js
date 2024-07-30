export default function aboutProject() {
    const elements = Array.from(document.querySelectorAll('.about-project'));

    elements.forEach(element => {
        const toggle = element.querySelector('.about-project__text-toggle');

        toggle?.addEventListener('click', event => {
            event.preventDefault();
            toggle.parentElement?.classList.toggle('content-shown');
        });
    });
}
