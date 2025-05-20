import React, { useEffect, useState } from "react";
import { format, isToday } from "date-fns";
import ModalHeader from "./ModalHeader";
import ModalActions from "./ModalActions";
import ProgressBar from "./ProgressBar";

const Modal = ({ selectedDate, closeModal, handleBackup, userRole }) => {
  if (!selectedDate) return null;

  const formattedDate = format(selectedDate, "yyyy-MM-dd");
  const [backupCompleted, setBackupCompleted] = useState(false);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasBackup, setHasBackup] = useState(false);

  useEffect(() => {
    const savedBackups = JSON.parse(localStorage.getItem("backupDates")) || [];
    const hasExistingBackup = savedBackups.includes(formattedDate);
    setBackupCompleted(hasExistingBackup);
    setHasBackup(hasExistingBackup);
  }, [formattedDate]);

  const updateProgress = () => {
    let current = 10;
    const interval = setInterval(() => {
      current += 10;
      setProgress((prev) => (prev >= 100 ? 100 : prev + 10));
      if (current >= 100) clearInterval(interval);
    }, 500);
    return interval;
  };

  const handleBackupClick = async () => {
    setIsBackingUp(true);
    setProgress(10);
    const interval = updateProgress();

    try {
      await handleBackup(selectedDate);
      setProgress(100);
      clearInterval(interval);
      setBackupCompleted(true);
      setHasBackup(true);
    } catch {
      // Handle backup error
    } finally {
      setTimeout(() => setIsBackingUp(false), 500);
    }
  };

  const handleRestoreClick = () => {
    setIsRestoring(true);
    setProgress(10);
    const interval = updateProgress();

    setTimeout(() => {
      setProgress(100);
      clearInterval(interval);
      setTimeout(() => setIsRestoring(false), 500);
    }, 3000);
  };

  const handleDownload = () => {
    // Placeholder: Would trigger backend download
    alert(`Download triggered for backup-${formattedDate}.zip`);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70" onClick={closeModal}>
      <div className="bg-white p-6 rounded-lg shadow-lg text-center w-100" onClick={(e) => e.stopPropagation()}>
        <ModalHeader selectedDate={selectedDate} backupCompleted={backupCompleted} />
        <ModalActions
          selectedDate={selectedDate}
          userRole={userRole}
          backupCompleted={backupCompleted}
          isBackingUp={isBackingUp}
          isRestoring={isRestoring}
          hasBackup={hasBackup}
          onBackup={handleBackupClick}
          onRestore={handleRestoreClick}
          onDownload={handleDownload}
        />
        {(isBackingUp || isRestoring) && <ProgressBar progress={progress} color={isBackingUp ? "blue" : "green"} />}
        <div className="mt-4">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer hover:bg-red-700"
            onClick={closeModal}
            disabled={isBackingUp || isRestoring}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
