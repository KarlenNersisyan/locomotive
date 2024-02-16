'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';

export default function ScrollContainer({ children }) {
	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);

		const scroller = new LocomotiveScroll({
			el: document.querySelector('[data-scroll-container]'),
			smooth: true,
		});

		scroller.on('scroll', ScrollTrigger.update);

		ScrollTrigger.scrollerProxy('.container', {
			scrollTop(value) {
				return arguments.length ? scroller.scrollTo(value, 0, 0) : scroller.scroll.instance.scroll.y;
			},
			getBoundingClientRect() {
				return {
					left: 0,
					top: 0,
					width: window.innerWidth,
					height: window.innerHeight,
				};
			},
		});

		ScrollTrigger.create({
			trigger: '.image-mask',
			scroller: '.container',
			start: 'top+=30% 50%',
			end: 'bottom-=40% 50%',
			animation: gsap.to('.image-mask', { backgroundSize: '120%' }),
			scrub: 1,
		});

		ScrollTrigger.addEventListener('refresh', () => scroller.update());
		ScrollTrigger.refresh();

		return () => {
			scroller.destroy();
			ScrollTrigger.removeEventListener('refresh', () => scroller.update());
		};
	}, []);

	return (
		<div
			className='container'
			data-scroll-container>
			{children}
		</div>
	);
}
