// Libraries
import { motion, easeInOut } from 'framer-motion';

export default function Slide({ right, children, ...passProps }) {
    return (
        <motion.div
            initial={{ x: right ? '100%' : '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { duration: 0.2, ease: easeInOut } }}
            exit={{ x: right ? '100%' : '-100%', opacity: 0, transition: { duration: 0.2, ease: easeInOut } }}
            {...passProps}
        >
            {children}
        </motion.div>
    );
}
