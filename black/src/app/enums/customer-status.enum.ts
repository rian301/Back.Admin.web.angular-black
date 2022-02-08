export enum CustomerStatusEnum {
    Good = 1,
    Regular = 2,
    Alert = 3
}

export function TraduzirCustomerStatusTypeEnum(valor: CustomerStatusEnum): string {
    switch (valor) {
        case 1:
            return "Bom";
        case 2:
            return "Regular";
        case 3:
            return "Alerta";
    }
}
