import { useState, useEffect } from "react";
import {
  StarIcon,
  ArchiveBoxIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { getEmailDetailAPI } from "../service/allAPI";
export default function EmailView({ email }) {
  const [emailDetail, setEmailDetail] = useState(null);
  useEffect(() => {
    const fetchEmailDetail = async () => {
      if (email?.id) {
        try {
          const response = await getEmailDetailAPI(email.id);
          if (response.status === 200) {
            setEmailDetail(response.data);
          }
        } catch (error) {
          console.error("Error fetching email detail:", error);
        }
      }
    };
    fetchEmailDetail();
  }, [email]);
  if (!email) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
        Select an email to view
      </div>
    );
  }
  return (
    <div className="h-full p-6 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">
              {email.subject || "No Subject"}
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium">
                {email.from?.name
                  ? `${email.from.name} <${email.from.address}>`
                  : email.from?.address}
              </span>
              {/* <span>•</span>
                           <span>{new Date(email.createdAt).toLocaleString()}</span> */}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              To: {email.to?.[0]?.address}
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <StarIcon className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <ArchiveBoxIcon className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="prose dark:prose-invert max-w-none">
          <div className="text-gray-800 dark:text-gray-200">
            {emailDetail?.intro}
          </div>

          {/* Email Content */}
          {emailDetail?.html && emailDetail.html.length > 0 && (
            <div
              className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700"
              dangerouslySetInnerHTML={{ __html: emailDetail.html[0] }}
            />
          )}
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Size: {(email.size / 1024).toFixed(2)} KB
            {email.hasAttachments && (
              <span className="ml-2">• Has attachments</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
