import * as React from "react";
import type { CategoryContextType } from "../types/category";

const CategoryList = ({ currentCategory, categories, onSelect }: CategoryContextType) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState(currentCategory);

    // Filtered categories based on search term (case-insensitive)
    const filteredCategories = React.useMemo(() => {
        return categories.filter((category) =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [categories, searchTerm]);

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 text-left mb-1">Search Category</label>
            <div className="relative">
                <input
                    type="text"
                    name="category"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsOpen(true)}
                    onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="Ex. Restaurant"
                />
                {isOpen && (
                    <ul className="absolute z-10 w-full mt-1 max-h-40 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg">
                        {filteredCategories.map((category) => (
                            <li
                                key={category.id}
                                onClick={() => {
                                    setSearchTerm(category.name);
                                    setIsOpen(false);
                                    onSelect(category.name);
                                }}
                                className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                            >
                                {category.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default CategoryList;
