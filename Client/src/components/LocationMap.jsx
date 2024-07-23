const LocationMap = () => {
  return (
    <div className="section-container mb-8 border-2 p-0">
      {" "}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3424.5482762880547!2d75.83861167504305!3d30.871319778922686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a83001235e49b%3A0x57389ae40bebe221!2sDugri%20phase%201!5e0!3m2!1sen!2sin!4v1718961997217!5m2!1sen!2sin"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        className="mx-auto h-96 w-full"
      ></iframe>{" "}
    </div>
  );
};
export default LocationMap;
