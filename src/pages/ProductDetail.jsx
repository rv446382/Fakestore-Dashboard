import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ChevronLeft, ShoppingBag, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';

// Redux
import { fetchProductById } from '../redux/thunks/productThunks';
import { addToFavorites, removeFromFavorites, selectIsFavorite } from '../redux/slices/favoritesSlice';
import { setSelectedProduct, clearSelectedProduct } from '../redux/slices/productSlice';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    // Fetch product data
    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }
        return () => {
            dispatch(clearSelectedProduct());
        };
    }, [id, dispatch]);

    const product = useSelector(state => state.products.selectedProduct);
    const status = useSelector(state => state.products.status);
    const isFavorite = useSelector(state => selectIsFavorite(state, parseInt(id)));

    if (status === 'loading') {
        return <LoadingSpinner />;
    }

    if (status === 'failed' || !product) {
        return <ErrorMessage message="Product not found" />;
    }

    const handleAddToFavorites = () => {
        if (isFavorite) {
            dispatch(removeFromFavorites(product.id));
        } else {
            dispatch(addToFavorites(product));
        }
    };

    const handleAddToCart = () => {
        setIsAddingToCart(true);
        setTimeout(() => {
            setIsAddingToCart(false);
            alert(`${product.title} added to cart!`);
        }, 1000);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: product.title,
                text: `Check out ${product.title} on FakeStore!`,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    const renderRating = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <Star
                    key={i}
                    className={`h-5 w-5 ${i <= Math.round(product.rating.rate) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'}`}
                />
            );
        }
        return stars;
    };

    return (
        <div className="max-w-7xl mx-auto">
            <nav className="mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                    <ChevronLeft size={20} />
                    Back to Products
                </button>
            </nav>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                    <div className="space-y-4">
                        <div className="aspect-square overflow-hidden rounded-xl bg-gray-100">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-contain p-8"
                            />
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={handleAddToFavorites}
                                className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors ${isFavorite ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                            >
                                <Heart className={isFavorite ? 'fill-red-600' : ''} />
                                {isFavorite ? 'Saved' : 'Save'}
                            </button>
                            <button
                                onClick={handleShare}
                                className="flex-1 py-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                            >
                                <Share2 />
                                Share
                            </button>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium capitalize">
                            {product.category}
                        </span>

                        <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                {renderRating()}
                                <span className="ml-2 text-gray-600">{product.rating.rate}</span>
                            </div>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-600">{product.rating.count} reviews</span>
                        </div>

                        <div className="space-y-2">
                            <div className="text-4xl font-bold text-gray-900">
                                ${product.price.toFixed(2)}
                            </div>
                            <p className="text-green-600 font-medium">In stock • Ready to ship</p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold text-gray-900">Description</h3>
                            <p className="text-gray-600 leading-relaxed">{product.description}</p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold text-gray-900">Quantity</h3>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-gray-300 rounded-lg">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-900"
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-2 w-16 text-center">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-4 py-2 text-gray-600 hover:text-gray-900"
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="text-gray-600">
                                    Total: <span className="text-2xl font-bold text-gray-900 ml-2">
                                        ${(product.price * quantity).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                onClick={handleAddToCart}
                                disabled={isAddingToCart}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isAddingToCart ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        Adding...
                                    </>
                                ) : (
                                    <>
                                        <ShoppingBag />
                                        Add to Cart
                                    </>
                                )}
                            </button>
                            <button className="flex-1 bg-gray-900 hover:bg-black text-white py-4 rounded-lg font-semibold transition-colors">
                                Buy Now
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <Truck className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Free Shipping</p>
                                    <p className="text-sm text-gray-600">On orders over $50</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <RotateCcw className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">30-Day Returns</p>
                                    <p className="text-sm text-gray-600">Easy returns policy</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <Shield className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Secure Payment</p>
                                    <p className="text-sm text-gray-600">100% secure</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;