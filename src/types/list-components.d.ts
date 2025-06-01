export interface ListItem {
    id: string;
    name: string;
    data: { };
}

export interface ListComponentType {
    selectedItem: string;
    listItems: ListItem[];
    onSelect: (listItem: ListItem) => void;
}
