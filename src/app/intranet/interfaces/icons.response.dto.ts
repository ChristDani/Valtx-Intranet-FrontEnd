export interface IconsResponseDTO {
    IsSuccess: boolean
    Message: string
    data: Icons[]
    TotalRecords: number
  }

  export interface Icons {
    iid_icono: number
    vtitulo: string
    vtextobreve: string
    vimagen: string
    vlink: string
    vredireccion: string
    iorden: number
    dfecha: string
    iid_estado_registro: number
    vdescripcion_estado: string
    itipo_icono: number
    vdescripcion_tipo_icono: string
  }