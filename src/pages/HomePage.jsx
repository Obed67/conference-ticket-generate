import { useState, useEffect } from 'react';
import TicketCard from '../components/TicketCard';
import UploadImage from '../components/ImageUpload';
import FormField from '../components/ui/FormInput';

export default function HomePage() {
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

  // Charger les données depuis localStorage
  useEffect(() => {
    const savedForm = JSON.parse(localStorage.getItem('form'));
    const savedImage = localStorage.getItem('image');
    if (savedForm) {
      setForm(savedForm);
    }
    if (savedImage) {
      setImage(savedImage);
    }
  }, []);

  const handleImageUpload = (file) => {
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png') && file.size <= 500000) {
      setImage(URL.createObjectURL(file));
      setIsImageValid(true);
      localStorage.setItem('image', URL.createObjectURL(file)); // Sauvegarder l'image dans localStorage
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
    localStorage.removeItem('image'); // Supprimer l'image de localStorage
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
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    localStorage.setItem('form', JSON.stringify(updatedForm)); // Sauvegarder le formulaire dans localStorage
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm() && image) {
      setTicketInfo(form);
    } else {
      if (!image) {
        setIsImageValid(false); // Si l'image n'est pas valide, on signale l'erreur
      }
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
            <UploadImage
              image={image}
              isImageValid={isImageValid}
              handleRemoveImage={handleRemoveImage}
              handleFileChange={handleFileChange}
            />
            
            <form className="w-full flex flex-col items-center" onSubmit={handleSubmit}>
              <FormField
                label="Full Name"
                name="fullName"
                value={form.fullName}
                onChange={handleInputChange}
                error={formErrors.fullName}
                placeholder="ObeDev"
              />
              <FormField
                label="Email Address"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                error={formErrors.email}
                placeholder="ObeDev@gmail.com"
              />
              <FormField
                label="GitHub Username"
                name="github"
                value={form.github}
                onChange={handleInputChange}
                error={formErrors.github}
                placeholder="@ObeDev7895"
              />
              <div className="w-96 p-2 mb-16">
                <button
                  type="submit"
                  className="bg-[hsl(7,88%,67%)] text-white py-2 px-4 rounded-lg shadow-md transition-colors duration-300 hover:bg-[hsl(7,71%,60%)] w-full"
                >
                  Generate My Ticket
                </button>
              </div>
            </form>
          </>
        )}

        {ticketInfo && (
          <TicketCard fullName={ticketInfo.fullName} email={ticketInfo.email} image={image} />
        )}
      </div>
    </div>
  );
}
