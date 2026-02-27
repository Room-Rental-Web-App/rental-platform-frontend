import React, { useEffect, useState } from "react";
import { Camera, Upload, X, Video, Loader2, Play } from "lucide-react";

const MAX_IMAGE_SIZE = 4 * 1024 * 1024; // 4MB
const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB

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

  /* =========================
     VIDEO PREVIEW EFFECT
  ========================== */
  useEffect(() => {
    if (!video) {
      setVideoUrl(null);
      return;
    }

    const url = URL.createObjectURL(video);
    setVideoUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [video]);

  /* =========================
     IMAGE UPLOAD HANDLER
  ========================== */
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    const validFiles = [];
    const newPreviews = [];

    files.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        alert("Only image files are allowed.");
        return;
      }

      if (file.size > MAX_IMAGE_SIZE) {
        alert(`${file.name} exceeds 4MB limit.`);
        return;
      }

      validFiles.push(file);
      newPreviews.push(URL.createObjectURL(file));
    });

    setImages((prev) => [...prev, ...validFiles]);
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  /* =========================
     VIDEO UPLOAD HANDLER
  ========================== */
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Only allow MP4 and WebM (browser safe)
    if (!["video/mp4", "video/webm"].includes(file.type)) {
      alert("Only MP4 or WebM videos are supported.");
      return;
    }

    if (file.size > MAX_VIDEO_SIZE) {
      alert("Video must be less than 50MB.");
      return;
    }

    setVideo(file);
  };

  /* =========================
     REMOVE IMAGE
  ========================== */
  const removeImage = (index) => {
    URL.revokeObjectURL(previews[index]);

    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  /* =========================
     REMOVE VIDEO
  ========================== */
  const removeVideo = () => {
    setVideo(null);
  };

  return (
    <div className="fade-in">
      <h3>
        <Camera size={20} /> Photos & Video
      </h3>

      {/* ================= IMAGE SECTION ================= */}
      <div className="upload-section">
        <label className="upload-card">
          <Upload size={30} />
          <span>Add Photos (Max 4MB each)</span>
          <input
            type="file"
            multiple
            hidden
            accept="image/*"
            onChange={handleImageChange}
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
              onClick={() => removeImage(i)}
            />
          </div>
        ))}
      </div>

      <hr style={{ margin: "30px 0" }} />

      {/* ================= VIDEO SECTION ================= */}
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
          <Video size={18} /> Room Tour Video (MP4 / WebM, Max 50MB)
        </label>

        {!video ? (
          <div className="video-dropzone">
            <input
              type="file"
              accept="video/mp4,video/webm"
              id="video-upload"
              hidden
              onChange={handleVideoChange}
            />
            <label htmlFor="video-upload" className="video-upload-ui">
              <Play size={24} />
              <span>Select Video to Preview</span>
            </label>
          </div>
        ) : (
          <div className="video-preview-wrapper">
            {videoUrl && (
              <video
                key={videoUrl}
                controls
                style={{
                  width: "100%",
                  maxHeight: "400px",
                  background: "#000",
                }}
              >
                <source src={videoUrl} type={video.type} />
                Your browser does not support the video tag.
              </video>
            )}

            <div style={{ marginTop: "10px" }}>
              <strong>{video.name}</strong>
            </div>

            <button
              type="button"
              className="remove-icon"
              onClick={removeVideo}
              style={{ marginTop: "10px" }}
            >
              <X size={16} /> 
            </button>
          </div>
        )}
      </div>

      {/* ================= PROGRESS ================= */}
      {uploading && (
        <div className="uploading-status">
          <p>Uploading Files... {progress}%</p>
          <div className="p-bar">
            <div
              className="p-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* ================= BUTTONS ================= */}
      <div className="btn-row" style={{ marginTop: "30px" }}>
        <button
          type="button"
          className="btn-prev"
          onClick={() => setStep(2)}
          disabled={uploading}
        >
          Back
        </button>

        <button
          type="submit"
          className="btn-submit"
          disabled={uploading}
        >
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