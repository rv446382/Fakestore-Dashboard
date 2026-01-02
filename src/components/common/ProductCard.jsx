import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites, selectIsFavorite } from '../../redux/slices/favoritesSlice';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const isFavorite = useSelector(state => selectIsFavorite(state, product.id));

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isFavorite) {
            dispatch(removeFromFavorites(product.id));
        } else {
            dispatch(addToFavorites(product));
        }
    };

    return (
        <Link
            to={`/product/${product.id}`}
            className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-200"
        >
            <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                />
                <button
                    onClick={handleFavoriteClick}
                    className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
                    title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    <Heart
                        className={`h-5 w-5 ${isFavorite ? 'fill-red-600 text-red-600' : 'text-gray-400 hover:text-red-500'}`}
                    />
                </button>
            </div>

            <div className="p-5">
                <span className="inline-block px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-full capitalize mb-2">
                    {product.category}
                </span>

                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {product.title}
                </h3>

                <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.round(product.rating.rate) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'}`}
                        />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">
                        ({product.rating.count})
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-2xl font-bold text-gray-900">
                            ${product.price.toFixed(2)}
                        </span>
                        {product.price > 50 && (
                            <span className="text-sm text-green-600 font-medium ml-2">
                                Free Shipping
                            </span>
                        )}
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all duration-300">
                        View Details
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;