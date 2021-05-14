import { makeObservable, observable } from "mobx";
import { isConstructorDeclaration } from "typescript";

export default class ActivityStore{
    title = 'Hello';

    constructor(){
        makeObservable(this,{
            title: observable
        })
    }

}

