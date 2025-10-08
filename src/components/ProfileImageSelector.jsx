import React, { useRef, useState } from "react";
import { LuTrash, LuUpload, LuUser } from "react-icons/lu";

const ProfileImageSelector = ({ image, setImage, preview, setPreview }) => {
  const [previewUrl, setPreviewUrl] = useState("");
  const inputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) setImage(file);
    const preview = URL.createObjectURL(file);

    if (preview) setPreview(preview);
    setPreviewUrl(preview);
  };

  const handleImageRemove = () => {
    setImage(null);
    setPreview(null);
    setPreviewUrl(null);
  };

  const choseFile = () => {
    inputRef.current.click();
  };
  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={handleImageChange}
      />
      {!image ? (
        <div className="w-20 h-20 flex items-center justify-center bg-orange-50 rounded-full relative cursor-pointer">
          <LuUser className="text-4xl text-orange-400" />
          <button
            className="size-8 flex items-center justify-center bg-linear-to-r from-orange-500/85 to-orange-600 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer "
            onClick={choseFile}
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative ">
          <img
            src={preview || previewUrl}
            alt="profile photo"
            className="size-20 rounded-full object-cover "
          />
          <button
            type="button"
            className="size-8 flex justify-center items-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer"
            onClick={handleImageRemove}
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileImageSelector;
