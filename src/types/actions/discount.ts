import { EFuelTitle, TFuelData } from "../components";
import { TGlobalState } from "../reducers";


interface IDiscountActions {
  SET_DISCOUNT: string;
}

export interface ISetDiscount {
  type: IDiscountActions['SET_DISCOUNT'];
  data: {
    type: EFuelTitle,
    data: TFuelData
  };
}

