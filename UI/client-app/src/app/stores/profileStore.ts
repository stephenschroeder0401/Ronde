import formatRelativeWithOptions from "date-fns/esm/fp/formatRelativeWithOptions/index.js";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Photo, Profile } from "../models/profile";
import { store } from "./store";

export default class ProfileStore{
    profile: Profile | null = null;
    loadingProfile = false;
    uploading = false;
    loading =false;

    constructor(){
        makeAutoObservable(this);
    }

    get isCurrentUser(){
        if(store.userStore.user && this.profile){
            return store.userStore.user.userName === this.profile.username;
        }

        return false;
    }

    loadProfile = async(username: string) =>{
        this.loadingProfile = true;
        try{
            const profile = await agent.Profiles.get(username);
            runInAction(() =>{
                this.profile = profile;
                this.loadingProfile = false;
            })
        }
        catch(error){
            console.log(error);
            runInAction(() => this.loadingProfile = false)
        }
    }

    uploadPhoto = async (file: Blob) =>{
        this.uploading = true;

        try{
            const response = await agent.Profiles.uploadPhoto(file);
            const photo = response.data;
            runInAction(() =>{
                if(this.profile){
                    this.profile.photos?.push(photo);
                    if(photo.isMain && store.userStore.user){
                        store.userStore.setImage(photo.url);
                        this.profile.image = photo.url;
                    }
                }
                this.uploading = false;
            })
        }
        catch(error){
            console.log(error);
            runInAction(() => this.uploading = false)
        }
    }

    setMainPhoto = async (photo: Photo) =>{
        this.loading = true;
        try{
            await agent.Profiles.setMainPhoto(photo.publicId);
            store.userStore.setImage(photo.url);
            runInAction(() =>{
                if(this.profile && this.profile.photos){
                    this.profile.photos.find(p => p.isMain)!.isMain = false;
                    this.profile.photos.find(p => p.publicId === photo.publicId)!.isMain = true;
                    this.profile.image = photo.url;
                    this.loading = false;
                }
            })
        }
        catch(error){
            runInAction(() => this.loading = false)
        }
    }

    deletePhoto = async (id: string) =>{
        this.loading = true;
        try{
            await agent.Profiles.deletePhoto(id);
            runInAction(() =>{
                if(this.profile && this.profile.photos){
                    this.profile.photos = this.profile.photos.filter(p => p.publicId !== id);
                    this.loading = false;
                }
            })
        }
        catch(error){
            runInAction(() => this.loading = false)
        }

    }

    toggleFollowing = async (profile: Profile) =>{
        this.loading = true;
        try{
            await agent.Profiles.toggleFollowing(profile.userId);
            runInAction(() =>{
                if(this.profile?.following){
                    this.profile.following = false;
                    this.profile.followersCount--;
                }
                else if(this.profile?.following == false){
                    this.profile.following = true;
                    this.profile.followersCount++;
                }
                this.loading = false;
            })
        }
        catch(error){
            runInAction(() => this.loading = false)
        }

    }
}
