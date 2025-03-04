import axios, { AxiosError } from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import LearningPathListData from "./LearningPathList";
import LearningPathOneListData from "../services/LearningPathListOne";
import {
    LearningPathList,
    SingleLearningPath,
    SingleLearningPathTasks
} from "./LearningPathInterfaces";
import toast from "react-hot-toast";
import LearningPathProofOfWorks from "./LearningPathProofOfWorks";

export const getLearningPaths = async (setData: UseStateFunc<LearningPathList[]>) => {
    try {
        // const response = await privateGateway.get(
        //     dashboardRoutes.getHackathons
        // );
        const defaultForm: any = LearningPathListData;
        setData(defaultForm);
    } catch (err: unknown) {
        const error = err as AxiosError;
    }
};

export const getLearningPathOne = async (id: string, setData: UseStateFunc<SingleLearningPath>) => {
    try {
        // const response = await privateGateway.get(
        //     dashboardRoutes.getHackathons
        // );
        const defaultForm: any = LearningPathOneListData.find(lpOne => lpOne.id === id);
        setData(defaultForm);
    } catch (err: unknown) {
        const error = err as AxiosError;
    }
};

export const getLearningPathTasks = async (id: string, setData: UseStateFunc<SingleLearningPathTasks>) => {
    try {
        // const response = await privateGateway.get(
        //     dashboardRoutes.getHackathons
        // );
        const defaultForm: any = LearningPathProofOfWorks.find(lpOne => lpOne.id === id);
        setData(defaultForm);
    } catch (err: unknown) {
        const error = err as AxiosError;
    }
};

export const getFormFields = async (setFormData: UseStateFunc<string>) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getHackathonFormData
        );
        const defaultForm: any = response?.data;
        setFormData(defaultForm.response);
    } catch (err: unknown) {
        const error = err as AxiosError;
    }
};