import React, { useState, useEffect } from "react";
import { Camera, Upload, X, Video, Loader2, Play } from "lucide-react";

const Step3 = ({
  images,
  setImages,
  previews,
  setPreviews,
  video,
  setVideo,
  uploading,
  progress,
  setStep,
}) => {
  const [videoUrl, setVideoUrl] = useState(null);

  // 1. Jab bhi video file change ho, uska temporary URL banao taaki player mein dikhe
  useEffect(() => {
    if (!video) {
      setVideoUrl(null);
      return;
    }
    const url = URL.createObjectURL(video);
    setVideoUrl(url);

    // Cleanup memory: Purane URL ko delete karna zaroori hai
    return () => URL.revokeObjectURL(url);
  }, [video]);

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

      {/* --- PHOTO PREVIEWS --- */}
      <div className="upload-section">
        <label className="upload-card">
          <Upload size={30} />
          <span>Add Photos</span>
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

      <hr style={{ margin: "30px 0", borderColor: "var(--border-primary)" }} />

      {/* --- VIDEO PREVIEW & CHANGE SECTION --- */}
      <div className="video-upload-section">
        <label
          style={{
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "15px",
          }}
        >
          <Video size={18} /> Room Tour Video
        </label>

        {!video ? (
          /* Case 1: Agar video nahi hai toh upload box dikhao */
          <div className="video-dropzone">
            <input
              type="file"
              accept="video/*"
              id="v-up"
              hidden
              onChange={(e) => setVideo(e.target.files[0])}
            />
            <label htmlFor="v-up" className="video-upload-ui">
              <Play size={24} />
              <span>Select Video to Preview</span>
            </label>
          </div>
        ) : (
          /* Case 2: Agar video hai toh Player aur Remove button dikhao */
          <div className="video-preview-wrapper">
            <div className="video-card">
              <video src={videoUrl} controls className="actual-video-player" />
              <div className="video-footer">
                <div className="v-name-box">
                  <Video size={14} />
                  <span>{video.name}</span>
                </div>
                {/* Yahan se user video hata kar change kar sakta hai */}
                <button
                  type="button"
                  className="remove-video-btn"
                  onClick={() => setVideo(null)}
                >
                  <X size={16} /> Remove & Change Video
                </button>
              </div>
            </div>
            <p className="v-hint">
              Check the video above. You can change it before publishing.
            </p>
          </div>
        )}
      </div>

      {/* --- PROGRESS & PUBLISH --- */}
      {uploading && (
        <div className="uploading-status">
          <p>Uploading Files... {progress}%</p>
          <div className="p-bar">
            <div className="p-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}

      <div className="btn-row" style={{ marginTop: "30px" }}>
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
            <Loader2 className="spinner" size={18} />
          ) : (
            "Publish Listing"
          )}
        </button>
      </div>
    </div>
  );
};

export default Step3;
