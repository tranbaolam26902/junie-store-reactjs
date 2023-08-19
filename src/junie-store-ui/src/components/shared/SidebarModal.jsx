// Libraries
import { AnimatePresence } from 'framer-motion';

// Components
import { Fade, Slide } from '@components/shared/animations';

export default function SidebarModal({ right, show, onHide, children, className }) {
    return (
        <AnimatePresence>
            {show && (
                <section className={`fixed inset-0${className ? ' ' + className : ''}`}>
                    <Fade className={`absolute inset-0 bg-black/30 cursor-pointer`} onClick={onHide} />
                    <Slide
                        right={right}
                        className={`absolute top-0 ${
                            right ? 'right-0' : ''
                        } bottom-0 w-[31.25rem] max-w-[80vw] bg-primary shadow-md`}
                    >
                        {children}
                    </Slide>
                </section>
            )}
        </AnimatePresence>
    );
}
