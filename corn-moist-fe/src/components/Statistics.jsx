import React from 'react';

const Statistics = ({ data }) => {
    const values = data.map(d => d.value);
    const n = values.length;
    const min = n ? Math.min(...values) : 0;
    const max = n ? Math.max(...values) : 0;
    const range = max - min;
    const average = n ? values.reduce((sum, value) => sum + value, 0) / n : 0;
    const median = getMedian(values);
    const sd = getStandardDeviation(values, average);
    const variance = getVariance(values, average);
    const skewness = getSkewness(values, average, sd);
    const kurtosis = getKurtosis(values, average, sd);
    const cv = getCoefficientOfVariation(average, sd);

    function getMedian(numbers) {
        const sorted = [...numbers].sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    }

    function getStandardDeviation(values, mean) {
        const squareDiffs = values.map(value => (value - mean) ** 2);
        return Math.sqrt(squareDiffs.reduce((sum, diff) => sum + diff, 0) / values.length);
    }

    function getVariance(values, mean) {
        const squareDiffs = values.map(value => (value - mean) ** 2);
        return squareDiffs.reduce((sum, diff) => sum + diff, 0) / values.length;
    }

    function getSkewness(values, mean, sd) {
        const n = values.length;
        return values.reduce((acc, val) => acc + ((val - mean) ** 3), 0) / (n * (sd ** 3));
    }

    function getKurtosis(values, mean, sd) {
        const n = values.length;
        return values.reduce((acc, val) => acc + ((val - mean) ** 4), 0) / (n * (sd ** 4)) - 3;
    }

    function getCoefficientOfVariation(mean, sd) {
        return (sd / mean) * 100;
    }

    return (
        <div className="flex flex-wrap justify-around items-center text-center p-1 bg-gray-100 rounded-lg shadow">
            {/* <h2 className="w-full text-2xl font-semibold text-gray-700 mb-4">Statistics</h2> */}
            <div className="w-full md:w-auto p-2 bg-violet-900 font-bold rounded md:rounded-2xl text-white">N (Count): {n}</div>
            <div className="w-full md:w-auto p-2 bg-violet-900 font-bold rounded md:rounded-2xl text-white">Min: {min.toFixed(1)} %</div>
            <div className="w-full md:w-auto p-2 bg-violet-900 font-bold rounded md:rounded-2xl text-white">Max: {max.toFixed(1)} %</div>
            <div className="w-full md:w-auto p-2 bg-violet-900 font-bold rounded md:rounded-2xl text-white">Range: {range.toFixed(1)} %</div>
            <div className="w-full md:w-auto p-2 bg-violet-900 font-bold rounded md:rounded-2xl text-white">Average: {average.toFixed(1)} %</div>
            <div className="w-full md:w-auto p-2 bg-violet-900 font-bold rounded md:rounded-2xl text-white">Median: {median.toFixed(1)} %</div>
            <div className="w-full md:w-auto p-2 bg-violet-900 font-bold rounded md:rounded-2xl text-white">SD: {sd.toFixed(1)}%</div>
            <div className="w-full md:w-auto p-2 bg-violet-900 font-bold rounded md:rounded-2xl text-white">Variance: {variance.toFixed(1)}</div>
            <div className="w-full md:w-auto p-2 bg-violet-900 font-bold rounded md:rounded-2xl text-white">Skewness: {skewness.toFixed(3)}</div>
            <div className="w-full md:w-auto p-2 bg-violet-900 font-bold rounded md:rounded-2xl text-white">Kurtosis: {kurtosis.toFixed(3)}</div>
            <div className="w-full md:w-auto p-2 bg-violet-900 font-bold rounded md:rounded-2xl text-white">CV: {cv.toFixed(1)}%</div>
        </div>
    );
};

export default Statistics;
