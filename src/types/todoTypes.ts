export type SetDateType = {
    startDate: boolean,
    dueDate: boolean,
  }
  
export type TodosAtomType = {
    id: number;
    cardTitle: string;
    cardContent: string;
    checked: boolean;
    startDate: null | string | string[] | undefined;
    dueDate: null | string | string[] | undefined;
}

export type ModalType = string | null;