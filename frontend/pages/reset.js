import Reset from '../components/Reset';

const Resetpage = props => {
  return (
    <div>
      <p>Reset your password</p>
      <Reset resetToken={props.query.resetToken} />
    </div>
  );
};

export default Resetpage;
