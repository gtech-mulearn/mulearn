import "./TeamCard.css";

const TeamCard = ({ name, designation, image, linkedIn }) => {
  return (
    <div className="team-card">
      <div className="team-card__image">
        <img className="photo" src={image} alt={name} loading="lazy" />
        {linkedIn && (
          <a
            href={linkedIn}
            target="_blank"
            rel="noreferrer"
            className="mobile-linkedin"
          >
            <img
              src="/assets/placeholder/linkedin.webp"
              alt=""
              className="linkedinimg"
            />
          </a>
        )}
      </div>
      <div className="team-card__content">
        <div className="details">
          <h3 className="team-card__name">{name}</h3>
          <p className="team-card__designation">{designation}</p>
        </div>
        {linkedIn && (
          <a
            href={linkedIn}
            target="_blank"
            rel="noreferrer"
            className="team-card__linkedin"
          >
            <img
              src="/assets/placeholder/linkedin.webp"
              alt=""
              className="linkedinimg"
            />
          </a>
        )}
      </div>
    </div>
  );
};

export default TeamCard;
