import { AdressModel } from "./adress.model";

export class SentModel {
    id: number = null;
    awardId: string = null;
    customerId: number = null;
    customerName: string = null;
    dateRequest: Date = null;
    dateSend: Date = null;
    dateReceiving: Date = null;
    requester: string = null;
    campaign: string = null;
    email: string = null;
    phone: string = null;
    code: string = null;
    name: string = null;
    status: number = null;
    adress: AdressModel = null;

    statusDescription: string = null;
    dateRequestExport: string = null;
    dateSendExport: string = null;
    dateReceivingExport: string = null;
}
