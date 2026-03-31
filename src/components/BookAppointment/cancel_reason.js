import { Modal, Radio, Input } from "antd";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";

const { TextArea } = Input;

export const optionsReason = [
    "I decided I don't need this service",
    "I Booked this by mistake",
    "The price is too expensive",
    "I need to cancel because of urgent work",
    "I feel uncomfortable with this booking",
    "Other",
];

export const showCancelReasonModal = () => {
  return new Promise((resolve) => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = ReactDOM.createRoot(container);

    const ModalContent = () => {
      const [value, setValue] = useState('Other');
      const [otherText, setOtherText] = useState("");
      const [error, setError] = useState("");
      const [shake, setShake] = useState(false);

      const handleOk = () => {
       
        if (value === "Other" && !otherText.trim()) {
          setError("Please enter your reason.");
          setShake(true);
          setTimeout(() => setShake(false), 300);
          return;
        }

        const finalValue =
          value === "Other" ? otherText.trim() : value;

        resolve(finalValue);
        cleanup();
        return Promise.resolve();
      };

      const handleCancel = () => {
        resolve('cancel');
        cleanup();
      };

      const cleanup = () => {
        setTimeout(() => {
          root.unmount();
          container.remove();
        }, 0);
      };

      return (
        <Modal
          open={true}
          title="Why do you no longer need this booking?"
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Continue"
          cancelText="Cancel"
          maskClosable={false}
          keyboard={false}
        >
          <Radio.Group
            onChange={(e) => {
              setValue(e.target.value);
              setError("");
            }}
            value={value}
            className="w-full"
          >
            <div className="flex flex-col gap-3 mt-3">
              {optionsReason.map((option, index) => (
                <div key={index}>
                  <label
                    className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition
                    ${
                      value === option
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    }`}
                  >
                    <Radio value={option} />
                    <span className="text-sm">{option}</span>
                  </label>

                  {/* Show textarea when "Other" selected */}
                  {value === "Other" && option === "Other" && (
                    <TextArea
                      rows={3}
                      placeholder="Please specify your reason..."
                      className={`mt-2 ${shake ? "animate-shake border-red-500" : ""}`}
                      value={otherText}
                      onChange={(e) => {
                        setOtherText(e.target.value);
                        setError("");
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </Radio.Group>

          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </Modal>
      );
    };

    root.render(<ModalContent />);
  });
};
