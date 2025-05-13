import React from "react";

export default function ArticleSection() {
    return (
        <div className="lg:col-span-1 relative">

            <div
                className="hidden md:block sticky top-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out mb-4">
                    Know Me
                </button>
                <div className="text-gray-600">
                    <h3 className="font-medium text-gray-800 mb-2">Sub Content</h3>
                    <p className="text-sm">Additional information, links, or secondary content can be placed
                        here.</p>
                </div>
            </div>

            <div className="md:hidden fixed right-4 top-1/2 transform -translate-y-1/2 z-10">
                <button
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg focus:outline-none"
                    aria-label="Articles and References"
                >

                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 0 02-2V7a2 2 0 00-2-2z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5a2 2 0 00-2 2h2M9 7V5M15 7l3-3M18 4v6a2 2 0 002 2h2"
                        />
                    </svg>
                </button>
            </div>

        </div>
    )
}
