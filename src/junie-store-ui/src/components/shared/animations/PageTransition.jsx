// Libraries
import { motion, easeInOut } from 'framer-motion';

export default function PageTransition({ children }) {
    return (
        <motion.div
            initial={{ opacity: 0, transition: { duration: 0.4, ease: easeInOut } }}
            animate={{ opacity: 1, transition: { duration: 0.4, ease: easeInOut } }}
            exit={{ opacity: 0, transition: { duration: 4, ease: easeInOut } }}
        >
            {children}
        </motion.div>
    );
}
