import React, { useState } from 'react';
import TicketCard from './components/ticketCard';

export default function App() {
  const [image, setImage] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isImageValid, setIsImageValid] = useState(true);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    github: ''
  });
  const [formErrors, setFormErrors] = useState({
    fullName: false,
    email: false,
    github: false
  });
  const [ticketInfo, setTicketInfo] = useState(null);

  const handleImageUpload = (file) => {
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png') && file.size <= 500000) {
      setImage(URL.createObjectURL(file));
      setIsImageValid(true);
    } else {
      setIsImageValid(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleImageUpload(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const validateForm = () => {
    const errors = {
      fullName: form.fullName.trim() === '',
      email: !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(form.email),
      github: form.github.trim() === ''
    };
    setFormErrors(errors);
    return !Object.values(errors).includes(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setTicketInfo(form);
    }
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen w-full text-center bg-cover bg-center"
      style={{ backgroundImage: "url('/src/assets/images/background-desktop.png')", backgroundSize: 'cover', backgroundRepeat: 'repeat' }}
    >
      <img
        src="/src/assets/images/pattern-squiggly-line-bottom-desktop.svg"
        alt="bottom pattern"
        className="absolute bottom-0 left-0"
      />
      <img
        src="/src/assets/images/pattern-squiggly-line-top.svg"
        alt="top pattern"
        className="absolute top-0 right-0"
      />

      <div className="z-10 text-white flex flex-col items-center">
        <div className="flex gap-3 mt-4">
          <img src="/src/assets/images/logo-mark.svg" alt="logo" className="mb-4" />
          <h3 className="text-xl mb-4">Coding Conf</h3>
        </div>

        {ticketInfo ? (
          <h1 className="text-4xl mb-4">
            Congrats, {ticketInfo.fullName}! Your ticket is ready.
          </h1>
        ) : (
          <h1 className="text-4xl mb-4">
            Your Journey to Coding Conf <br /> 2025 Starts Here!
          </h1>
        )}

        {!ticketInfo && (
          <>
            <div
              className="border-2 border-dashed rounded-lg w-96 flex flex-col items-center justify-center relative gap-4 bg-[hsl(248,70%,10%)]"
              style={{ borderColor: isImageValid ? '#ccc' : 'hsl(7,86%,67%)' }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {isHovered ? (
                <>
                  <img
                    src="/src/assets/images/icon-upload.svg"
                    alt="Upload icon"
                    className="w-10 h-10 object-contain"
                  />
                  <p className="text-sm text-gray-400">
                    Drag & Drop your image here <br /> or click to upload
                  </p>
                </>
              ) : (
                <>
                  <img
                    src={image || '/src/assets/images/image-avatar.jpg'}
                    alt="Avatar"
                    className="w-20 h-20 object-cover rounded-xl mt-4"
                  />
                  <div className="flex gap-4 mb-4">
                    <button
                      onClick={handleRemoveImage}
                      className="bg-gray-600 text-white py-2 px-2 rounded-md hover:bg-gray-500 transition-colors text-sm"
                    >
                      Remove Image
                    </button>
                    <label
                      htmlFor="fileInput"
                      className="bg-gray-600 text-white py-2 px-2 rounded-md hover:bg-gray-500 transition-colors text-sm"
                    >
                      Choose Image
                    </label>
                    <input
                      id="fileInput"
                      type="file"
                      accept="image/jpeg, image/png"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center mt-2 w-96">
              <img
                src="/src/assets/images/icon-info.svg"
                alt="info icon"
                className="w-4 h-4 mr-2"
              />
                <p className="text-sm text-gray-400">
                  Upload your photo (JPG or PNG, max size: 500KB).
                </p>
            </div>
          </>
        )}

        {!ticketInfo ? (
          <form className="w-full flex flex-col items-center" onSubmit={handleSubmit}>
            <div className="w-96 mb-2 p-2">
              <label className="block text-left my-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleInputChange}
                className={`w-full p-2 rounded-lg ${formErrors.fullName ? 'border-[hsl(7,86%,67%)]' : 'border-gray-500'} bg-[hsl(248,70%,10%)] placeholder-gray-300 border-2`}
                placeholder="ObeDev"
              />
              {formErrors.fullName && (
                <div className="flex gap-1 text-[hsl(7,86%,67%)] mt-2">
                  <img src="/src/assets/images/icon-info.svg" alt="info icon" className="w-4 h-4" />
                  <p className="text-sm">Please enter a valid full name</p>
                </div>
              )}
            </div>
            <div className="w-96 mb-2 p-2">
              <label className="block text-left my-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                className={`w-full p-2 rounded-lg ${formErrors.email ? 'border-[hsl(7,86%,67%)]' : 'border-gray-500'} bg-[hsl(248,70%,10%)] placeholder-gray-300 border-2`}
                placeholder="ObeDev@gmail.com"
              />
              {formErrors.email && (
                <div className="flex gap-1 text-[hsl(7,86%,67%)] mt-2">
                  <img src="/src/assets/images/icon-info.svg" alt="info icon" className="w-4 h-4" />
                  <p className="text-sm">Please enter a valid email address</p>
                </div>
              )}
            </div>
            <div className="w-96 mb-2 p-2">
              <label className="block text-left my-1">GitHub Username</label>
              <input
                type="text"
                name="github"
                value={form.github}
                onChange={handleInputChange}
                className={`w-full p-2 rounded-lg ${formErrors.github ? 'border-[hsl(7,86%,67%)]' : 'border-gray-500'} bg-[hsl(248,70%,10%)] placeholder-gray-300 border-2`}
                placeholder="@ObeDev7895"
              />
              {formErrors.github && (
                <div className="flex gap-1 text-[hsl(7,86%,67%)] mt-2">
                  <img src="/src/assets/images/icon-info.svg" alt="info icon" className="w-4 h-4" />
                  <p className="text-sm">Please enter your GitHub username</p>
                </div>
              )}
            </div>
            <div className="w-96 p-2 mb-16">
              <button
                type="submit"
                className="bg-[hsl(7,88%,67%)] text-white py-2 px-4 rounded-lg shadow-md transition-colors duration-300 hover:bg-[hsl(7,71%,60%)] w-full"
              >
                Generate My Ticket
              </button>
            </div>
          </form>
        ) : (
          <TicketCard fullName={ticketInfo.fullName} email={ticketInfo.email} image={image} />
        )}
      </div>
    </div>
  );
}
