import dynamic from 'next/dynamic';
// import Modal from './modal_copy';
import Modal from './modal';
import { MODAL_VIEWS, useModalAction, useModalState } from './modal.context';
const EditAuction = dynamic(
  () => import('../../Auction/AuctionEdit')
);

const ManagedModal = () => {
  const { isOpen, view, data } = useModalState();
  const { closeModal } = useModalAction();

  return (
    <Modal open={isOpen} onClose={closeModal}>
      {view === MODAL_VIEWS.EDIT_AUCTION && <EditAuction />}
      {/* {view === 'LOGIN_VIEW' && <Login />} */}
      {/* {view === 'REGISTER' && <Register />}*/}

    </Modal>
  );
};

export default ManagedModal;
