import { useState } from 'react';

export default function TestLayout() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Prevent body scroll when menu is open
    if (isMenuOpen) {
        document.body.classList.add('overflow-hidden');
    } else {
        document.body.classList.remove('overflow-hidden');
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Menu Bar */}
            <header>
                <nav className="bg-white shadow-md">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-center h-16 relative">

                            {/* Desktop Layout - Centered logo + menu */}
                            <div className="hidden md:flex items-center space-x-4">
                                {/* Logo */}
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
                                    <img
                                        src="https://picsum.photos/200/300"
                                        alt="Profile Picture"
                                        className="w-full h-full object-cover"
                                    />

                                </div>

                                {/* Desktop Menu */}
                                <div className="flex items-center space-x-4 ml-8">
                                    <a href="#" className="text-gray-600 hover:text-blue-500 px-3 py-2">LinkedIn</a>
                                    <a href="#" className="text-gray-600 hover:text-blue-500 px-3 py-2">Bitbucket</a>
                                    <a href="#" className="text-gray-600 hover:text-blue-500 px-3 py-2">Github</a>
                                    <a href="#" className="text-gray-600 hover:text-blue-500 px-3 py-2">Contact</a>
                                    <a href="#" className="text-gray-600 hover:text-blue-500 px-3 py-2">Articles</a>
                                </div>
                            </div>

                            {/* Mobile Layout - Centered logo */}
                            <div
                                className="md:hidden absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center"
                            >
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
                                    <img
                                        src="https://picsum.photos/200/300"
                                        alt="Profile Picture"
                                        className="w-full h-full object-cover"
                                    />

                                </div>
                            </div>

                            {/* Mobile Menu Icon - Top-right corner in mobile view */}
                            <div
                                className="md:hidden absolute right-4 top-1/2 transform -translate-y-1/2 z-50 flex items-center"
                            >
                                <button
                                    type="button"
                                    className="text-gray-600 hover:text-blue-500 focus:outline-none"
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    aria-label="Toggle menu"
                                >
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>

                            {/* Mobile Fullscreen Overlay Menu - Controlled by Hamburger Only */}
                            {isMenuOpen && (
                                <>
                                    {/* Backdrop (non-interactive) */}
                                    <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30 pointer-events-none"></div>

                                    {/* Centered Menu - Higher z-index than icon and backdrop */}
                                    <div className="md:hidden fixed inset-0 z-40 flex items-center justify-center">
                                        <div
                                            className="bg-white w-full max-w-xs mx-auto p-6 rounded-lg shadow-xl space-y-4 text-center transform transition-transform duration-300 ease-in-out"
                                        >
                                            <a href="#" className="block text-gray-700 hover:text-blue-500 text-lg py-2">
                                                LinkedIn
                                            </a>
                                            <a href="#" className="block text-gray-700 hover:text-blue-500 text-lg py-2">
                                                Bitbucket
                                            </a>
                                            <a href="#" className="block text-gray-700 hover:text-blue-500 text-lg py-2">
                                                Github
                                            </a>
                                            <a href="#" className="block text-gray-700 hover:text-blue-500 text-lg py-2">
                                                Contact
                                            </a>
                                            <a href="#" className="block text-gray-700 hover:text-blue-500 text-lg py-2">
                                                Articles
                                            </a>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </nav>
            </header>


            {/* Profile Section - Centered horizontally with column layout */}
            <section className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-6 text-center">
                    <div className="flex flex-col items-center gap-6">
                        {/* Title */}
                        <div>
                            <h1 className="text-xl font-bold text-gray-800">Find Location!</h1>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-lg">
                            Bank | ATM | CRM | Corporate Office | Restaurant | Hotels | Residential Area
                        </p>
                    </div>
                </div>
            </section>


            {/* Main Content Section with Responsive Columns */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Location Input */}
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                                Location Input
                            </label>
                            <input
                                type="text"
                                id="location"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Date, Time, and Guest Inputs - Responsive Layout */}
                        {/* Date, Time, and Guest Inputs - Responsive Layout */}
                        <div className="grid grid-cols-1 gap-4">
                            {/* Date and Time inputs in a single row on all screen sizes */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                                        Date Input
                                    </label>
                                    <input
                                        type="date"
                                        id="date"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                                        Time Input
                                    </label>
                                    <input
                                        type="time"
                                        id="time"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Guest Input in its own row */}
                            <div>
                                <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
                                    Guest Input
                                </label>
                                <input
                                    type="number"
                                    id="guests"
                                    placeholder="Number of guests"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>


                        {/* Main Content Area */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Main Content</h2>
                            <div className="prose max-w-none text-gray-600">
                                <p>This is the main content area where detailed information or interactive elements
                                    would go.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Collapses into floating circle icon on mobile */}
                    <div className="lg:col-span-1 relative">
                        {/* Desktop version - hidden on mobile */}
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

                        {/* Floating Circle Icon for Mobile View - Positioned at the right middle edge of the screen */}
                        <div className="md:hidden fixed right-4 top-1/2 transform -translate-y-1/2 z-10">
                            <button
                                type="button"
                                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg focus:outline-none"
                                aria-label="Articles and References"
                            >
                                {/* Article / Card Stack Icon */}
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
                </div>
            </main>
        </div>
    )
}
