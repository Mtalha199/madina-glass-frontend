import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ContactSpamHistory() {
  const [expandedIndex, setExpandedIndex] = React.useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const spamHistory = [
    {
      time: "07:00",
      spamDetectedBy: ["/icons/spam1.png", "/icons/spam2.png"],
      checkedBy: ["/icons/check1.png", "/icons/check2.png", "/icons/check3.png"],
    },
    {
      time: "07:00",
      spamDetectedBy: ["/icons/spam1.png"],
      checkedBy: ["/icons/check1.png"],
    },
    {
      time: "07:00",
      spamDetectedBy: [],
      checkedBy: [],
    },
    {
      time: "07:00",
      spamDetectedBy: [],
      checkedBy: [],
    },
  ];

  return (
      <div className=" rounded-md mt-3 ">
        <div className="divide-y">
          {spamHistory.map((item, index) => (
            <div key={index} className="mt-3 bg-muted">
              <button
                className=" w-full flex justify-between items-center px-4 py-3 focus:outline-none"
                onClick={() => toggleExpand(index)}
              >
                <span className="text-base ">{item.time}</span>
                {expandedIndex === index ? (
                  <ChevronUp className="w-4 h-4 text-gray-600" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                )}
              </button>
              {expandedIndex === index && (
                <div className="px-4 pb-4">
                  <div className="mb-2">
                    <p className="text-sm font-medium text-gray-600">
                      Spam detected by
                    </p>
                    <div className="flex space-x-2 mt-1">
                      {item.spamDetectedBy.length > 0 ? (
                        item.spamDetectedBy.map((icon, idx) => (
                          <img
                            key={idx}
                            src={icon}
                            alt="Spam icon"
                            className="w-6 h-6 rounded-full border"
                          />
                        ))
                      ) : (
                        <p className="text-gray-400 text-xs">No data</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Checked by
                    </p>
                    <div className="flex space-x-2 mt-1">
                      {item.checkedBy.length > 0 ? (
                        item.checkedBy.map((icon, idx) => (
                          <img
                            key={idx}
                            src={icon}
                            alt="Checked icon"
                            className="w-6 h-6 rounded-full border"
                          />
                        ))
                      ) : (
                        <p className="text-gray-400 text-xs">No data</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
  );
}
