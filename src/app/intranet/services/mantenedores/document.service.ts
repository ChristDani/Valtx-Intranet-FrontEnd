import axios from 'axios'

export const documentacionServices = {
    async getDocumentaciones() {
        const res = await axios.post('http://localhost:4000/api/v1/documentacion/getDocumList')
    },
    
    async getDocumentacion(id:any) {
        const res = await axios.post(`http://localhost:4000/api/v1/documentacion/getDocumId?iid_documentacion=${id}`)
    },
    
    async setDocumentacion() {
        const res = await axios.post('http://localhost:4000/api/v1/documentacion/setDocum')
    },
    
    async udpDocumentacion() {
        const res = await axios.post('http://localhost:4000/api/v1/documentacion/updateDocum')
    },
    
    async delDocumentacion(id:any) {
        const res = await axios.post(`http://localhost:4000/api/v1/documentacion/delDocumId?iid_documentacion=${id}`)
    }
}