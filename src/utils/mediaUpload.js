import { createClient } from "@supabase/supabase-js";

let url = import.meta.env.VITE_SUPABASE_URL
let key = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(url,key);

export default function uploadMedia(file){

    return new Promise(
        (resolve,reject)=>{
            if(file == null){
                reject("No file selected")
            }
            else{
                const timeStamp = new Date().getTime();
                const fileName = timeStamp + "_" + file.name;

                supabase.storage.from("images").upload(fileName,file,{
                    upsert : false,
                    casheControl : "3600",
                }).then(()=>{
                    const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
                    resolve(publicUrl);

                }).catch((error)=>{
                    reject(error);

                });
            }
        }
    )

}