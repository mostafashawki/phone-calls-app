import React, { useState } from "react";
import TableWrapper from "./Keypad.style";
import { User } from "../../Types";

type Props = {
  calling: (dialingDigit: string, user: User) => void;
  user: User;
};

const Keypad: React.FC<Props> = ({ calling, user }) => {
  const [dialingDigit, setdialingDigit] = useState(() => "");

  /**
   * send the keypad dialing digits
   * @param digit
   */
  const adddialingDigit = (digit: string) => {
    if (dialingDigit.length < 3) {
      setdialingDigit((prevdialingDigit) => prevdialingDigit + digit);
    }
  };

  /**
   * clear the dialing digits
   */
  const backspacedialingDigit = () => {
    setdialingDigit((prevdialingDigit) =>
      prevdialingDigit.slice(0, dialingDigit.length - 1)
    );
  };

  /**
   * send the call data to the Calls component
   */
  const handleCalling = () => {
    console.log("dialing ");
    calling(dialingDigit, user);
    setdialingDigit(() => "");
  };

  return (
    <TableWrapper>
      <tbody>
        <tr className="output-row">
          <td></td>
          <td id="output">{dialingDigit}</td>
          <td>
            <p className="first-last">
              <i
                className="fas fa-long-arrow-alt-left"
                onClick={backspacedialingDigit}
              ></i>
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <p onClick={() => adddialingDigit("1")}>1</p>

            <small>
              <i className="fas fa-voicemail"></i>
            </small>
          </td>
          <td>
            <p onClick={() => adddialingDigit("2")}>2</p>
            <small>ABC</small>
          </td>
          <td>
            <p onClick={() => adddialingDigit("3")}>3</p>
            <small>DEF</small>
          </td>
        </tr>
        <tr>
          <td>
            <p onClick={() => adddialingDigit("4")}>4</p>
            <small>GHI</small>
          </td>
          <td>
            <p onClick={() => adddialingDigit("5")}>5</p>
            <small>JKL</small>
          </td>
          <td>
            <p onClick={() => adddialingDigit("6")}>6</p>
            <small>MNO</small>
          </td>
        </tr>
        <tr>
          <td>
            <p onClick={() => adddialingDigit("7")}>7</p>
            <small>PQRS</small>
          </td>
          <td>
            <p onClick={() => adddialingDigit("8")}>8</p>
            <small>TUV</small>
          </td>
          <td>
            <p onClick={() => adddialingDigit("9")}>9</p>
            <small>WXYZ</small>
          </td>
        </tr>
        <tr>
          <td>
            <p onClick={() => adddialingDigit("*")}>*</p>
          </td>
          <td>
            <p onClick={() => adddialingDigit("0")}>0</p>
          </td>
          <td>
            <p onClick={() => adddialingDigit("#")}>#</p>
          </td>
        </tr>
        <tr>
          <td className="first-last">
            <i className="far fa-star"></i>
          </td>
          <td>
            <button onClick={handleCalling} className="button-call">
              <i className="fa fa-phone"></i>
            </button>
          </td>
          <td>
            <p className="first-last" onClick={() => adddialingDigit("+")}>
              +
            </p>
          </td>
        </tr>
      </tbody>
    </TableWrapper>
  );
};

export default Keypad;
