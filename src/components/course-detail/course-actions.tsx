"use client";

import { useState } from "react";

import { CourseIcon } from "@/components/course-detail/course-icons";
import { shareCourseLink } from "@/lib/course-detail";

export function CourseShareButton({ title }: { title: string }) {
  const [message, setMessage] = useState("");

  async function share() {
    try {
      const result = await shareCourseLink(navigator, window.location.href, title);
      setMessage(result === "shared" ? "Share sheet opened." : "Course link copied.");
    } catch {
      setMessage("Unable to share this course from this browser.");
    }
  }

  return (
    <div className="bs-course-share-wrap">
      <button className="bs-course-share" onClick={share} type="button">
        <CourseIcon height={24} name="share" width={24} />
        <span>Share</span>
      </button>
      <span aria-live="polite" className="sr-only" role="status">
        {message}
      </span>
    </div>
  );
}

export function CoursePreviewAction() {
  const [message, setMessage] = useState("");

  return (
    <>
      <button
        aria-describedby="course-preview-status"
        aria-label="Play course preview"
        className="bs-course-media__play"
        onClick={() =>
          setMessage("The supplied design does not include a video source, so playback is unavailable.")
        }
        type="button"
      >
        <span className="bs-course-media__play-inner">
          <CourseIcon height={60} name="play" width={60} />
        </span>
      </button>
      <span aria-live="polite" className="sr-only" id="course-preview-status" role="status">
        {message}
      </span>
    </>
  );
}

export function EnrollmentAction() {
  const [message, setMessage] = useState("");

  return (
    <>
      <button
        aria-describedby="course-enrollment-status"
        className="bs-course-enrollment__button"
        onClick={() =>
          setMessage("Enrollment checkout is not connected because no payment backend was supplied.")
        }
        type="button"
      >
        Enroll Now
      </button>
      <span aria-live="polite" className="bs-course-enrollment__status" id="course-enrollment-status" role="status">
        {message}
      </span>
    </>
  );
}
