type Data = {
    firstname: string;
    gender: string;
    lastname: string;
    phone: string;
    workplace: string;
    adress: string;
    sum: number;
    days: number;
}

export type TPersonalData = Omit<Data,'adress' | 'sum' | 'days' | 'workplace'>

export type TJobData = Pick<Data, 'adress' | 'workplace'>

export type TParamData = Pick<Data, 'sum' | 'days'>