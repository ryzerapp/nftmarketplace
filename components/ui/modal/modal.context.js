import React from 'react';

export const MODAL_VIEWS = {
  EDIT_AUCTION: 'EDIT_AUCTION',
  MINT_NFT: 'MINT_NFT'
}

const initialState = {
  view: undefined,
  isOpen: false,
  data: null,
  init: '123456789'
};

function modalReducer(state, action) {
  switch (action.type) {
    case 'open':
      return {
        ...state,
        view: action.view,
        data: action.payload,
        isOpen: true,
      };
    case 'close':
      return {
        ...state,
        view: undefined,
        data: null,
        isOpen: false,
      };
    default:
      throw new Error('Unknown Modal Action!');
  }
}

const ModalStateContext = React.createContext({ state: initialState });
ModalStateContext.displayName = 'ModalStateContext';
const ModalActionContext = React.createContext({ dispatch: () => null });
ModalActionContext.displayName = 'ModalActionContext';

export const ModalProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(modalReducer, initialState);
  return (
    <ModalStateContext.Provider value={state}>
      <ModalActionContext.Provider value={dispatch}>
        {children}
      </ModalActionContext.Provider>
    </ModalStateContext.Provider>
  );
};

export function useModalState() {
  const context = React.useContext(ModalStateContext);
  if (context === undefined) {
    throw new Error(`useModalState must be used within a ModalProvider`);
  }
  return context;
}

export function useModalAction() {
  const dispatch = React.useContext(ModalActionContext);
  if (dispatch === undefined) {
    throw new Error(`useModalAction must be used within a ModalProvider`);
  }
  return {
    openModal(view, data = {}) {
      dispatch({ type: 'open', view, payload: data });
    },
    closeModal() {
      dispatch({ type: 'close' });
    },
  };
}
