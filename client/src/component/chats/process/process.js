import "./process.scss";
import { useSelector } from "react-redux";
function Process() {

  const state = useSelector((state) => state.ProcessReducer);

  return (
    <div className="process">
      {/* <div>
        <p>{state.cypher}</p>
      </div>
      <div>
        <p>{state.text}</p>
      </div> */}
    </div>
  );
}
export default Process;