export interface DocumentationResponseDTO{
    IsSuccess: boolean
    Message: string
    data: Documentation[]
    TotalRecords: number
  }
  
  export interface Documentation{
    iid_documentacion: number
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
  