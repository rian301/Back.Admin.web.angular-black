export enum SentStatusEnum {
  Sent = 1,
  InProgress = 2,
  Receiving = 3
}

export function TraduzirSentStatusTypeEnum(valor: SentStatusEnum): string {
  switch (valor) {
    case 1:
      return "Enviado";
    case 2:
      return "Pendente";
    case 3:
      return "Pendente";
  }
}
