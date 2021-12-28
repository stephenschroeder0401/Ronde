import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Card, Header, Tab, Image, Grid, Button } from 'semantic-ui-react';
import PhotoUploadWidget from '../../app/common/imageUpload/PhotoUploadWidget';
import { Photo, Profile } from '../../app/models/profile';
import { useStore } from '../../app/stores/store';

interface Props{
    profile: Profile;
}

export default observer(function ProfilePhotos({profile}: Props){

    const {profileStore: {isCurrentUser, uploadPhoto, uploading, loading, setMainPhoto, deletePhoto}} = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [target, setTarget] = useState('');
    
    function handlePhotoUpload(file: Blob){
        uploadPhoto(file).then(() => setAddPhotoMode(false))
    }

    function handleSetMainPhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>){
        setTarget(e.currentTarget.name);
        setMainPhoto(photo);
    }

    function handleDeletePhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>){
        setTarget(e.currentTarget.name);
        deletePhoto(photo.publicId);
    }

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                <Header floated='left' icon ='image' content='Photos'></Header>
                {isCurrentUser && (
                    <Button floated='right' basic 
                        content={addPhotoMode ? 'Cancel' : 'Add Photo'}
                        onClick={() => setAddPhotoMode(!addPhotoMode)}
                    /> 
                )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {addPhotoMode ? (
                        <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading} />
                    ): (
                        <Card.Group>
                        {profile.photos?.map(photo =>(
                            <Card>
                                <Image src={photo.url}/>
                                {isCurrentUser  && (
                                    <Button.Group fluid widths={2}>
                                        <Button
                                            basic
                                            color='green'
                                            content='Main'
                                            name={'main' + photo.publicId}
                                            disabled={photo.isMain}
                                            loading={target === 'main' + photo.publicId && loading}
                                            onClick={e => handleSetMainPhoto(photo, e)}
                                        />
                                        <Button 
                                            basic 
                                            color='red' 
                                            loading={target === photo.publicId && loading} 
                                            icon='trash' 
                                            name={photo.publicId}
                                            disabled={photo.isMain}  
                                            onClick={e => handleDeletePhoto(photo, e)}
                                         />
                                    </Button.Group>
                                )}
                            </Card>
                        ))}
                    </Card.Group>
                    )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})