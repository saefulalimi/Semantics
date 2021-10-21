import React from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { BiExit } from "react-icons/bi";
import Modal from "react-modal";
import "./Modal.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

function ModalInfo() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <div className="boxIcone">
        <button className="btn-modal" onClick={openModal}>
          <BsFillInfoCircleFill className="iconet" />
        </button>
      </div>
      <Modal
      // className="z-40"
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
          Welcome to Semantics!
        </h2>
        <div>Services Semantics</div>
        <div>
          <p>
             Hello I'm a server from semantics, what's your need 
             this time? if you don't know how to use the feature, 
             try reading the information below
          </p>
          <p>
            Profile, you can use to complete your biodata about your 
            full name, age, web and intro and you can update your 
            profile photo too
          </p>
          <p>
            Calendar you can use to view information or date, day, 
            today of the month, you can also view month and year
          </p>
          <p>
            You can use general notes to note things that are 
            temporary and long
          </p>
          <p>
            You can also use Activty Notes to record activities or 
            points that are long, and activity notes can only store 
            200 character letters
          </p>
          <p>
            you can use the live chat feature with your friends by 
            entering the same id, for example 123
          </p>
        </div>
        <button onClick={closeModal}>
          <BiExit className="iconExit" />
        </button>
      </Modal>
    </div>
  );
}

export default ModalInfo;
