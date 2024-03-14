export interface EventResponseDTO{
    IsSuccess: boolean
    Message: string
    data: Evento[]
    TotalRecords: number
  }
  
  export interface Evento {
    iid_evento: number
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
  