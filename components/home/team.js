import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { Icon, FadeUp } from 'components';
import { SectionHeading } from 'components/home';
import { useParallaxScroll, useMedia } from 'hooks';

const blockQuoteVariants = {
    hidden: {
        opacity: 0,
        x: -50,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            delay: 0.5,
            duration: 0.8,
        },
    },
};

const Team = ({ image, quote, scrollY }) => {
    const { maxmd } = useMedia();
    const [teamRef, teamY] = useParallaxScroll(scrollY, -600, 0, maxmd ? 50 : -10, maxmd ? 50 : 0);

    const [blockQuoteRef, inView] = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });

    return (
        <motion.section ref={teamRef} className="mb-16 bg-white" style={{ y: teamY }}>
            <FadeUp className="flex flex-col justify-center items-center w-full h-full">
                <SectionHeading>Our Team</SectionHeading>
                <div className="relative h-800px xl:h-650px md:h-500px overflow-hidden w-full">
                    <div className="bg-grey-900 opacity-50 absolute w-full h-full z-10" />
                    <motion.blockquote
                        ref={blockQuoteRef}
                        className="absolute z-10 top-50px left-30px flex w-3/7 text-white m-0 px-6 md:top-20px md:left-10px xl:w-4/7 md:w-5/7 xs:w-full xs:px-4"
                        initial="hidden"
                        animate={inView ? 'visible' : 'hidden'}
                        variants={blockQuoteVariants}>
                        <Icon
                            className="w-8 h-8 min-h-8 min-w-8 mt-2 mr-3 fill-current xs:w-6 xs:h-6 xs:min-w-6 xs:min-h-6"
                            name="quote-left"
                        />
                        <p className="italic font-secondary text-4xl md:text-2xl">{quote}</p>
                    </motion.blockquote>
                    <img className="engulf object-cover" src={image.url} alt={image.alt} />
                </div>
            </FadeUp>
        </motion.section>
    );
};

Team.propTypes = {
    image: PropTypes.object.isRequired,
    scrollY: PropTypes.object.isRequired,
    quote: PropTypes.string.isRequired,
};

export default Team;
