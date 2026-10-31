import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, LazyMotion, MotionConfig, domMax } from 'motion/react';
import { useGlobalContext } from './GlobalProvider';

import Cover from "./pages/Cover";
import Homepage from './pages/Homepage';
import Couple from './pages/Couple';
import Event from './pages/Event';
import Location from './pages/Location';
import Gallery from './pages/Gallery';
import Story from './pages/Story';
import LiveStreaming from './pages/LiveStreaming';
import WellWishes from './pages/WellWishes';
import Gift from './pages/Gift';
import Closing from './pages/Closing';

import MusicButton from "./components/MusicButton";
import ScrollUpButton from "./components/ScrollUpButton";
import Navigation from "./components/Navigation";

function App() {
	const { backsound } = useGlobalContext();
	const audioRef = useRef(null);
	const [isMusicOn, setIsMusicOn] = useState(false);
	const [isOpened, setIsOpened] = useState(false);
	const [isCoverExited, setIsCoverExited] = useState(false);
	const isScrollLocked = !isOpened || !isCoverExited;
	const hasMusic = Boolean(backsound.url);

	useEffect(() => {
		document.body.style.overflow = isScrollLocked ? 'hidden' : '';

		return () => {
			document.body.style.overflow = '';
		};
	}, [isScrollLocked]);

	useEffect(() => {
		const audio = audioRef.current;
		setIsMusicOn(false);

		if (audio) {
			audio.pause();
			audio.currentTime = 0;
		}
	}, [backsound.url]);

	const startMusic = () => {
		const audio = audioRef.current;
		if (!audio || !hasMusic) return;

		setIsMusicOn(true);
		audio.play().catch(() => setIsMusicOn(false));
	};

	const handleOpenInvitation = () => {
		setIsOpened(true);
		startMusic();
	};

	const handleToggleMusic = () => {
		const audio = audioRef.current;
		if (!audio || !hasMusic) return;

		if (isMusicOn) {
			audio.pause();
			setIsMusicOn(false);
			return;
		}

		startMusic();
	};

	const handleCoverExitComplete = () => {
		setIsCoverExited(true);

		const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
		requestAnimationFrame(() => {
			document.getElementById('homepage')?.scrollIntoView({ behavior, block: 'start' });
		});
	};

	return (
		<MotionConfig reducedMotion="user">
			<LazyMotion features={domMax} strict>
				<div className='min-h-screen'>
					{hasMusic ? (
						<audio ref={audioRef} src={backsound.url} loop preload="none" />
					) : null}
					<AnimatePresence onExitComplete={handleCoverExitComplete}>
						{
							!isOpened ? (
								<Cover key="cover" onOpen={handleOpenInvitation} />
							) : null
						}
					</AnimatePresence>
					<Homepage />
					<Couple />
					<Event />
					<Location />
					<Gallery />
					<Story />
					<LiveStreaming />
					<WellWishes />
					<Gift />
					<Closing />
					{
						isOpened && isCoverExited ? (
							<>
								<div className="fixed bottom-28 right-2 z-20 flex flex-col-reverse items-center gap-3 md:bottom-32 md:right-6">
									<ScrollUpButton />
									<MusicButton
										isMusicOn={isMusicOn}
										onToggle={handleToggleMusic}
										disabled={!hasMusic}
										title={backsound.title}
									/>
								</div>
								<Navigation />
							</>
						) : null
					}
				</div>
			</LazyMotion>
		</MotionConfig>
	)
}

export default App;
