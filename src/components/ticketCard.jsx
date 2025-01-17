// src/components/ticketCard.jsx
export default function TicketCard({ fullName, email, image }) {
    return (
      <div className="w-96 p-6 bg-white text-gray-900 rounded-lg shadow-md mt-8">
        {/* Affichage de l'avatar */}
        {image && (
          <img src={image} alt="Avatar" className="w-24 h-24 rounded-full mx-auto mb-4" />
        )}
        <h2 className="text-2xl mb-4 text-center">Congrats, {fullName}! Your ticket is ready.</h2>
        <p className="text-center text-lg mb-4">
          We've emailed your ticket to {email} and will send updates in the run up to the event.
        </p>
        <div className="flex justify-center mt-4">
          <button className="bg-[hsl(7,88%,67%)] text-white py-2 px-4 rounded-lg shadow-md transition-colors duration-300 hover:bg-[hsl(7,71%,60%)]">
            View Ticket
          </button>
        </div>
      </div>
    );
}