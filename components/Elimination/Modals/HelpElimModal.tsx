import { useEffect, useRef } from "react";
import { EliminationUserData } from "../../../Types/EliminationTypes";
import { Modal } from "../../Utils/Modal";
import QRCode from "qrcode";
import { ShieldExclamationIcon } from "@heroicons/react/outline";
export const KillCodeModal = (props: {
  userData: EliminationUserData | null;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const { userData, open, setOpen } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    userData?.secret &&
      open &&
      setTimeout(() => {
        QRCode.toCanvas(canvasRef.current!, userData.secret, {
          margin: 1,
          width: 192,
        });
      }, 10);
  }, [userData, open]);
  return (
    <Modal
      visible={open}
      onClose={() => setOpen(false)}
      title="Kill Code"
      hideBG
    >
      <div
        className={`w-156 h-128 max-w-[95vw] md:w-screen md:h-144 max-h-screen rounded-xl dark:bg-gray-700 bg-white flex flex-col p-8 gap-4 dark:text-gray-200 text-gray-900 drop-shadow-sm`}
      >
        <div
          className={`w-full h-20 flex flex-col justify-start items-center gap-4`}
        >
          <span
            className={`w-full bg-red-300 dark:bg-red-500 dark:bg-opacity-40 p-4 flex flex-row gap-1 rounded-lg text-red-800 dark:text-red-300 font-bold`}
          >
            <ShieldExclamationIcon className={`w-6 h-6`} /> DO NOT POST THIS
            POPUP ANYWHERE
          </span>
          <span className={`w-full`}>
            Have your assassin scan this QR code when they find you
          </span>
          <canvas
            ref={canvasRef}
            className={`w-48 h-48 max-w-full aspect-square`}
          />
          <span className={`w-full`}>
            If you don&apos;t have a QR code reader, you can manually enter the
            code shown below
          </span>

          <div
            className={`flex flex-row w-full justify-between items-center gap-4`}
          >
            <div
              className={`p-4 shadow-inner bg-gray-100 dark:bg-gray-850 rounded-lg text-center flex-grow text-2xl font-medium font-source`}
            >
              {userData?.secret}
            </div>
            <button
              className={`p-1 px-4 border-collapse text-primary-500 border-primary-500 border-2 rounded-full hover:bg-primary-500 hover:text-white transition-all whitespace-nowrap`}
              onClick={() => setOpen(false)}
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
