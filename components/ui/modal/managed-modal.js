import dynamic from 'next/dynamic';
import Modal from './modal';
import { MODAL_VIEWS, useModalAction, useModalState } from './modal.context';
const EditAuction = dynamic(
  () => import('../../Auction/AuctionEdit')
);
const SelectCollection = dynamic(
  () => import('../../Collection/SelectCollection')
);

const ManagedModal = () => {
  const { isOpen, view, data } = useModalState();
  const { closeModal } = useModalAction();

  return (
    <Modal open={isOpen} onClose={closeModal}
      title={view === MODAL_VIEWS.EDIT_AUCTION ? "Edit Auction" : "Modal"}
    >
      {view === MODAL_VIEWS.EDIT_AUCTION && <EditAuction />}
      {view === MODAL_VIEWS.MINT_NFT && <SelectCollection />}
    </Modal>
  );
};

export default ManagedModal;
