import React from 'react'

const userCard = ({ user }) => {
    const {firstName, lastName, photoUrl, age, gender, about, skills} = user;
    return (
      <div className="card bg-base-300 w-96 shadow-xl">
        <figure>
          <img
            src={user?.photoUrl}
            alt="Profile photo"
          />
        </figure>
        <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                <p>{photoUrl}</p>
                {skills && <p>{skills}</p>}
                {/* {age && gender && <p>Age: {age} Gender: {gender}</p>}
                {about && <p>{about}</p>} */}
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
  );
}

export default userCard;

