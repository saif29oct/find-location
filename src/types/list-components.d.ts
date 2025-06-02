export interface ListItem<T = object> {
    id: string;
    name: string;
    data: T;
}

export interface ListComponentType<T = object> {
    selectedItem: string;
    listItems: ListItem<T>[];
    onSelect: (listItem: ListItem<T>) => void;
}
