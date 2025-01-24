"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function BirthdayForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    senderName: "",
    recipientName: "",
    birthDate: "",
    targetAge: "",
  });
  const [errors, setErrors] = useState({
    senderName: "",
    recipientName: "",
    birthDate: "",
    targetAge: "",
  });
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [step]);

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "senderName":
      case "recipientName":
        if (!value.trim()) {
          return "This field is required";
        }
        if (value.trim().length < 2) {
          return "Name must be at least 2 characters";
        }
        if (value.trim().length > 50) {
          return "Name must be less than 50 characters";
        }
        return "";
      case "birthDate":
        if (!value) {
          return "Birth date is required";
        }
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        selectedDate.setHours(0, 0, 0, 0);

        if (selectedDate <= today) {
          return "Please select a future date for the celebration";
        }
        return "";
      case "targetAge":
        if (!value) {
          return "Target age is required";
        }
        const age = parseInt(value);
        if (isNaN(age) || age < 1 || age > 150) {
          return "Please enter a valid age between 1 and 150";
        }
        return "";
      default:
        return "";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleNextStep = () => {
    let error = "";
    switch (step) {
      case 1:
        error = validateField("senderName", formData.senderName);
        if (error) {
          setErrors((prev) => ({ ...prev, senderName: error }));
          return;
        }
        break;
      case 2:
        error = validateField("recipientName", formData.recipientName);
        if (error) {
          setErrors((prev) => ({ ...prev, recipientName: error }));
          return;
        }
        break;
      case 3:
        error = validateField("birthDate", formData.birthDate);
        if (error) {
          setErrors((prev) => ({ ...prev, birthDate: error }));
          return;
        }
        break;
    }
    setStep((prev) => prev + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) formDataToSend.append(key, value);
      });

      const response = await fetch("/api/create-countdown", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.id) {
        router.push(`/countdown/${data.id}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (step < 4) {
        handleNextStep();
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Your Name
              </label>
              <input
                ref={inputRef}
                type="text"
                name="senderName"
                required
                value={formData.senderName}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="mt-1 block w-full rounded-md border-2 border-gray-300 dark:border-gray-600 
                px-4 py-2 bg-white dark:bg-gray-800 
                focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 
                transition-colors"
              />
              {errors.senderName && (
                <p className="mt-1 text-sm text-red-500">{errors.senderName}</p>
              )}
            </div>
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full bg-purple-600 text-white rounded-md py-2 hover:bg-purple-700"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Birthday Person&apos;s Name
              </label>
              <input
                ref={inputRef}
                type="text"
                name="recipientName"
                required
                value={formData.recipientName}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="mt-1 block w-full rounded-md border-2 border-gray-300 dark:border-gray-600 
                px-4 py-2 bg-white dark:bg-gray-800 
                focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 
                transition-colors"
              />
              {errors.recipientName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.recipientName}
                </p>
              )}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full bg-gray-200 text-gray-800 rounded-md py-2 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="w-full bg-purple-600 text-white rounded-md py-2 hover:bg-purple-700"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Birthday Date
              </label>
              <input
                ref={inputRef}
                type="date"
                name="birthDate"
                required
                min={new Date().toISOString().split("T")[0]}
                value={formData.birthDate}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="mt-1 block w-full rounded-md border-2 border-gray-300 dark:border-gray-600 
                px-4 py-2 bg-white dark:bg-gray-800 
                focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 
                transition-colors"
              />
              {errors.birthDate && (
                <p className="mt-1 text-sm text-red-500">{errors.birthDate}</p>
              )}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full bg-gray-200 text-gray-800 rounded-md py-2 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="w-full bg-purple-600 text-white rounded-md py-2 hover:bg-purple-700"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Which Birthday?
              </label>
              <input
                ref={inputRef}
                type="number"
                name="targetAge"
                required
                min="1"
                max="150"
                value={formData.targetAge}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="e.g. 25"
                className="mt-1 block w-full rounded-md border-2 border-gray-300 dark:border-gray-600 
                px-4 py-2 bg-white dark:bg-gray-800 
                focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 
                transition-colors"
              />
              {errors.targetAge && (
                <p className="mt-1 text-sm text-red-500">{errors.targetAge}</p>
              )}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="w-full bg-gray-200 text-gray-800 rounded-md py-2 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 text-white rounded-md py-2 hover:bg-purple-700 disabled:bg-purple-400"
              >
                {loading ? "Sending..." : "Create Countdown"}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
