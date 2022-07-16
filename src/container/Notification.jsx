import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { load_notif } from '../actions/auth';
import NotifCard from '../components/NotifCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
const Notification = ({
  load_notif,
  isAuthenticated,
  notification,
  notif_count,
}) => {
  const [page, setPage] = useState(2);
  const navigate = useNavigate();
  useEffect(() => {
    load_notif(1);
    setPage(2);
  }, []);
  const fetchData = async () => {
    await load_notif(page);
    setPage(page + 1);
  };
  if (isAuthenticated === false) navigate('/login');
  return (
    <>
      {notification && (
        <InfiniteScroll
          dataLength={notification.length}
          next={fetchData}
          hasMore={notif_count > notification.length}
          loader={<div></div>}
          endMessage={
            <div>
              <p>...</p>
            </div>
          }>
          {notification.map((notif) => (
            <NotifCard notif={notif} />
          ))}
        </InfiniteScroll>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  notification: state.auth.notification,
  notif_count: state.auth.notif_count,
});
export default connect(mapStateToProps, { load_notif })(Notification);
