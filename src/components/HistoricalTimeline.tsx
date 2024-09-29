import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './HistoricalTimeline.scss';
import { motion, AnimatePresence } from 'framer-motion';

interface TimelineEvent {
    year: number;
    description: string;
}

interface TimelinePeriod {
    startYear: number;
    endYear: number;
    events: TimelineEvent[];
}

interface HistoricalTimelineProps {
    periods: TimelinePeriod[];
}

const yearVariants = {
    initial: { rotateX: -90, opacity: 0 },
    animate: { rotateX: 0, opacity: 1 },
    exit: { rotateX: 90, opacity: 0 },
};

const HistoricalTimeline: React.FC<HistoricalTimelineProps> = ({ periods }) => {
    const [activePeriodIndex, setActivePeriodIndex] = useState<number>(0);
    const activePeriod = periods[activePeriodIndex];
    const circleRef = useRef<SVGCircleElement>(null);

    const handlePeriodChange = (index: number) => {
        setActivePeriodIndex(index);
    };

    const numberOfPeriods = periods.length;
    const angleIncrement = 360 / numberOfPeriods;

    // Вычисляем угол поворота, чтобы активная точка переместилась в верхнюю правую часть
    const desiredAngle = -45; // Верхняя правая позиция в градусах
    const activePointAngle = angleIncrement * activePeriodIndex - 90; // Текущий угол активной точки
    const rotation = desiredAngle - activePointAngle;

    // Пворот в диапазоне от -180 до 180 градусов
    const normalizedRotation = ((rotation + 180) % 360) - 180;

    return (
        <div className="historical-timeline">
            <h2 className="historical-timeline__title">Исторические даты</h2>
            <div className="historical-timeline__circle-container">
                <motion.svg
                    viewBox="0 0 100 100"
                    className="historical-timeline__svg"
                    animate={{ rotate: normalizedRotation }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    style={{ transformOrigin: '50% 50%' }}
                >
                    <circle
                        ref={circleRef}
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#e0e0e0"
                        strokeWidth="0.5"
                        className="historical-timeline__circle"
                    />
                    {periods.map((period, index) => {
                        const angle = angleIncrement * index - 90; // Начинаем с верхней точки
                        const radians = (angle * Math.PI) / 180;
                        const x = 50 + 40 * Math.cos(radians);
                        const y = 50 + 40 * Math.sin(radians);
                        const isActive = index === activePeriodIndex;
                        return (
                            <circle
                                key={index}
                                cx={x}
                                cy={y}
                                r="4"
                                fill={isActive ? '#ff69b4' : '#6495ed'}
                                onClick={() => handlePeriodChange(index)}
                                className="historical-timeline__point"
                                style={{ cursor: 'pointer' }}
                                role="button"
                                aria-label={`Период ${period.startYear} - ${period.endYear}`}
                                tabIndex={0}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        handlePeriodChange(index);
                                    }
                                }}
                            />
                        );
                    })}
                </motion.svg>
                <div className="historical-timeline__years">
                    <AnimatePresence mode='wait'>
                        <motion.span
                            key={activePeriodIndex} // повторная анимация при изменении индекса
                            variants={yearVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.5 }}
                            className="historical-timeline__year"
                        >
                            {`${activePeriod.startYear} - ${activePeriod.endYear}`}
                        </motion.span>
                    </AnimatePresence>
                </div>
            </div>
            <div className="historical-timeline__slider">
                <Swiper
                    className="historical-timeline__swiper"
                    modules={[Navigation, Pagination]}
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    onSlideChange={(swiper) => setActivePeriodIndex(swiper.activeIndex)}
                    initialSlide={activePeriodIndex}
                >
                    {periods.map((period, index) => (
                        <SwiperSlide key={index} className="historical-timeline__slide">
                            <div className="historical-timeline__event-year">{`${period.startYear} - ${period.endYear}`}</div>
                            <div className="historical-timeline__event-description">
                                <ul>
                                    {period.events.map((event, idx) => (
                                        <li key={idx}>
                                            <strong>{event.year}:</strong> {event.description}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default HistoricalTimeline;