import * as React from "react";
import CategoryList from "./CategoryList";
import {useRef, useState} from "react";
import type {CategoryContextType} from "../types/category";
import {useCategories} from "../hooks/useFetchFourSquarePlaceCategories.ts";

export default function MapViewForm() {
    const [selectedCategory, setSelectedCategory] = useState("");

    const csvUrl = `/data/places_categories.csv`;
    const {categories} = useCategories(csvUrl);

    const formRef = useRef<HTMLFormElement>(null);

    type FormData = {
        category: string,
        city: string,
        state: string,
        postal_code?: number,
        radius?: number,
        place?: string
    };

    // handle form submission
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const formValues = Object.fromEntries(formData) as Record<keyof FormData, string>;

        // Convert numeric fields to numbers where necessary
        const parsedData: Partial<FormData> = {
            category: selectedCategory,
            city: formValues.city || "",
            state: formValues.state || "",
            postal_code: formValues.postal_code ? parseInt(formValues.postal_code, 10) : undefined,
            radius: formValues.radius ? parseInt(formValues.radius, 10) : undefined,
            place: formValues.place || undefined,
        };

        // Validation
        const errors: Partial<Record<keyof FormData, string>> = {};

        if (!parsedData.city?.trim()) errors.city = "City is required";
        if (!parsedData.state?.trim()) errors.state = "State is required";

        if (Object.keys(errors).length > 0) {
            console.error("Validation errors:", errors);
            return;
        }

        console.log("Form submitted:", parsedData);

        // Optionally reset form
        formRef.current?.reset();
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
