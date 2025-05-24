export interface Category {
    id: string;
    name: string;
    label: string;
}

export interface CategoryContextType {
    currentCategory: string;
    categories: Category[];
    onSelect: (category: string) => void;
}
