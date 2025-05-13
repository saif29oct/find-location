import { useState } from 'react';

export const TestComponent = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gray-800 max-w-2xl mx-auto px-4">
            <div className="max-w-2xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img
                                className="h-8 w-8"
                                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                                alt="Workflow"
                            />
                        </div>
                    </div>
                    <div className="hidden md:flex items-baseline space-x-4 ml-10">
                        <a
                            href="#"
                            className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                            aria-current="page"
                        >
                            Home
                        </a>
                        <a
                            href="#"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                            About
                        </a>
                        <a
                            href="#"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Services
                        </a>
                        <a
                            href="#"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Contact
                        </a>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className={`${isOpen ? '' : 'hidden'} md:hidden`}>
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <a
                            href="#"
                            className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                            aria-current="page"
                        >
                            Home
                        </a>
                        <a
                            href="#"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                            About
                        </a>
                        <a
                            href="#"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Services
                        </a>
                        <a
                            href="#"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};
