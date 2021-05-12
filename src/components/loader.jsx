export default function Loader(props) {
  return (
    <div className="lds-ring">
      <div className={props.white && " loading-light"}></div>
      <div className={props.white && " loading-light"}></div>
      <div className={props.white && " loading-light"}></div>
      <div className={props.white && " loading-light"}></div>
    </div>
  );
}
