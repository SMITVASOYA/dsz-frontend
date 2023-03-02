import React, { useState, useContext } from "react";

const PopupContext = React.createContext();

export const usePopups = () => {
  return useContext(PopupContext);
};

export function PopupProvider({ children }) {
  const [ChatPopup, SetChatPopup] = useState(false);
  const [NewRequest, SetNewRequest] = useState(false);
  const [NewQoutation, SetNewQoutation] = useState(false);
  const [NewInvoice, SetNewInvoice] = useState(false);
  const [NewClient, SetNewClient] = useState(false);
  const [EditStaffDetails, SetEditStaffDetails] = useState(false);
  const [EditClientDetails, SetEditClientDetails] = useState(false);
  const [EditReqDetails, SetEditReqDetails] = useState(false);
  const [ForwardQueries, SetForwardQueires] = useState(false);

  return (
    <PopupContext.Provider
      value={{
        chat: [ChatPopup, SetChatPopup],
        newreq: [NewRequest, SetNewRequest],
        forwardQueries: [ForwardQueries, SetForwardQueires],
        qoutation: [NewQoutation, SetNewQoutation],
        invoice: [NewInvoice, SetNewInvoice],
        client: [NewClient, SetNewClient],
        employee: [EditStaffDetails, SetEditStaffDetails],
        EditClient: [EditClientDetails, SetEditClientDetails],
        EditReq: [EditReqDetails, SetEditReqDetails],
      }}
    >
      {children}
    </PopupContext.Provider>
  );
}
