import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

import ProductCard from '../components/common/ProductCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

import { selectFavorites } from '../redux/slices/favoritesSlice';
import { removeFromFavorites, clearFavorites } from '../redux/slices/favoritesSlice';

const Favorites = () => {
    const dispatch = useDispatch();
    const favorites = useSelector(selectFavorites);
    const [isClearing, setIsClearing] = React.useState(false);

    const handleRemoveFromFavorites = (productId) => {
        dispatch(removeFromFavorites(productId));
    };

    const handleClearAll = () => {
        setIsClearing(true);
        setTimeout(() => {
            dispatch(clearFavorites());
            setIsClearing(false);
        }, 500);
    };

    const calculateTotal = () => {
        return favorites.reduce((total, product) => total + product.price, 0).toFixed(2);
    };

    if (favorites.length === 0) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-red-50 rounded-full mb-6">
                        <Heart className="h-12 w-12 text-red-400" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Favorites is Empty</h1>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                        You haven't added any products to your favorites yet. Start exploring our collection!
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        <ShoppingBag size={20} />
                        Start Shopping
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
                    <p className="text-gray-600 mt-2">
                        {favorites.length} {favorites.length === 1 ? 'item' : 'items'} • Total: ${calculateTotal()}
                    </p>
                </div>

                <div className="flex gap-3">
                    <Link
                        to="/"
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                        Continue Shopping
                    </Link>
                    <button
                        onClick={handleClearAll}
                        disabled={isClearing}
                        className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isClearing ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                                Clearing...
                            </>
                        ) : (
                            <>
                                <Trash2 size={18} />
                                Clear All
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favorites.map(product => (
                    <div key={product.id} className="relative group">
                        <ProductCard product={product} />
                        <button
                            onClick={() => handleRemoveFromFavorites(product.id)}
                            className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                            title="Remove from favorites"
                        >
                            <Heart className="h-5 w-5 fill-red-600 text-red-600" />
                        </button>
                    </div>
                ))}
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
                <div className="max-w-md mx-auto text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Ready to purchase your favorites?
                    </h3>
                    <p className="text-gray-600 mb-6">
                        All your favorite items are saved here. Add them to cart when you're ready to checkout.
                    </p>
                    <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold shadow-lg hover:shadow-xl">
                        Add All to Cart (${calculateTotal()})
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Favorites;