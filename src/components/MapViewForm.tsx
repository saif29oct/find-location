import * as React from "react";
import CategoryList from "./CategoryList";
import {useRef, useState} from "react";
import type {CategoryContextType} from "../types/category";
// import {useCategories} from "../hooks/useFetchFourSquarePlaceCategories.ts";

export default function MapViewForm() {
    const [selectedCategory, setSelectedCategory] = useState("");

    // const csvUrl = `/data/places_categories.csv`;
    // const { loading, error } = useCategories(csvUrl);

    const userLocationRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

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

    type FormData = {
        userLocation: string
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData: FormData = {
            userLocation: userLocationRef.current?.value || ''
        };

        // Validation
        const errors: Partial<Record<keyof FormData, string>> = {};
        if (!formData.userLocation) errors.userLocation = "Username is required";

        if (Object.keys(errors).length > 0) {
            console.error("Validation errors:", errors);
            return;
        }

        console.log("Form submitted:", formData);
        formRef.current?.reset();

        // const formData = new FormData(event.currentTarget);
        // const formValues = Object.fromEntries(formData);
    };

    const categoryContext: CategoryContextType = {
        currentCategory: selectedCategory,
        categories,
        onSelect: setSelectedCategory,
    };

    return (
        <form
            className="grid grid-cols-1 gap-4"
            ref={formRef}
            onSubmit={handleSubmit}
        >
            <CategoryList {...categoryContext} />
            <div className="flex gap-4">
                <div className="flex flex-col space-y-1">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 text-left">
                        Your Location
                    </label>
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-4 gap-1 md:gap-0">
                        <input
                            type="text"
                            id="location"
                            name="city"
                            placeholder="City"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input
                            type="text"
                            id="location"
                            name="state"
                            placeholder="state"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input
                            type="text"
                            id="location"
                            name="postal_code"
                            placeholder="Postal Code"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

            </div>

            <div className="flex flex-col space-y-2">
                <label htmlFor="radius" className="block text-sm font-medium text-gray-700 text-left">
                    Find your location
                </label>

                <div className="flex flex-col md:flex-row md:items-center md:space-x-4 gap-1 md:gap-0">
                    <input
                        type="number"
                        id="radius"
                        name="radius"
                        placeholder="Radius: 1 km"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                        type="text"
                        id="place"
                        name="place"
                        placeholder="Ex. Dhaka Bank"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
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
