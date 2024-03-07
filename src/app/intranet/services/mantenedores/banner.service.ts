import axios from 'axios'

export const bannerServices = {
    async getBanners() {
        const res = await axios.post('http://localhost:4000/api/v1/banner/getBannerList');
        return res;
    },
    
    async getBanner(id:any) {
        const res = await axios.post(`http://localhost:4000/api/v1/banner/getBannerId?iid_banner=${id}`)
    },
    
    async setBanner() {
        const res = await axios.post('http://localhost:4000/api/v1/banner/setBanner')
    },
    
    async udpBanner() {
        const res = await axios.post('http://localhost:4000/api/v1/banner/setBanner')
    },
    
    async delBanner() {
        const res = await axios.post('http://localhost:4000/api/v1/banner/setBanner')
    }
}