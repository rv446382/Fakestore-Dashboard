import React, { useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Filter, X } from 'lucide-react';
import { debounce } from 'lodash';

// Components
import ProductCard from '../components/common/ProductCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';


// Redux
import { fetchProducts } from '../redux/thunks/productThunks';
import { setSearchQuery, setCategory, setSortBy, resetFilters } from '../redux/slices/filterSlice';
import { selectAllProducts, selectProductStatus, selectProductError } from '../redux/slices/productSlice';
import { selectFilters } from '../redux/slices/filterSlice';
import { fetchCategories } from '../redux/thunks/productThunks';

const ProductListing = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);
    const status = useSelector(selectProductStatus);
    const error = useSelector(selectProductError);
    const filters = useSelector(selectFilters);
    const [showFilters, setShowFilters] = React.useState(false);

    // Fetch products and categories on mount
    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories());
    }, [dispatch]);

    // Debounced search
    const debouncedSearch = useCallback(
        debounce((query) => {
            dispatch(setSearchQuery(query));
        }, 300),
        [dispatch]
    );

    const handleSearch = (e) => {
        debouncedSearch(e.target.value);
    };

    const handleCategoryChange = (category) => {
        dispatch(setCategory(category));
    };

    const handleSortChange = (sortBy) => {
        dispatch(setSortBy(sortBy));
    };

    const handleResetFilters = () => {
        dispatch(resetFilters());
    };

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let filtered = [...products];

        // Apply search filter
        if (filters.searchQuery) {
            filtered = filtered.filter(product =>
                product.title.toLowerCase().includes(filters.searchQuery.toLowerCase())
            );
        }

        // Apply category filter
        if (filters.category !== 'all') {
            filtered = filtered.filter(product => product.category === filters.category);
        }

        // Apply sorting
        if (filters.sortBy === 'price-low-high') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (filters.sortBy === 'price-high-low') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (filters.sortBy === 'title-asc') {
            filtered.sort((a, b) => a.title.localeCompare(b.title));
        }

        return filtered;
    }, [products, filters]);

    if (status === 'loading') {
        return <LoadingSpinner />;
    }

    if (status === 'failed') {
        return <ErrorMessage message={error || 'Failed to load products'} />;
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                    <p className="text-gray-600 mt-2">
                        Showing {filteredProducts.length} of {products.length} products
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        {showFilters ? <X size={20} /> : <Filter size={20} />}
                        <span>Filters</span>
                    </button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:w-1/4`}>
                    <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Search Products
                            </label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search by title..."
                                    defaultValue={filters.searchQuery}
                                    onChange={handleSearch}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <div className="space-y-2">
                                <button
                                    onClick={() => handleCategoryChange('all')}
                                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${filters.category === 'all' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                                >
                                    All Categories
                                </button>
                                {filters.categories.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => handleCategoryChange(category)}
                                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors capitalize ${filters.category === category ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Sort By
                            </label>
                            <select
                                value={filters.sortBy}
                                onChange={(e) => handleSortChange(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            >
                                <option value="default">Default</option>
                                <option value="price-low-high">Price: Low to High</option>
                                <option value="price-high-low">Price: High to Low</option>
                                <option value="title-asc">Title: A to Z</option>
                            </select>
                        </div>

                        {(filters.searchQuery || filters.category !== 'all' || filters.sortBy !== 'default') && (
                            <button
                                onClick={handleResetFilters}
                                className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                                Reset Filters
                            </button>
                        )}
                    </div>
                </div>

                <div className="lg:w-3/4">
                    {filteredProducts.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                            <div className="text-gray-400 mb-4">
                                <Search size={48} className="mx-auto" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                            {(filters.searchQuery || filters.category !== 'all') && (
                                <button
                                    onClick={handleResetFilters}
                                    className="mt-4 px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    Reset filters
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductListing;