import { ClipLoader } from "react-spinners";
import { override } from "../../lib/utils";

const Spinner = () => {
  return (
    <div className="spinner-position">
      <ClipLoader
        color={override.color}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Spinner;
