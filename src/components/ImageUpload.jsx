import React, { useState } from 'react';

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [isImageValid, setIsImageValid] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const isValid = file.type === 'image/jpeg' || file.type === 'image/png';
      const isSizeValid = file.size <= 500000; // 500KB max size
      if (isValid && isSizeValid) {
        setIsImageValid(true);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setIsImageValid(false);
      }
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setIsImageValid(true);
  };

  return (
    <>
      {!image && (
        <div
          className="border-2 border-dashed rounded-lg w-96 flex flex-col items-center justify-center relative gap-4 bg-[hsl(248,70%,10%)] cursor-pointer"
          style={{ borderColor: isImageValid ? '#ccc' : 'hsl(7,86%,67%)' }}
          onMouseEnter={() => setIsHovered(true)}
          onClick={() => document.getElementById('fileInput').click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            handleFileChange({ target: { files: [file] } });
          }}
        >
          {image ? (
            <>
              <img
                src={image}
                alt="Avatar"
                className="w-20 h-20 object-cover rounded-xl mt-4"
              />
              <div className="flex gap-4 mb-4">
                <button
                  onClick={handleRemoveImage}
                  className="bg-gray-600 text-white py-2 px-2 rounded-md hover:bg-gray-500 transition-colors text-sm"
                >
                  Remove Image
                </button>
                <label
                  htmlFor="fileInput"
                  className="bg-gray-600 text-white py-2 px-2 rounded-md hover:bg-gray-500 transition-colors text-sm"
                >
                  Charge Image
                </label>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/jpeg, image/png"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </>
          ) : (
            <>
              <img
                src="/src/assets/images/icon-upload.svg"
                alt="Upload icon"
                className="w-10 h-10 object-contain"
              />
              <p className="text-sm text-gray-400">
                Drag & Drop your image here <br /> or click to upload
              </p>
            </>
          )}
        </div>
      )}

      {/* <div className="flex items-center mt-2 w-96">
        <img
          src="/src/assets/images/icon-info.svg"
          alt="info icon"
          className="w-4 h-4 mr-2"
        />
        {/* <p className={`text-sm ${isImageValid ? 'text-gray-400' : 'text-[hsl(7,86%,67%)]'}`}>
          Upload your photo (JPG or PNG, max size: 500KB).
        </p> 
      </div> */}
    </>
  );
};

export default UploadImage;
