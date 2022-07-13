import React, { useEffect, useState } from 'react';
import { resetState, verify } from '../../actions/auth';
import { useNavigate, useParams } from 'react-router-dom';

import BtnPrimary from '../BtnPrimary';
import { connect } from 'react-redux';

const Activate = ({ requestSuccess, verify, resetState, requestFail }) => {
  const navigate = useNavigate();
  const { uid, token } = useParams();

  const [requestSent, setRequestSent] = useState(false);
  useEffect(() => {
    if (requestFail) {
      setRequestSent(false);
      resetState();
    }
    if (requestSuccess) {
      resetState();
    }
  }, [requestFail, requestSuccess]);
  const verify_account = (e) => {
    verify(uid, token);
    setRequestSent(true);
  };
  if (requestSent === requestSuccess) navigate('/login');

  return (
    <div className="py-6 px-6 lg:px-8 flex flex-col justify-center items-center">
      <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
        verify email
      </h3>

      <div className="text-center">
        <BtnPrimary onClick={verify_account}>Activate</BtnPrimary>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  requestSuccess: state.auth.requestSuccess,
  requestFail: state.auth.requestFail,
});
export default connect(mapStateToProps, { verify, resetState })(Activate);
