'use client';

import { useModal } from 'hooks/useModal';
import { Modal } from 'components/modal/';

export const TempClientComponents = () => {
  const { openModal, closeModal, isModalVisible } = useModal();

  return (
    <>
      <div>
        <button onClick={openModal}>Modal Open</button>
      </div>

      {isModalVisible && (
        <Modal onClose={closeModal} visible={isModalVisible}>
          <div className="modalPosition bg-white p-10 rounded-md">
            <h1>모달창 ESC를 누르거나, 흰색 외곽을 클릭하면 Close</h1>
          </div>
        </Modal>
      )}
    </>
  );
};
