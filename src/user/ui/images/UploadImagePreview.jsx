import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import imageCompression from 'browser-image-compression';


const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  marginTop: 16,
};

const dropzoneStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 150,
  height: 150,
  borderRadius: '10%',
  border: '2px dashed #ccc',
  position: 'relative',
  cursor: 'pointer',
};

const imgStyle = {
  display: 'block',
  width: '100%',
  height: '100%',
  borderRadius: '10%',
};

const descriptionStyle = {
  fontSize: '12px',
  color: '#888',
  marginTop: 8,
};

export const UploadImagePreview = ({ onInputChange, defaultImageUrl = 'https://res.cloudinary.com/dsuvpnp9u/image/upload/v1736440720/tli4lpfen5fucruno3l2.jpg' }) => {
  const [file, setFile] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/jpeg': [], 'image/jpg': [], 'image/png': [], 'image/gif': [] },
    maxSize: 3 * 1024 * 1024, // 3 MB
    multiple: false,
    onDrop: async (acceptedFiles) => {
      const [file] = acceptedFiles;
      if (!file) return;

      const options = {
        maxWidthOrHeight: 300,
        fileType: 'image/webp',
      };

      const compressedFile = await imageCompression(file, options);
      const preview = URL.createObjectURL(compressedFile);

      setFile(Object.assign(compressedFile, { preview }));
      onInputChange({ target: { name: 'img', value: compressedFile } });
    },
  });

  useEffect(() => {
    // Establecer la imagen predeterminada al inicio
    fetch(defaultImageUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const defaultFile = new File([blob], 'default-image.jpg', { type: blob.type });
        setFile(Object.assign(defaultFile, { preview: defaultImageUrl }));
        onInputChange({ target: { name: 'img', value: defaultFile } });
      });

    return () => {
      if (file && file.preview !== defaultImageUrl) URL.revokeObjectURL(file.preview);
    };
  }, []);

  return (
    <div style={containerStyle}>
      <div {...getRootProps({ className: 'dropzone' })} style={dropzoneStyle}>
        {file?.preview ? (
          <img
            src={file.preview}
            style={imgStyle}
            alt="preview"
          />
        ) : (
          <CameraAltIcon style={{ fontSize: 48, color: '#ccc' }} />
        )}
        <input {...getInputProps()} />
      </div>
      <p
        style={{
          ...descriptionStyle,
          fontWeight: 'Nunito, sans-serif',
          color: 'black',
        }}
      >
        Sube *.jpeg, *.jpg, *.png, *.gif, máximo de 3 MB
      </p>
    </div>
  );
};
