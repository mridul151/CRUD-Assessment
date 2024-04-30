import React from 'react';

const UserItem = ({ user }) => {
  return (
    <div>
      <p>{user.name}</p>
      {/* Display other user details */}
    </div>
  );
}

export default UserItem;