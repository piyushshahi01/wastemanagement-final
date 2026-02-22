import { motion } from 'framer-motion';

const pageVariants = {
    initial: {
        opacity: 0,
        x: -20, // Level 1 subtle slide
    },
    in: {
        opacity: 1,
        x: 0,
    },
    out: {
        opacity: 0,
        x: 20, // Level 1 subtle slide
    },
};

const pageTransition = {
    type: 'tween',
    ease: "circOut",
    duration: 0.4
};

export default function AnimatedPage({ children, className = "" }) {
    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className={`h-full ${className}`}
        >
            {children}
        </motion.div>
    );
}
