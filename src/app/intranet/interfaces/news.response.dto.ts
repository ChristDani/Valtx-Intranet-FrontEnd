export interface NoticiasResponseDTO{
    IsSuccess: boolean
    Message: string
    data: Noticias[]
    TotalRecords: number
  }
  
  export interface Noticias {
    iid_news: number
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
  