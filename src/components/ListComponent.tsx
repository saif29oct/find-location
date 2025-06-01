import * as React from "react";
import type {ListComponentType} from "../types/list-components";

const ListItems = ({selectedItem, listItems, onSelect}: ListComponentType) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");

    // Filtered items based on input value (case-insensitive)
    const filteredItems = React.useMemo(() => {
        if (inputValue.trim().length < 3) return [];

        return listItems.filter((item) =>
            item.name.toLowerCase().includes(inputValue.toLowerCase())
        );
    }, [listItems, inputValue]);

    // Find the selected item's name to display in the input
    React.useEffect(() => {
        const selected = listItems.find(item => item.id === selectedItem);
        if (selected) {
            setInputValue(selected.name);
        } else {
            setInputValue("");
        }
    }, [selectedItem, listItems]);

    return (
        <div className="relative">
            <input
                type="text"
                name="listItem"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsOpen(true)}
                onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Type to search..."
            />
            {inputValue.trim().length >= 3 && isOpen && (
                <ul className="absolute z-10 w-full mt-1 max-h-40 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg">
                    {filteredItems.map((item) => (
                        <li
                            key={item.id}
                            onClick={() => {
                                setInputValue(item.name);
                                setIsOpen(false);
                                onSelect(item);
                            }}
                            className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                            data-selectedItem={JSON.stringify(item.data)}
                        >
                            {item.name}
                        </li>
                    ))}
                    {filteredItems.length === 0 && (
                        <li className="px-4 py-2 text-gray-500">No items found</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default React.memo(ListItems);
