export interface EnterateResponseDTO{
    IsSuccess: boolean
    Message: string
    data: IEnterate[]
    TotalRecords: number
  }
  
  export interface IEnterate{
    iid_enterate: number
    vtitulo: string
    vtextobreve: string
    vimagen: string
    vlink: string
    vredireccion: string
    iorden: number
    dfecha: string
    iid_estado_registro: number
    vdescripcion_estado: string
  }
  