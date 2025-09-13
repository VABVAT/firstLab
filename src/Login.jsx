import React, { useState, useEffect } from 'react';
import { Eye, User, Info, Search, Download, Clock, HardDrive } from 'lucide-react';

const CybersecLab = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        fetchImages();
        fetchUserInfo();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/gallery');
            const data = await response.json();
            setImages(data.data || []);
        } catch (error) {
            console.error('Failed to fetch images:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserInfo = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/user/bob');
            const data = await response.json();
            setUserInfo(data);
        } catch (error) {
            console.error('Failed to fetch user info:', error);
        }
    };


    const ImageModal = ({ image, onClose }) => {
        if (!image) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-gray-800">{image.title}</h2>
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700 text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <img
                                    src={image.image}
                                    alt={image.title}
                                    className="w-full h-64 bg-gray-200 border border-gray-300 rounded object-cover"
                                />
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
                                    <p className="text-gray-600">{image.description}</p>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                                        <Clock className="w-4 h-4 mr-2" />
                                        Timestamp
                                    </h3>
                                    <p className="text-gray-600 font-mono text-sm">{image.timestamp}</p>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                                        <HardDrive className="w-4 h-4 mr-2" />
                                        File Size
                                    </h3>
                                    <p className="text-gray-600">{image.size} bytes</p>
                                </div>

                                <div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading Bob's Gallery...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <header className="bg-gray-800 shadow-lg">
                <div className="max-w-6xl mx-auto px-4 py-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <User className="w-8 h-8 text-blue-400" />
                            <div>
                                <h1 className="text-3xl font-bold text-white">Bob's Image Gallery</h1>

                            </div>
                        </div>

                        <div className="flex space-x-4">


                        </div>
                    </div>
                </div>
            </header>

            {/* User Info */}
            {userInfo && (
                <div className="max-w-6xl mx-auto px-4 py-6">
                    <div className="bg-gray-800 rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 text-blue-400">About Bob</h2>
                        <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                            <div>
                                <p><strong>Full Name:</strong> {userInfo.fullName}</p>
                                <p><strong>Username:</strong> {userInfo.username}</p>
                                <p><strong>Member Since:</strong> {userInfo.joinDate}</p>
                            </div>
                            <div>
                                <p><strong>Bio:</strong> {userInfo.bio}</p>

                            </div>
                        </div>
                    </div>
                </div>
            )}



            {/* Image Gallery */}
            <main className="max-w-6xl mx-auto px-4 pb-12">
                <h2 className="text-2xl font-semibold mb-6 text-gray-200">Gallery ({images.length} images)</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images
                        .filter((image) => image.id !== 4)
                        .map((image) => (
                            <div
                                key={image.id}
                                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-gray-700"
                                onClick={() => setSelectedImage(image)}
                            >
                                <div className="relative">
                                    <img
                                        src={image.image}
                                        alt={image.title}
                                        className="w-full h-48 bg-gray-700 border-b border-gray-600 object-cover"
                                    />
                                    <div className="absolute top-2 right-2">
                                        <Eye className="w-5 h-5 text-white bg-black bg-opacity-50 rounded-full p-1" />
                                    </div>
                                </div>

                                <div className="p-4">
                                    <h3 className="font-semibold text-lg text-white mb-2">{image.title}</h3>
                                    <p className="text-gray-400 text-sm mb-3">{image.description}</p>

                                    <div className="flex justify-between items-center text-xs text-gray-500">
                                        <span>ID: {image.id}</span>
                                        <span>{image.size} bytes</span>
                                    </div>
                                </div>
                            </div>
                        ))}

                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 mt-12 py-6">
                <div className="max-w-6xl mx-auto px-4 text-center text-gray-400">
                    <p>Cybersecurity Lab - Image Analysis Challenge</p>
                    <p className="text-sm mt-2">Find the hidden flag to complete the challenge!</p>
                </div>
            </footer>

            {selectedImage && (
                <ImageModal
                    image={selectedImage}
                    onClose={() => setSelectedImage(null)}
                />
            )}
        </div>
    );
};

export default CybersecLab;