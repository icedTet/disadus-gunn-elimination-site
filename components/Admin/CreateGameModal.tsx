import { useState } from "react";
import { Modal } from "../Utils/Modal";

export const CreateGameModal = (props: {
  onClose: () => void;
  visible: boolean;
}) => {
  const { onClose, visible } = props;
  const [gameName, setGameName] = useState("");
  return (
    <Modal visible={visible} onClose={onClose} title="Kill Code" hideBG>
      <div
        className={`w-192 h-128 max-w-[90%] max-h-screen rounded-xl dark:bg-gray-700 bg-white flex flex-col p-8 gap-4 dark:text-gray-200 text-gray-900 drop-shadow-sm`}
      >
        <span className={`text-white text-2xl`}> Create a new game </span>
        <input
          onBlur={(e) => setGameName(e.target.value)}
          className={`w-full text-xl p-4 rounded-xl dark:bg-gray-800 bg-gray-200 focus:bg-gray-400 focus:outline-none`}
          type="text"
          placeholder="Game name"
        />
        <textarea
          className={`w-full h-auto p-4 rounded-xl dark:bg-gray-800 bg-gray-200 focus:bg-gray-400 focus:outline-none resize-none`}
          placeholder="Game description"
        />
        <button
          className={`w-full h-32 p-4 rounded-xl dark:bg-gray-800 bg-gray-200 focus:bg-gray-400 focus:outline-none`}
          type="button"
        >
          Create
        </button>
      </div>
    </Modal>
  );
};
