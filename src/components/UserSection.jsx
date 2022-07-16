import React, { useEffect } from 'react';
import UserSectionCard from './UserSectionCard';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { load_users } from '../actions/cloud';

const UserSection = ({ users, load_users }) => {
  useEffect(() => {
    load_users(1, false);
  }, []);
  return (
    <div className=" flex overflow-x-auto items-center px-4 pt-4 space-x-4">
      {users && users.map((item, i) => <UserSectionCard key={i} item={item} />)}
      <Link to="/users" className=" text-blue-600">
        More
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.cloud.users,
});
export default connect(mapStateToProps, {
  load_users,
})(UserSection);
