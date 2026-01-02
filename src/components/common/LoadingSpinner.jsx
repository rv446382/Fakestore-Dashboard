import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ fullScreen = false }) => {
    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto" />
                    <p className="mt-4 text-gray-600 font-medium">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
                <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto" />
                <p className="mt-4 text-gray-600 font-medium">Loading products...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;