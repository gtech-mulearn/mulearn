import "./TeamCard.css";

const TeamCard = ({ name, designation, image, linkedIn, github, twitter }) => {
  return (
    <div className="team-card">
      <div className="team-card__image">
        <img className="photo" src={image} alt={name} loading="lazy" />
      </div>
      <div className="team-card__content">
        <div className="details">
          <h3 className="team-card__name">{name}</h3>
          <p className="team-card__designation">{designation}</p>
        </div>
        <div className="social_icons">
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
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="team-card__linkedin"
          >
            <img
              src="/assets/placeholder/github.webp"
              alt=""
              className="linkedinimg"
            />
          </a>
        )}
        {twitter && (
          <a
            href={twitter}
            target="_blank"
            rel="noreferrer"
            className="team-card__linkedin"
          >
            <img
              src="/assets/placeholder/twitter-sign.webp"
              alt=""
              className="linkedinimg"
            />
          </a>
        )}
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
