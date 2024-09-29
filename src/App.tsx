import React from 'react';
import HistoricalTimeline from './components/HistoricalTimeline';

const periods = [
    {
        startYear: 1900,
        endYear: 1950,
        events: [
            { year: 1914, description: 'Начало Первой мировой войны' },
            { year: 1929, description: 'Великая депрессия' },
        ],
    },
    {
        startYear: 1951,
        endYear: 2000,
        events: [
            { year: 1969, description: 'Посадка человека на Луну' },
            { year: 1989, description: 'Падение Берлинской стены' },
        ],
    },
    {
        startYear: 1951,
        endYear: 2000,
        events: [
            { year: 1969, description: 'Посадка человека на Луну' },
            { year: 1989, description: 'Падение Берлинской стены' },
        ],
    },
    {
        startYear: 1951,
        endYear: 2000,
        events: [
            { year: 1969, description: 'Посадка человека на Луну' },
            { year: 1989, description: 'Падение Берлинской стены' },
        ],
    },
    {
        startYear: 1951,
        endYear: 2000,
        events: [
            { year: 1969, description: 'Посадка человека на Луну' },
            { year: 1989, description: 'Падение Берлинской стены' },
        ],
    },
];

const App: React.FC = () => {
    return (
        <div className="App">
            <HistoricalTimeline periods={periods} />
        </div>
    );
};

export default App;
