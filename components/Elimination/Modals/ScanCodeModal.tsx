import { useEffect, useRef } from "react";
import { EliminationUserData } from "../../../Types/EliminationTypes";
import { Modal } from "../../Utils/Modal";
import QRCode from "qrcode";
import { ShieldExclamationIcon } from "@heroicons/react/outline";
import { ContinuousQrScanner } from "react-webcam-qr-scanner.ts";
export const ScanKillCodeModal = (props: {
  open: boolean;
  setOpen: (open: boolean) => void;
  setCode: (code: string) => void;
}) => {
  const { open, setOpen, setCode } = props;
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
        <ContinuousQrScanner
          onQrCode={(code) => {
            alert(code);
            setCode(code);
            setOpen(false);
          }}
          hidden={false}
        />
      </div>
    </Modal>
  );
};
