import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid, Modal } from 'semantic-ui-react';
import { useStore } from '../../stores/store';



export default observer(function ModalContainer(){
    const {modalStore} = useStore();

    return (
        <Grid>
            <Grid.Column width={16}>
        <Modal open={modalStore.modal.open} onClose={modalStore.closeModal}>
            <Modal.Content>
                {modalStore.modal.body}
            </Modal.Content>
        </Modal>
        </Grid.Column>
        </Grid>
)
})