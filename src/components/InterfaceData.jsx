import React from "react";

const InterfaceData = () => {
  return (
    <>
        <div className="flex justify-center">
            <form className="">
                <div className="grid grid-cols-6 gap-2 gap-y-0.5 m-2">
                    <div className="">
                        <label
                            htmlFor="sampleCount"
                            className="text-xs font-medium text-gray-900 dark:text-black"
                        >
                            N:
                        </label>
                        <input
                            type="text"
                            id="sampleCount"
                            name="sampleCount"
                            className="block w-full p-1 text-gray-900 border border-gray-300 rounded-lg sm:text-xs"
                        />
                    </div>
                    <div className="">
                        <label
                            htmlFor="minimum"
                            className="text-xs font-medium text-gray-900 dark:text-black"
                        >
                            Min:
                        </label>
                        <input
                            type="text"
                            id="minimum"
                            name="minimum"
                            className="block w-full p-1 text-gray-900 border border-gray-300 rounded-lg sm:text-xs"
                        />
                        </div>
                    <div className="">
                        <label
                            htmlFor="maximum"
                            className="text-xs font-medium text-gray-900 dark:text-black"
                        >
                            Max:
                        </label>
                        <input
                            type="text"
                            id="maximum"
                            name="maximum"
                            className="block w-full p-1 text-gray-900 border border-gray-300 rounded-lg sm:text-xs"
                        />
                        </div>
                    <div className="">
                        <label
                            htmlFor="average"
                            className="text-xs font-medium text-gray-900 dark:text-black"
                        >
                            Average:
                        </label>
                        <input
                            type="text"
                            id="average"
                            name="average"
                            className="block w-full p-1 text-gray-900 border border-gray-300 rounded-lg sm:text-xs"
                        />
                        </div>
                    <div className="">
                        <label
                            htmlFor="stDev"
                            className="text-xs font-medium text-gray-900 dark:text-black"
                        >
                            SD:
                        </label>
                        <input
                            type="text"
                            id="stDev"
                            name="stDev"
                            className="block w-full p-1 text-gray-900 border border-gray-300 rounded-lg sm:text-xs"
                        />
                        </div>
                    <div className="flex items-end">
                        <button className="bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white border border-teal-500 hover:border-transparent rounded-lg w-3/4 h-1/2 text-sm">
                        Interface
                        </button>
                    </div>
                </div>
        </form>
    </div>
    </>
  );
};

export default InterfaceData;
