import React, {  useState } from 'react'
import { Modal } from 'semantic-ui-react'

interface Props{
    isOpen: boolean;
    closeModal: Function;
    header: string;
    body: string;

}

export default function AttendanceModal(props: Props) {

let {isOpen, closeModal, header, body} = props
  
return (
    <Modal
      open={isOpen}
      onActionClick={(e) => closeModal(e)} 
      header={header}
      content={body}
      actions={['Cancel', { key: 'done', content: 'Confirm', positive: true }]}
    />
  )
}


