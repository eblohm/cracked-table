import PleaseSignIn from '../components/PleaseSignIn';
import UpdateUser from '../components/UpdateUser';

const Me = props => (
  <PleaseSignIn>
    <h3>Update Account</h3>
    <UpdateUser />
  </PleaseSignIn>
);

export default Me;
