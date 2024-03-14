export interface BannerResponseDTO {
    IsSuccess: boolean
    Message: string
    data: Banner[]
    TotalRecords: number
  }
  
  export interface Banner {
    iid_banner: number
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
  