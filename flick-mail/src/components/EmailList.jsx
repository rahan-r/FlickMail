import { useState } from "react";
import {
  StarIcon,
  ArchiveBoxIcon,
  TrashIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";

export default function EmailList({ emails = [], onSelectEmail }) {
  const [selectedEmail, setSelectedEmail] = useState(null);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  console.log("Rendering EmailList with emails:", emails);

  return (
    <div className="h-full overflow-auto">
      <h2 className="text-3xl p-2 font-semibold mb-2">Inbox</h2>
      <p className="text-zinc-400 p-2 text-sm mb-4">
        Received emails will appear here
      </p>
      <hr />
      {Array.isArray(emails) &&
        emails.map((email) => (
          <div
            key={email.id}
            onClick={() => {
              setSelectedEmail(email.id);
              onSelectEmail?.(email);
            }}
            className={`flex items-center w-[368px] p-3 border-b dark:border-gray-700 cursor-pointer ${
              selectedEmail === email.id
                ? "bg-blue-50 dark:bg-gray-700"
                : "hover:bg-gray-50 dark:hover:bg-gray-700"
            } ${!email.seen ? "font-semibold" : ""}`}
          >
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <p className="truncate text-sm">
                  {email.from?.address || "Unknown Sender"}
                </p>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0">
                  {email.createdAt ? formatTime(email.createdAt) : ""}
                </span>
              </div>
              <p className="text-sm truncate">
                {email.subject || "No Subject"}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}
