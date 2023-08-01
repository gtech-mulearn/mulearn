import "./TeamCard.css";
const img = 'https://t3.ftcdn.net/jpg/01/18/01/98/360_F_118019822_6CKXP6rXmVhDOzbXZlLqEM2ya4HhYzSV.jpg'

const TeamCard = ({ name, designation, image, linkedIn, github, twitter, muid, leadDesignation }) => {
  return (
    <div className="team-card">
      <div className="team-card__image">
        <img className="photo" src={image || img} alt={name} loading="lazy" />
      </div>
      <div className="team-card__content">
        <div className="details">
          <h3 className="team-card__name">{name}</h3>
          {(leadDesignation || designation) && <p className="team-card__designation">
            {leadDesignation ? `${leadDesignation} Lead` : designation}</p>}
          {muid && <p className="team-card__muid">{muid}</p>}
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
