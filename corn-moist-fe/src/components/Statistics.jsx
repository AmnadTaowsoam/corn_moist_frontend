import React from 'react';

const Statistics = ({ stats }) => {
    if (!stats) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-wrap justify-around items-center text-center mb-4">
            <div className="w-full md:w-auto p-1 bg-violet-700 font-bold rounded md:rounded-2xl text-white">N (Count): {stats.n}</div>
            <div className="w-full md:w-auto p-1 bg-violet-700 font-bold rounded md:rounded-2xl text-white">Min: {Number(stats.min).toFixed(1)}%</div>
            <div className="w-full md:w-auto p-1 bg-violet-700 font-bold rounded md:rounded-2xl text-white">Max: {Number(stats.max).toFixed(1)}%</div>
            <div className="w-full md:w-auto p-1 bg-violet-700 font-bold rounded md:rounded-2xl text-white">Range: {Number(stats.range).toFixed(1)}%</div>
            <div className="w-full md:w-auto p-1 bg-violet-700 font-bold rounded md:rounded-2xl text-white">Average: {Number(stats.average).toFixed(1)}%</div>
            <div className="w-full md:w-auto p-1 bg-violet-700 font-bold rounded md:rounded-2xl text-white">Median: {Number(stats.median).toFixed(1)}%</div>
            <div className="w-full md:w-auto p-1 bg-violet-700 font-bold rounded md:rounded-2xl text-white">SD: {Number(stats.sd).toFixed(1)}%</div>
            <div className="w-full md:w-auto p-1 bg-violet-700 font-bold rounded md:rounded-2xl text-white">Variance: {Number(stats.variance).toFixed(1)}</div>
            <div className="w-full md:w-auto p-1 bg-violet-700 font-bold rounded md:rounded-2xl text-white">Skewness: {Number(stats.skewness).toFixed(3)}</div>
            <div className="w-full md:w-auto p-1 bg-violet-700 font-bold rounded md:rounded-2xl text-white">Kurtosis: {Number(stats.kurtosis).toFixed(3)}</div>
            <div className="w-full md:w-auto p-1 bg-violet-700 font-bold rounded md:rounded-2xl text-white">CV: {Number(stats.cv).toFixed(1)}%</div>
        </div>
    );
};

export default Statistics;