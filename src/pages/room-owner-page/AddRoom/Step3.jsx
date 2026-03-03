import React, { useEffect, useState } from "react";
import { Camera, Upload, X, Video, Play } from "lucide-react";
import imageCompression from "browser-image-compression"; // Import library

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
  const [isCompressing, setIsCompressing] = useState(false); // New state for loading

  useEffect(() => {
    if (!video) {
      setVideoUrl(null);
      return;
    }
    const url = URL.createObjectURL(video);
    setVideoUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [video]);

  /* ========================================
      IMAGE UPLOAD WITH AUTO-COMPRESSION
  ========================================= */
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsCompressing(true); // Compression start
    const compressedFiles = [];
    const newPreviews = [];

    const options = {
      maxSizeMB: 1, // 1MB se kam size rakhega
      maxWidthOrHeight: 1920, // HD quality resolution
      useWebWorker: true,
      initialQuality: 0.8, // 80% quality maintain rakhega
    };

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        alert(`${file.name} image nahi hai.`);
        continue;
      }

      try {
        let fileToProcess = file;

        // Agar file 1MB se badi hai tabhi compress karega
        if (file.size > 1 * 1024 * 1024) {
          console.log(`Compressing: ${file.name}`);
          fileToProcess = await imageCompression(file, options);
        }

        compressedFiles.push(fileToProcess);
        newPreviews.push(URL.createObjectURL(fileToProcess));
      } catch (error) {
        console.error("Compression Error:", error);
        alert(`Failed to process ${file.name}`);
      }
    }

    setImages((prev) => [...prev, ...compressedFiles]);
    setPreviews((prev) => [...prev, ...newPreviews]);
    setIsCompressing(false); // Compression end
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

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

  const removeImage = (index) => {
    URL.revokeObjectURL(previews[index]);
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const removeVideo = () => setVideo(null);

  return (
    <div className="fade-in">
      <h3>
        <Camera size={20} /> Photos & Video
      </h3>

      <div className="upload-section">
        <label className={`upload-card ${isCompressing ? "disabled" : ""}`}>
          <Upload size={30} />
          <span>
            {isCompressing
              ? "Processing Images..."
              : "Add Photos (High Quality)"}
          </span>
          <input
            type="file"
            multiple
            hidden
            accept="image/*"
            onChange={handleImageChange}
            disabled={isCompressing}
          />
        </label>
      </div>

      {/* Image Previews */}
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

      {/* Video Section */}
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
          <Video size={18} /> Room Tour Video (Max 50MB)
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
              <span>Select Video</span>
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
              </video>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <span className="file-name">{video.name}</span>
              <button
                type="button"
                className="btn-remove-video"
                onClick={removeVideo}
              >
                <X size={16} /> Remove
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Upload/Compression Progress */}
      {(uploading || isCompressing) && (
        <div className="uploading-status">
          <p>
            {isCompressing ? "Optimizing Images..." : `Uploading: ${progress}%`}
          </p>
          <div className="p-bar">
            <div
              className="p-fill"
              style={{ width: `${isCompressing ? 100 : progress}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="btn-row" style={{ marginTop: "30px" }}>
        <button
          type="button"
          className="btn-prev"
          onClick={() => setStep(2)}
          disabled={uploading || isCompressing}
        >
          Back
        </button>
        <button
          type="submit"
          className="btn-submit"
          disabled={uploading || isCompressing || images.length === 0}
        >
          {uploading ? "Publishing..." : "Publish Listing"}
        </button>
      </div>
    </div>
  );
};

export default Step3;
