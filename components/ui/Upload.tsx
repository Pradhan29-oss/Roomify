<<<<<<< HEAD
import React, { useState, useRef, useEffect } from 'react'
=======
import React, { useState, useEffect } from 'react'
>>>>>>> b4887eb (implement coderabbit suggested fixes)
import { useOutletContext } from "react-router";
import { CheckCircle2, ImageIcon, UploadIcon } from "lucide-react";
import { PROGRESS_STEP, PROGRESS_INTERVAL_MS, REDIRECT_DELAY_MS } from "../../lib/constants";

interface UploadProps {
    onComplete?: (base64: string) => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png'];

const Upload = ({ onComplete }: UploadProps) => {
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [progress, setProgress] = useState(0)
<<<<<<< HEAD
    const [error, setError] = useState<string | null>(null)

    const { isSignedIn } = useOutletContext<AuthContext>();

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const processFile = (selectedFile: File) => {
        if (!isSignedIn) return;
        setFile(selectedFile);
        setProgress(0);
=======
    const [error, setError] = useState<string | null>(null);

    const { isSignedIn } = useOutletContext<AuthContext>();

    useEffect(() => {
        if (!file || !isSignedIn) return;

        let intervalId: ReturnType<typeof setInterval>;
        let timeoutId: ReturnType<typeof setTimeout>;
        let active = true;
>>>>>>> b4887eb (implement coderabbit suggested fixes)

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            if (!active) return;
            const base64 = e.target?.result as string;

            let currentProgress = 0;
<<<<<<< HEAD
            intervalRef.current = setInterval(() => {
                currentProgress += PROGRESS_STEP;
                if (currentProgress >= 100) {
                    setProgress(100);
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                    }
                    timeoutRef.current = setTimeout(() => {
                        onComplete?.(base64);
=======
            intervalId = setInterval(() => {
                if (!active) {
                    clearInterval(intervalId);
                    return;
                }
                currentProgress += PROGRESS_STEP;
                if (currentProgress >= 100) {
                    setProgress(100);
                    clearInterval(intervalId);
                    timeoutId = setTimeout(() => {
                        if (active) onComplete?.(base64);
>>>>>>> b4887eb (implement coderabbit suggested fixes)
                    }, REDIRECT_DELAY_MS);
                } else {
                    setProgress(currentProgress);
                }
            }, PROGRESS_INTERVAL_MS);
        };
        reader.readAsDataURL(file);

        return () => {
            active = false;
            reader.abort();
            if (intervalId) clearInterval(intervalId);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [file, isSignedIn, onComplete]);

    const validateFile = (file: File) => {
        const allowedExtensions = ['jpg', 'jpeg', 'png'];
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        const isValidType = ALLOWED_TYPES.includes(file.type);
        const isValidExtension = fileExtension && allowedExtensions.includes(fileExtension);

        if (!isValidType && !isValidExtension) {
            return "Please upload a JPG or PNG file.";
        }
        if (file.size > MAX_FILE_SIZE) {
            return "File size must be less than 10MB.";
        }
        return null;
    };

    const processFile = (selectedFile: File) => {
        if (!isSignedIn) return;
        const allowedTypes = new Set(["image/jpeg", "image/png"]);
        const maxSizeBytes = 10 * 1024 * 1024;
          if (!allowedTypes.has(selectedFile.type) || selectedFile.size > maxSizeBytes) {
                return;
          }
        setFile(selectedFile);
        setProgress(0);
        setError(null);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        if (isSignedIn) {
            setIsDragging(true);
        }
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (!isSignedIn) return;

        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles && droppedFiles.length > 0) {
            const file = droppedFiles[0];
<<<<<<< HEAD

            // Validate file type
            if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                setError('Only JPG and PNG files are allowed');
                return;
            }

            // Validate file size (10MB max)
            if (file.size > 10 * 1024 * 1024) {
                setError('File size must not exceed 10MB');
                return;
            }

            setError(null);
=======
            const validationError = validateFile(file);
            if (validationError) {
                setError(validationError);
                return;
            }
>>>>>>> b4887eb (implement coderabbit suggested fixes)
            processFile(file);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (selectedFiles && selectedFiles.length > 0) {
            const file = selectedFiles[0];
<<<<<<< HEAD

            // Validate file type
            if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                setError('Only JPG and PNG files are allowed');
                return;
            }

            // Validate file size (10MB max)
            if (file.size > 10 * 1024 * 1024) {
                setError('File size must not exceed 10MB');
                return;
            }

            setError(null);
=======
            const validationError = validateFile(file);
            if (validationError) {
                setError(validationError);
                return;
            }
>>>>>>> b4887eb (implement coderabbit suggested fixes)
            processFile(file);
        }
    };

    return (
        <div className="upload">
            {file ? (
                <div className="upload-status">
                    <div className="status-content">
                        <div className="status-icon">
                            {progress === 100 ? (
                                <CheckCircle2 className="check" />
                            ) : (
                                <ImageIcon className="image" />
                            )}
                        </div>
                        <h3>{file.name}</h3>
                        <div className="progress">
                            <div className="bar" style={{ width: `${progress}%` }} />
                            <p className="status-text">
                                {progress < 100 ? 'Analyzing Floor Plan...' : 'Redirecting...'}
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div 
                    className={`dropzone ${isDragging ? 'is-dragging' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        className="drop-input"
                        accept=".jpg,.jpeg,.png"
                        disabled={!isSignedIn}
                        onChange={handleFileChange}
                    />

                    <div className="drop-content">
                        <div className="drop-icon">
                            <UploadIcon size={20} />
                        </div>

                        <div className="drop-text">
                            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                            {isSignedIn ? (
                                <p>click to upload or just drag and drop</p>
                            ) : (
                                <p>Please sign in to upload</p>
                            )}
                        </div>

                        {error && (
                            <div className="error-message" style={{ color: 'red', marginTop: '10px' }}>
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Upload;