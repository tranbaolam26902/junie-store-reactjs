// Libraries
import { motion, easeInOut } from 'framer-motion';

export default function Fade({ children, ...passProps }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2, ease: easeInOut } }}
            exit={{ opacity: 0, transition: { duration: 0.2, ease: easeInOut } }}
            {...passProps}
        >
            {children}
        </motion.div>
    );
}
