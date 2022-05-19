import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent } from 'react';
import { Button, Reveal } from 'semantic-ui-react';
import { Profile } from '../../app/models/profile';
import { useStore } from '../../app/stores/store';

interface Props{
    profile: Profile;
};


export default observer(function FollowButton({profile} : Props){

    const {profileStore, userStore} = useStore();
    const {toggleFollowing, loading} = profileStore;

    if(userStore.user?.userName === profile.username) return null;

    function handleFollow(e: SyntheticEvent){
        console.log(profile);
        e.preventDefault();
        toggleFollowing(profile);
    }

    return(
        <Reveal animated='move'>
            <Reveal.Content visible style={{width: '100%'}}>
                <Button fluid color='teal' loading={loading} content={profile.following ? 'Following' : 'Not Following'} />
            </Reveal.Content>
                <Reveal.Content hidden style={{width: '100%'}}>
                    <Button fluid color={true ? 'red' : 'green'} 
                            content={profile.following ? 'Unfollow' : 'Follow'} 
                            loading={loading} 
                            onClick={(e) => handleFollow(e)}/>
                </Reveal.Content>
        </Reveal>
    );
})
