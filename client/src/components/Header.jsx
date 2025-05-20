import React from "react";
import { CloudDownload } from "lucide-react";

export default function Header() {
  return (
    <header className="p-2 flex items-center justify-center bg-gray-800 text-white font-bold text-3xl shadow-2xl">
      <CloudDownload className="w-10 h-10 mr-2" />
      <span>Backup Sync</span>
    </header>
  );
}
