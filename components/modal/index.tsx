import Portal from 'components/modal/Portal';
import { useEffect } from 'react';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  visible: boolean;
}

export const Modal = ({ onClose, visible, children }: ModalProps) => {
  const onMaskClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscModalClose = (e: Event & { key: KeyboardEvent['key'] }) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscModalClose);
    return () => window.removeEventListener('keydown', handleEscModalClose);
  }, []);

  return (
    <Portal selector="modal">
      <div
        className={`fixed inset-0 z-50 box-border overflow-auto outline-none
        ${visible ? 'block' : 'hidden'}`}
        onClick={onMaskClick}
      >
        {children}
      </div>
      <div
        className={`fixed inset-0 z-40 box-border overflow-auto bg-black opacity-50 outline-none ${
          visible ? 'bg-black' : 'hidden'
        }`}
      />
    </Portal>
  );
};
