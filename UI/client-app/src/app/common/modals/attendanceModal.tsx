import React, {  useState } from 'react'
import { Confirm, Modal } from 'semantic-ui-react'

interface Props{
    isOpen: boolean;
    closeModal: Function;
    header: string;
    body: string;
    confirm: Function;

}

export default function AttendanceModal(props: Props) {

let {isOpen, closeModal, header, body, confirm} = props
  
return (
    <Confirm
      onConfirm = {() => confirm()}
      open={isOpen}
      onCancel={() => closeModal()} 
      header={header}
      content={body}
      actions={['Cancel', { key: 'done', content: 'Confirm', positive: true }]}
    />
  )
}


