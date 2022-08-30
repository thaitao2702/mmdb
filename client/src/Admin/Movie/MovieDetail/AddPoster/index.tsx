import React, { useState, useLayoutEffect, useRef } from 'react';

import './styles.scss';
import { BtnIcon, InlineIcon } from 'shared/components/Icon';

interface IAddPosterProps {
  imageUrl?: string;
  onChange?: (...args: any[]) => any;
}

const AddPoster = ({ imageUrl: propsImageUrl, onChange }: IAddPosterProps) => {
  const [uploadImage, setUploadImage] = useState<any>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const previewUrlRef = useRef('');

  const [isSelectedImage, setIsSelectedImage] = useState(propsImageUrl ? true : false);
  const imageUrl = previewImageUrl ? previewImageUrl : propsImageUrl;

  useLayoutEffect(() => {
    if (!uploadImage) return;
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    const previewUrl = URL.createObjectURL(uploadImage);
    setPreviewImageUrl(previewUrl);
    previewUrlRef.current = previewUrl;
  }, [uploadImage]);

  const handlePostImageChange = (e: any) => {
    if (onChange) onChange(e.target.files[0]);
    setUploadImage(e.target.files[0]);
    setIsSelectedImage(true);
  };

  const unloadImage = () => {
    if (onChange) onChange(null);
    setUploadImage(null);
    setPreviewImageUrl('');
    setIsSelectedImage(false);
  };

  return (
    <div className="add-poster-ctn">
      <input
        type="file"
        name="image"
        id="movie-poster"
        multiple={false}
        accept="image/png, image/gif, image/jpeg"
        onChange={handlePostImageChange}
      />
      {isSelectedImage && imageUrl && <img className="preview-image" src={imageUrl} />}
      {isSelectedImage && imageUrl && (
        <BtnIcon onClick={unloadImage} className="close-icon" code="times"></BtnIcon>
      )}
      <label htmlFor="movie-poster" className={`${isSelectedImage ? 'hide' : ''}`}>
        <InlineIcon code="photo" _fontSize="96px" _color="#a6a6a6"></InlineIcon>
        <div className="movie-poster-title">Movie Poster</div>
      </label>
    </div>
  );
};

export default AddPoster;
