import * as React from "react";
import ListComponent from "./ListComponent.tsx";
import {useEffect, useRef, useState} from "react";
import type {ListComponentType, ListItem} from "../types/list-components";
import {useCategories} from "../hooks/useFetchLocationCategories.ts";
import {useDistricts} from "../hooks/useFetchDistricts.ts";
import {useMapData} from "../hooks/useMapData.ts";
import type {IMapData, IMapState} from "../types/map";

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
    };
};

export default function MapViewForm() {
    const [selectedCategory, setSelectedCategory] = useState<ListItem<Category> | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<ListItem<District> | null>(null);
    const [locations, setLocations] = useState<IMapData[]>([]);
    const [mapState, setMapState] = useState<IMapState | null>({
        latitude: 23.78159,
        longitude: 90.40050,
        radius: 3000,
        categories: 13000,
        zoom: 14
    });

    const csvUrl = `/data/places_categories.csv`;
    const districtsUrl = `/data/bangladesh_districts.csv`;

    const {categories} = useCategories(csvUrl);
    const {districts} = useDistricts(districtsUrl);
    const formRef = useRef<HTMLFormElement | null>(null);

    // Call useMapData at the top level
    const mapData = useMapData(mapState);

    useEffect(() => {
        if (mapData && mapData.length > 0) {
            console.log(mapData);
            setLocations(mapData);
        }
    }, [mapData]);

    type FormData = {
        category: string,
        city: string,
        latitude: string,
        longitude: string,
        radius?: number,
        place?: string
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const formValues = Object.fromEntries(formData) as Record<keyof FormData, string>;

        const parsedData: Partial<FormData> = {
            category: selectedCategory?.id || "",
            city: selectedDistrict?.name || formValues.city || "",
            latitude: selectedDistrict?.data?.latitude ?? 0,
            longitude: selectedDistrict?.data?.longitude ?? 0,
            radius: formValues.radius ? parseInt(formValues.radius, 10) : undefined,
            place: formValues.place || undefined,
        };

        const errors: Partial<Record<keyof FormData, string>> = {};

        if (!parsedData.latitude || !parsedData.longitude) {
            errors.latitude = "Latitude is required";
            errors.longitude = "Longitude is required";
            return;
        }

        if (Object.keys(errors).length > 0) {
            console.error("Validation errors:", errors);
            return;
        }

        console.log('Form data', parsedData);

        setMapState({
            latitude: parseFloat(parsedData.latitude),
            longitude: parseFloat(parsedData.longitude)
        });

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
        listItems: categories as ListItem<Category>[],
        onSelect: (category: ListItem<Category>) => handleCategorySelect(category),
    };

    const districtListProps: ListComponentType<District> = {
        selectedItem: selectedDistrict?.id || "",
        listItems: districts as ListItem<District>[],
        onSelect: (district: ListItem<District>) => handleDistrictSelect(district),
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
