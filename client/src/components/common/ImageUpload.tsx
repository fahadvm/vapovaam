import React, { useState, useRef, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Upload, X, Check, Image as ImageIcon, ZoomIn, ZoomOut } from 'lucide-react';
import { clsx } from 'clsx';

interface Point {
    x: number;
    y: number;
}

interface Area {
    width: number;
    height: number;
    x: number;
    y: number;
}

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    aspectRatio?: number;
    label?: string;
    className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
    value,
    onChange,
    aspectRatio = 16 / 9,
    label = "Upload Image",
    className
}) => {
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                setSelectedFile(reader.result as string);
                setIsModalOpen(true);
            });
            reader.readAsDataURL(file);
        }
    };

    const createImage = (url: string): Promise<HTMLImageElement> =>
        new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener('load', () => resolve(image));
            image.addEventListener('error', (error) => reject(error));
            image.setAttribute('crossOrigin', 'anonymous');
            image.src = url;
        });

    const getCroppedImg = async (
        imageSrc: string,
        pixelCrop: Area
    ): Promise<Blob> => {
        const image = await createImage(imageSrc);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            throw new Error('No 2d context');
        }

        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    reject(new Error('Canvas is empty'));
                    return;
                }
                resolve(blob);
            }, 'image/jpeg', 0.95);
        });
    };

    const handleSave = async () => {
        if (!selectedFile || !croppedAreaPixels) return;

        try {
            setIsUploading(true);
            const croppedBlob = await getCroppedImg(selectedFile, croppedAreaPixels);

            // Upload to server
            const formData = new FormData();
            formData.append('image', croppedBlob, 'cropped-image.jpg');

            // Using fetch directly here to keep it self-contained, but ideally use apiClient
            // Assuming your API is at http://localhost:5000/api
            const response = await fetch('http://localhost:5000/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Upload failed');

            const data = await response.json();
            onChange(data.imageUrl);
            setIsModalOpen(false);
            setSelectedFile(null);
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className={className}>
            <label className="block text-sm font-medium text-zinc-400 mb-2">{label}</label>
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
            />

            {value ? (
                <div className="relative group aspect-video rounded-xl overflow-hidden bg-zinc-800 border border-white/10">
                    <img src={value} alt="Uploaded" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                        >
                            <Upload size={20} />
                        </button>
                        <button
                            onClick={() => onChange('')}
                            className="p-2 bg-red-500/80 hover:bg-red-500 rounded-lg text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full aspect-video rounded-xl border-2 border-dashed border-zinc-700 hover:border-blue-500 hover:bg-blue-500/5 transition-all flex flex-col items-center justify-center gap-2 text-zinc-500 hover:text-blue-500"
                >
                    <ImageIcon size={32} />
                    <span className="font-medium">Click to upload</span>
                </button>
            )}

            {/* Cropping Modal */}
            {isModalOpen && selectedFile && (
                <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
                    <div className="bg-zinc-900 w-full max-w-3xl rounded-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-4 border-b border-white/10 flex justify-between items-center">
                            <h3 className="font-bold text-white">Crop Image</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="relative flex-1 min-h-[400px] bg-black">
                            <Cropper
                                image={selectedFile}
                                crop={crop}
                                zoom={zoom}
                                aspect={aspectRatio}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                            />
                        </div>

                        <div className="p-4 border-t border-white/10 bg-zinc-900 space-y-4">
                            <div className="flex items-center gap-4">
                                <ZoomOut size={20} className="text-zinc-400" />
                                <input
                                    type="range"
                                    value={zoom}
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    aria-labelledby="Zoom"
                                    onChange={(e) => setZoom(Number(e.target.value))}
                                    className="flex-1 accent-blue-500 h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer"
                                />
                                <ZoomIn size={20} className="text-zinc-400" />
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-2.5 rounded-xl font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={isUploading}
                                    className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors flex items-center gap-2"
                                >
                                    {isUploading ? 'Uploading...' : 'Save & Upload'}
                                    {!isUploading && <Check size={18} />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
