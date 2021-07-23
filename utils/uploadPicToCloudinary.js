import axios from 'axios';

const uploadPic=async(media)=>{
    try{
        
        const form=new FormData();
        form.append('file',media);
        form.append('upload_preset','social_media');
        form.append('cloud_name',dk8ehkczr);

        const res=await axios.post(process.env.CLOUDINARY_URL,form);
        return res.data.url;
        
    }catch(err){
        console.log('error uploading pic==>>',err);
        return;
    }
}

export default uploadPic;