import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IoCalendarOutline } from 'react-icons/io5';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        'http://localhost:3000/api/v1/task/newtask',
        {
          title:title,
          description:description,
          dueDate: startDate // Include startDate as dueDate
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        }
      );
      navigate('/home');
    } catch (error) {
      console.error('Error adding task:', error);
      setErrorMessage(error.response ? error.response.data.msg : error.message);
    }
  };

  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <div className="flex gap-1 border border-gray-300 bg-gray-100 rounded-md p-2" ref={ref}>
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
    <div className="max-w-md mx-auto bg-white text-gray-800 p-8 rounded shadow mt-10">
      <Sidebar />
      <h2 className="text-2xl font-bold mb-6">Add New Task</h2>
      {errorMessage && (
              <div className="mb-4 text-sm text-red-600">
                {errorMessage}
              </div>
      )}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium">
          Title
        </label>
        <input
          id="title"
          type="text"
          className="w-full p-3 border border-gray-300 rounded bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          rows="4"
          className="w-full p-3 border border-gray-300 rounded bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Due Date</label>
        <DatePicker
          customInput={<CustomInput />}
          selected={startDate}
          onChange={handleDateChange}
          className="w-full border-none bg-transparent outline-none"
        />
      </div>
      <button
                type="button"
                onClick={handleSubmit}
                className="w-full mt-2 rounded-lg p-4 before:ease relative overflow-hidden border border-black bg-black text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-black hover:before:-translate-x-40"
              >
                Add New Task
              </button>
    </div>
  );
};

export default AddTask;
