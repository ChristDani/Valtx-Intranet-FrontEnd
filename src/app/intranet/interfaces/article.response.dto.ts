export interface ArticleResponseDTO {
    IsSuccess: boolean
    Message: string
    data: Article[]
    TotalRecords: number
  }
  
  export interface Article {
    iid_blog: number
    vtitulo: string
    vtextobreve: string
    vimagen: string
    vlink: string
    vredireccion: string
    iorden: number
    dfecha: string
    iid_estado_registro: number
    iid_categoria: number
    vdescripcion_estado: string
    vdescripcion_categoria: string
  }
  