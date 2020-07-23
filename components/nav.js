import { useEffect } from 'react';
import Link from 'next/link';
import { motion, useAnimation } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from 'tailwind.config.js';

import { navLinks } from 'config';

const fullConfig = resolveConfig(tailwindConfig);

const colors = [
    [fullConfig.theme.colors.blue[400], fullConfig.theme.colors.blue[600]],
    [fullConfig.theme.colors.purple[300], fullConfig.theme.colors.purple[600]],
    [fullConfig.theme.colors.teal[300], fullConfig.theme.colors.teal[500]],
    [fullConfig.theme.colors.pink[300], fullConfig.theme.colors.pink[500]],
    [fullConfig.theme.colors.green[300], fullConfig.theme.colors.green[600]],
];
const variants = {
    hidden: {
        opacity: 0,
        y: -50,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'tween',
            delay: 2.2,
            duration: 0.8,
            ease: 'easeOut',
        },
    },
};

const linkBackground = '#6a6a6a';

const Nav = () => {
    const controls = useAnimation();
    useEffect(() => {
        controls.start('visible');
    }, [controls]);
    return (
        <motion.div
            className="nav-container flex flex-col justify-end h-510px relative mb-390px"
            initial="hidden"
            animate={controls}
            variants={variants}>
            <nav className="absolute bottom-100px left-80px">
                <ul className="text-3xl text-white font-bold uppercase leading-snug">
                    {navLinks.map((el, i) => (
                        <motion.li
                            key={uuidv4()}
                            className="opacity-80 transition-ease nav-list-item w-max-content flex flex-col"
                            style={{ color: linkBackground, mixBlendMode: 'color-burn' }}
                            onHoverStart={() =>
                                controls.start({
                                    '--nav-background-color-1': colors[i + 1][0],
                                    '--nav-background-color-2': colors[i + 1][1],
                                    transition: {
                                        duration: 0.25,
                                        ease: 'easeOut',
                                    },
                                })
                            }
                            onHoverEnd={() =>
                                controls.start({
                                    '--nav-background-color-1': colors[0][0],
                                    '--nav-background-color-2': colors[0][1],
                                    transition: {
                                        duration: 0.25,
                                        ease: 'easeOut',
                                    },
                                })
                            }>
                            <Link href={el.url}>
                                <a>{el.name}</a>
                            </Link>
                        </motion.li>
                    ))}
                </ul>
            </nav>
            <style jsx global>{`
                .nav-container {
                    --nav-background-color-1: ${colors[0][0]};
                    --nav-background-color-2: ${colors[0][1]};
                    background: radial-gradient(
                        circle at bottom right,
                        var(--nav-background-color-1),
                        var(--nav-background-color-2)
                    );
                }
                .nav-list-item::after {
                    content: '';
                    width: 0%;
                    height: 3px;
                    background: ${linkBackground};
                }
                .nav-list-item:hover::after {
                    transition: all 250ms ease-out;
                    content: '';
                    width: 100%;
                    height: 3px;
                    background: ${linkBackground};
                }
            `}</style>
        </motion.div>
    );
};

export default Nav;
// transition: --nav-background-color-1 200ms ease, --nav-background-color-2 200ms ease;
