// Libraries
import { motion, easeInOut } from 'framer-motion';

export default function Slide({ right, children, ...passProps }) {
    return (
        <motion.div
            initial={{ x: right ? '100%' : '-100%' }}
            animate={{ x: 0, transition: { duration: 0.4, ease: easeInOut } }}
            exit={{ x: right ? '100%' : '-100%', transition: { duration: 0.4, ease: easeInOut } }}
            {...passProps}
        >
            {children}
        </motion.div>
    );
}
