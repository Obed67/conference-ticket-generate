function TicketCard({ info, image }) {
  const submissionDate = new Date().toLocaleDateString(); // Date actuelle

  return (
    <div className="relative w-[320px] h-[200px] bg-gradient-to-r from-blue-600 to-indigo-800 rounded-lg shadow-lg text-white p-4 flex flex-col justify-between">
      {/* Avatar */}
      {image && (
        <img
          src={image}
          alt="User Avatar"
          className="absolute top-4 left-4 w-12 h-12 object-cover rounded-full border-2 border-white"
        />
      )}

      {/* Logo et titre */}
      <div className="text-center mt-2">
        <img
          src="/src/assets/images/logo-mark.svg"
          alt="Logo"
          className="mx-auto w-10 h-10"
        />
        <h3 className="text-lg mt-1 font-bold">Coding Conf</h3>
      </div>

      {/* Contenu principal */}
      <div className="flex flex-col gap-1 mt-4">
        <p className="text-sm">
          <span className="font-semibold">Name:</span> {info.fullName}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Email:</span> {info.email}
        </p>
        <p className="text-sm">
          <span className="font-semibold">GitHub:</span> {info.github}
        </p>
      </div>

      {/* Date */}
      <p className="text-sm text-right mt-4">
        <span className="font-semibold">Date:</span> {submissionDate}
      </p>
    </div>
  );
}

export default TicketCard;
