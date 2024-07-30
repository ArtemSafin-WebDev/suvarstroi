import gsap from 'gsap';
import Swiper from 'swiper/bundle';

export default function projectIntro() {
    const elements = Array.from(document.querySelectorAll('.project-intro'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper');

        const cursor = element.querySelector('.project-intro__cursor');
        const pagination = element.querySelector('.project-intro__pagination');
        const paginationTextElement = pagination.querySelector('.project-intro__pagination-inner');
        let cursorDirection = 'right';
        let cursorInside = false;
        let autoplayDisabled = false;
        const AUTOPLAY_DURATION = 15;
        const slides = Array.from(element.querySelectorAll('.swiper-slide'));
        const bulletsWrapper = element.querySelector('.project-intro__bullets');

        slides.forEach(() => {
            const bullet = document.createElement('div');
            bullet.classList.add('project-intro__bullet');
            bulletsWrapper.appendChild(bullet);
        });

        const bullets = Array.from(element.querySelectorAll('.project-intro__bullet'));

        const setFraction = swiper => {
            paginationTextElement.textContent = `${swiper.realIndex + 1} / ${swiper.slides.length}`;
        };

        const setBullets = swiper => {
            const activeIndex = swiper.realIndex;
            bullets.forEach((bullet, bulletIndex) => {
                bullet.classList.remove('large', 'smaller', 'small');
                if (bulletIndex === activeIndex) {
                    bullet.classList.add('large');
                    return;
                }
                const distanceToBullet = Math.abs(activeIndex - bulletIndex);
                if (distanceToBullet > 2 && distanceToBullet <= 3) {
                    bullet.classList.add('smaller');
                } else if (distanceToBullet > 3) {
                    bullet.classList.add('small');
                }
            });
        };

        function autoplay(swiper) {
            if (autoplayDisabled) return;
            gsap.killTweensOf(element);
            gsap.fromTo(
                element,
                {
                    '--p': 0
                },
                {
                    '--p': 100,
                    ease: 'none',
                    duration: AUTOPLAY_DURATION,
                    onComplete: () => {
                        swiper.slideNext();
                    }
                }
            );
        }

        const instance = new Swiper(container, {
            speed: 1000,
            effect: 'fade',
            loop: true,
            longSwipeRation: 0.3,
            fadeEffect: {
                crossFade: false
            },
            init: false,

            on: {
                init: swiper => {
                    setFraction(swiper);
                    setBullets(swiper);
                    autoplay(swiper);
                },
                slideChange: swiper => {
                    setFraction(swiper);
                    setBullets(swiper);
                    autoplay(swiper);
                }
            }
        });

        instance.init();

        if (cursor) {
            gsap.set(cursor, { xPercent: -50, yPercent: -50 });

            let xTo = gsap.quickTo(cursor, 'x', { duration: 0.6, ease: 'power3' }),
                yTo = gsap.quickTo(cursor, 'y', { duration: 0.6, ease: 'power3' });

            element.addEventListener('mousemove', e => {
                if (e.clientX > window.innerWidth / 2) {
                    cursorDirection = 'right';
                    cursor.classList.remove('flipped');
                } else {
                    cursorDirection = 'left';
                    cursor.classList.add('flipped');
                }
                xTo(e.clientX);
                yTo(e.clientY + window.scrollY);
            });

            element.addEventListener('mouseenter', () => {
                cursorInside = true;
            });
            element.addEventListener('mouseleave', () => {
                cursorInside = false;
            });

            element.addEventListener('click', event => {
                // if (!cursorInside) return;

                if (cursorDirection === 'right') {
                    instance.slideNext();

                    console.log('Sliding next');
                } else {
                    instance.slidePrev();
                    console.log('Sliding prev');
                }
            });
        }
    });
}
