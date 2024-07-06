import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoCalendarOutline } from "react-icons/io5";
import "../App.css";

const AddTaskModal = ({ onSubmit, onCancel, errorMessage }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [isImportant, setIsImportant] = useState(true);

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      dueDate: startDate,
      important:isImportant,
    });
  };

  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <div
      className="flex py-3 px-3 text-sm bg-transparent rounded-md border-b border-gray-300 dark:text-white dark:border-gray-600 focus:outline-none focus:border-blue-500 border-x-transparent"
      ref={ref}
    >
      <IoCalendarOutline size={25} onClick={onClick} />
      <input
        type="text"
        value={value}
        onClick={onClick}
        readOnly
        className="ml-2 border-none bg-transparent outline-none"
      />
    </div>
  ));

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="w-[500px] h-[550px] backdrop-blur-3xl backdrop-brightness-50 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-10 text-white">Add New Task</h2>
        {errorMessage && (
          <div className="mb-4 text-md font-bold text-red-400 ml-7">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="max-w-xs mx-auto">
          {/* Title */}
          <div className="mb-6 relative">
            <label
              htmlFor="title"
              className="absolute left-0 -top-2.5 text-sm dark:text-gray-300 transform origin-0 transition-all duration-200 pointer-events-none"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="block w-full py-3 px-1 text-sm text-gray-300 bg-transparent border-b border-gray-300 dark:text-white dark:border-gray-600 focus:outline-none focus:border-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={(e) =>
                e.target.previousSibling.classList.add(
                  "-top-3",
                  "text-blue-500"
                )
              }
              onBlur={(e) => {
                if (!e.target.value)
                  e.target.previousSibling.classList.remove(
                    "-top-3",
                    "text-blue-500"
                  );
              }}
            />
          </div>

          {/* Description */}
          <div className="mb-6 relative">
            <label
              htmlFor="description"
              className="absolute left-0 -top-2.5 text-sm text-gray-600 dark:text-gray-300 transform origin-0 transition-all duration-200 pointer-events-none"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="1"
              className="block w-full py-3 px-1 text-sm text-gray-900 bg-transparent border-b border-gray-300 dark:text-white dark:border-gray-600 focus:outline-none focus:border-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onFocus={(e) =>
                e.target.previousSibling.classList.add(
                  "-top-3",
                  "text-blue-500"
                )
              }
              onBlur={(e) => {
                if (!e.target.value)
                  e.target.previousSibling.classList.remove(
                    "-top-3",
                    "text-blue-500"
                  );
              }}
            ></textarea>
          </div>

          {/* Due Date */}
          <div className="mb-6 relative">
            <label
              htmlFor="due-date"
              className="absolute left-0 -top-2.5 text-sm text-gray-600 dark:text-gray-300 transform origin-0 transition-all duration-200 pointer-events-none"
            >
              Due Date
            </label>
            <DatePicker
              id="due-date"
              customInput={<CustomInput />}
              selected={startDate}
              onChange={handleDateChange}
              className="block w-full py-3 px-3 text-sm text-gray-900 bg-transparent border-b border-black dark:text-white dark:border-gray-600 focus:outline-none focus:border-blue-500"
              wrapperClassName="w-full mt-5" // Ensure the DatePicker wrapper inherits correct width
            />
          </div>

          {/* Importance */}
          <div className="mb-6 relative">
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-2">
              Importance
            </label>
            <div className="flex items-center">
              <label className="flex items-center mr-4 text-white">
                <input
                  type="radio"
                  value="important"
                  name="Importance"
                  checked = {isImportant}
                  onChange={() => setIsImportant(true)}
                  className="mr-2"
                />
                Important
              </label>
              <label className="flex items-center text-white">
                <input
                  type="radio"
                  value="not-important"
                  name="Importance"
                  checked = {!isImportant}
                  onChange={() => setIsImportant(false)}
                  className="mr-2"
                />
                Not Important
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-black hover:bg-gray-800 text-white font-semibold px-4 py-2 rounded"
            >
              Add Task
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
