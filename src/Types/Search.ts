import {  CustomizablePlan, Product } from "./Product";
import { User } from "./Auth";

export type AIResponse  = {
    abstract: string;

    recommandPlans: {
        plan : CustomizablePlan;
        user : User;
        reason: string; 
    }[];


    productRecommendReason: string;
    recommandProduct: Product[];
}