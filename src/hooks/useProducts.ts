import { useState, useEffect } from "react";
import { products as staticProducts } from "../data/menuItems";

// Using a simplified Product type to match the frontend expectations
export type Product = {
    id: number;
    name: string;
    description?: string;
    price: number;
    image_url: string;
    rating: number;
    tags: string[];
    is_available?: boolean;
};

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // We simulate a tiny network delay so the loading states don't flash instantly
        const timer = setTimeout(() => {
            // Ensure types match expected shape in the application
            // Database originally ordered by price ascending
            const sortedProducts = [...staticProducts].sort((a, b) => (a.price || 0) - (b.price || 0));
            setProducts(sortedProducts as Product[]);
            setLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    return { products, loading, error };
}
