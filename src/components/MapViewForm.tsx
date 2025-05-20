import * as React from "react";
import CategoryList from "./CategoryList";
import { useState } from "react";
import type {CategoryContextType} from "../types/category";

export default function MapViewForm() {
    const [selectedCategory, setSelectedCategory] = useState("");

    const categories = [
        "Hospital",
        "Bank",
        "College",
        "University",
        "Shopping Mall",
        "Junctions",
        "Bus Stands",
        "Mosques",
        "CRM Machine",
        "ATM",
        "School"
    ];

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // const formData = new FormData(event.currentTarget);
        // const formValues = Object.fromEntries(formData);
    };

    const categoryContext: CategoryContextType = {
        currentCategory: selectedCategory,
        categories,
        onSelect: setSelectedCategory,
    };

    return (
        <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
            <CategoryList {...categoryContext} />
            <div className="flex gap-4">
                <div style={{ width: "25%", maxWidth: 150 }}>
                    <label htmlFor="radius" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                        Radius
                    </label>
                    <div className="flex items-center">
                        <input
                            type="number"
                            id="radius"
                            name="radius"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            defaultValue={1}
                        />
                        <span className="ml-2 text-sm text-gray-600">km</span>
                    </div>
                </div>
                <div className="flex-grow">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                        Your Location
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="userLocation"
                        placeholder="your current location"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="place" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                    Place you are looking for
                </label>
                <input
                    type="text"
                    id="place"
                    name="place"
                    placeholder="Ex. Dhaka Bank"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <button
                type="submit"
                className="w-30 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                Search
            </button>
        </form>
    );
}
