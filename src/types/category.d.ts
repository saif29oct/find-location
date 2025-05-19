export interface CategoryContextType {
    currentCategory: string;
    categories: string[];
    onSelect: (category: string) => void;
}