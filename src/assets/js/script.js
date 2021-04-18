window.addEventListener('DOMContentLoaded', () => {
	// Lazy Load
	const el = document.querySelectorAll('video')
	const lozadObserver = lozad(el, {
		rootMargin: '300px 0px'
	})
	lozadObserver.observe()


	// Initialise Plyrs
	const players = Array.from(document.querySelectorAll('.player')).map(
		p => new Plyr(p, {
			controls:['play'],
			keyboard:{focused:false,global:false},
			fullscreen: {enabled: false},
			clickToPlay: false,
			autopause: false,
			hideControls: false,
		})
	)

	// Initialise carousels
	const carousels = Array.from(document.querySelectorAll('.carousel')).map(
		c => new Flickity(c, {
			imagesLoaded: true,
			lazyLoad: true
		})
	)

	// Change Background
	let options = {
		rootMargin: '-24.99% 0px -75% 0px',
		threshold: 0
	}

	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			const id = entry.target.getAttribute('id')
			const gradient = entry.target.dataset.gradient
			if (entry.intersectionRatio > 0) {
				document.querySelector(`nav li a[href="#${id}"]`).classList.add('active')
				document.getElementsByClassName(gradient)[0].style.opacity = 1
			} else {
				document.querySelector(`nav li a[href="#${id}"]`).classList.remove('active')
				document.getElementsByClassName(gradient)[0].style.opacity = 0
			}
		})
	},options)

	document.querySelectorAll('section[id]').forEach((section) => {
		observer.observe(section)
	});

	// Fire a resize event to get the height of videos
	const videos = Array.from(document.querySelectorAll('video')).map(
		v => v.addEventListener('loadedmetadata', (event) => {
			let loaded = document.createEvent('HTMLEvents')
			loaded.initEvent('resize', true, false)
			document.dispatchEvent(loaded)
			v.parentElement.parentElement.classList.add('videoLoaded')
		})
	)
});

function toggleCaption(el) {
	let e = el.nextElementSibling
	if (getComputedStyle(e).display === 'none') {
		e.style.display = 'block'
	} else {
		e.style.display = 'none'
	}
}
