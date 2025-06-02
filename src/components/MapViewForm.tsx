import * as React from "react";
import ListComponent from "./ListComponent.tsx";
import {useRef, useState} from "react";
import type {ListComponentType, ListItem} from "../types/list-components";
import {useCategories} from "../hooks/useFetchLocationCategories.ts";
import {useDistricts} from "../hooks/useFetchDistricts.ts";


// Define specific types for Category and District
type Category = {
    id: string;
    name: string;
    data: {
        label: string;
    };
};

type District = {
    id: string;
    name: string;
    data: {
        latitude: number;
        longitude: number;
        // Add other relevant fields for district
    };
};

export default function MapViewForm() {
    const [selectedCategory, setSelectedCategory] = useState<ListItem<Category> | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<ListItem<District> | null>(null);

    const csvUrl = `/data/places_categories.csv`;
    const districtsUrl = `/data/bangladesh_districts.csv`;

    const {categories} = useCategories(csvUrl);
    const {districts} = useDistricts(districtsUrl);

    const formRef = useRef<HTMLFormElement | null>(null);


    type FormData = {
        category: string,
        city: string,
        latitude: string,
        longitude: string,
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
            category: selectedCategory?.id || "",
            city: selectedDistrict?.name || formValues.city || "",
            latitude: selectedDistrict?.data?.latitude ?? 0,
            longitude: selectedDistrict?.data?.longitude ?? 0,

            radius: formValues.radius ? parseInt(formValues.radius, 10) : undefined,
            place: formValues.place || undefined,
        };

        console.log("Parsed form values:", parsedData)

        // Validation
        const errors: Partial<Record<keyof FormData, string>> = {};

        if (!parsedData.city?.trim()) errors.city = "City is required";
        if (!selectedCategory) errors.category = "Category is required";

        if (Object.keys(errors).length > 0) {
            console.error("Validation errors:", errors);
            return;
        }

        console.log("Form submitted:", parsedData);
        console.log("Selected category details:", selectedCategory);
        console.log("Selected district details:", selectedDistrict);

        // invoke  usePlaceMatch();

        // Optionally reset form
        if (formRef.current) {
            formRef.current.reset();
        }
        setSelectedCategory(null);
        setSelectedDistrict(null);
    };

    const handleCategorySelect = (category: ListItem<Category>) => {
        setSelectedCategory(category);
    };

    const handleDistrictSelect = (district: ListItem<District>) => {
        setSelectedDistrict(district);
    };

    const categoryListProps: ListComponentType<Category> = {
        selectedItem: selectedCategory?.id || "",
        listItems: categories as ListItem<Category>[], // Ensure this is typed correctly
        onSelect: (category: ListItem<Category>) => handleCategorySelect(category), // Correctly typed onSelect
    };

    const districtListProps: ListComponentType<District> = {
        selectedItem: selectedDistrict?.id || "",
        listItems: districts as ListItem<District>[], // Ensure this is typed correctly
        onSelect: (district: ListItem<District>) => handleDistrictSelect(district), // Correctly typed onSelect
    };


    return (
        <form
            className="grid grid-cols-1 gap-4"
            ref={formRef}
            onSubmit={handleSubmit}
        >
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 text-left mb-1">Select Location Category</label>
                <ListComponent {...categoryListProps} />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 text-left mb-1">Select Your District</label>
                <ListComponent {...districtListProps} />
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
