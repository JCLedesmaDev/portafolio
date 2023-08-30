import { IFileRequest } from "@interface/IFileRequest";

export interface IUpdateUserRequest {
    idUser: string;
    fullName: string;
    seniority: string;
    aboutMe: string;
    mySoftSkills: string;
    imageProfile: IFileRequest[];
    curriculumVitae: string; 
}