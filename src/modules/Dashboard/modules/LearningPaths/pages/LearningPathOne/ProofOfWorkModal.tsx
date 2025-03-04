// ProofOfWorkModal.tsx
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from "./ProofOfWorkModal.module.css";
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

interface ProofOfWorkModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentId: string;
  existingProofUrl?: string;
  onSubmit: (proofUrl: string) => Promise<void>;
}

const ProofOfWorkModal = ({ 
  isOpen, 
  onClose, 
  contentId,
  existingProofUrl,
  onSubmit 
}: ProofOfWorkModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(existingProofUrl || '');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string>('');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    console.log(selectedFile,'selectedFile')
    if (selectedFile) {
      setFile(selectedFile);
      // Create preview for image files
      if (selectedFile.type.startsWith('image/')) {
        const previewUrl = URL.createObjectURL(selectedFile);
        setPreview(previewUrl);
      }
      await handleUpload(selectedFile);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/pdf': ['.pdf']
    },
    maxSize: 5242880, // 5MB
    multiple: false
  });

  const s3Client = new S3Client({
    region: 'ap-northeast-1', // e.g., 'us-west-2'
    credentials: {
      accessKeyId: import.meta.env.VITE_AWS_ACCESSKEY,
      secretAccessKey: import.meta.env.VITE_AWS_ACCESSSECRET,
    },
  });

const handleUpload = async (fileToUpload: File) => {
  console.log('triggered')
  try {
    setIsUploading(true);

    const fileKey = `uploads/${Date.now()}-${fileToUpload.name}`;

    const params = {
      Bucket: 'mulearntestbucket',
      Key: fileKey,
      Body: fileToUpload.stream(), // Convert file to a ReadableStream
      ContentType: fileToUpload.type,
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    const url = `https://${params.Bucket}.s3.${s3Client.config.region}.amazonaws.com/${fileKey}`;
    setUploadedUrl(url);
    setIsUploading(false);
    return url;
  } catch (error) {
    console.error('Upload error:', error);
    setIsUploading(false);
    throw error;
  }
};


  const handleSubmit = async () => {
    if (uploadedUrl) {
      await onSubmit(uploadedUrl);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Upload Proof of Work</h2>
          <button onClick={onClose} className={styles.closeButton}>×</button>
        </div>

        <div 
          {...getRootProps()} 
          className={`${styles.dropzone} ${isDragActive ? styles.dragActive : ''}`}
        >
          <input {...getInputProps()} />
          {isUploading ? (
            <div className={styles.uploadingState}>
              <div className={styles.loader}></div>
              <p>Uploading proof of work...</p>
            </div>
          ) : (
            <>
              {preview ? (
                <div className={styles.previewContainer}>
                  {preview.endsWith('.pdf') ? (
                    <div className={styles.pdfPreview}>PDF File</div>
                  ) : (
                    <img src={preview} alt="Preview" className={styles.preview} />
                  )}
                </div>
              ) : (
                <div className={styles.dropzoneContent}>
                  <p>Drag & drop your file here, or click to select</p>
                  <p className={styles.helperText}>
                    Accepted files: Images (PNG, JPG) and PDF up to 5MB
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        <p className={styles.helperText}>
          Proof of work can be screenshots, documents, or any evidence of task completion.
        </p>

        <div className={styles.modalFooter}>
          <button 
            onClick={handleSubmit}
            disabled={isUploading || !uploadedUrl}
            className={styles.submitButton}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProofOfWorkModal;