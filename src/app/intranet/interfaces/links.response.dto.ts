export interface LinksResponseDTO {
    IsSuccess: boolean
    Message: string
    data: Links[]
    TotalRecords: number
  }

  export interface Links {
    iid_enlace: number
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