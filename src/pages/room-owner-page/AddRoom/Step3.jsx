import React from "react";
import { Camera, Upload, X, Video, Loader2 } from "lucide-react"; // Loader2 add kiya

const Step3 = ({
  images,
  setImages,
  previews,
  setPreviews,
  setVideo,
  uploading,
  progress,
  setStep,
}) => {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
    setPreviews([...previews, ...files.map((f) => URL.createObjectURL(f))]);
  };

  return (
    <div className="fade-in">
      <h3>
        <Camera size={20} /> Photos & Video
      </h3>

      <div className="upload-section">
        <label className="upload-card">
          <Upload size={30} />
          <span>Upload Room Photos</span>
          <input
            type="file"
            multiple
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
      </div>

      <div className="previews">
        {previews.map((p, i) => (
          <div key={i} className="preview-item">
            <img src={p} alt="preview" className="thumb" />
            <X
              className="remove-icon"
              size={18}
              onClick={() => {
                setImages(images.filter((_, idx) => idx !== i));
                setPreviews(previews.filter((_, idx) => idx !== i));
              }}
            />
          </div>
        ))}
      </div>

      <div className="input-box" style={{ marginTop: "20px" }}>
        <label>
          <Video size={18} /> Tour Video (Optional)
        </label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
        />
      </div>

      {uploading && (
        <div className="progress-wrapper" style={{ marginTop: "15px" }}>
          <div className="progress-text">
            <span>Uploading Assets</span>
            <span>{progress}%</span>
          </div>
          <div className="progress-bar-container">
            <div
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="btn-row">
        <button
          type="button"
          onClick={() => setStep(2)}
          className="btn-prev"
          disabled={uploading}
        >
          Back
        </button>
        <button type="submit" className="btn-publish" disabled={uploading}>
          {uploading ? (
            <>
              <Loader2 className="spinner" size={18} />
              <span>Publishing...</span>
            </>
          ) : (
            "Publish Listing"
          )}
        </button>
      </div>
    </div>
  );
};
export default Step3;
