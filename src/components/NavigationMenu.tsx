import {useState} from 'react';

export default function NavigationMenu() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    if (isMenuOpen) {
        document.body.classList.add('overflow-hidden');
    } else {
        document.body.classList.remove('overflow-hidden');
    }

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center h-16 relative">

                    <div className="hidden md:flex items-center space-x-4">

                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
                            <img
                                src="https://picsum.photos/200/300"
                                className="w-full h-full object-cover"
                            />

                        </div>


                        <div className="flex items-center space-x-4 ml-8">
                            <a href="#" className="text-gray-600 hover:text-blue-500 px-3 py-2">LinkedIn</a>
                            <a href="#" className="text-gray-600 hover:text-blue-500 px-3 py-2">Bitbucket</a>
                            <a href="#" className="text-gray-600 hover:text-blue-500 px-3 py-2">Github</a>
                            <a href="#" className="text-gray-600 hover:text-blue-500 px-3 py-2">Contact</a>
                            <a href="#" className="text-gray-600 hover:text-blue-500 px-3 py-2">Articles</a>
                        </div>
                    </div>


                    <div
                        className="md:hidden absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center"
                    >
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
                            <img
                                src="https://picsum.photos/200/300"
                                className="w-full h-full object-cover"
                            />

                        </div>
                    </div>


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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                        </button>
                    </div>


                    {isMenuOpen && (
                        <>
                            {/* Backdrop (non-interactive) */}
                            <div
                                className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30 pointer-events-none"></div>

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
    )
}
