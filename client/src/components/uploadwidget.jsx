/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

export default function UploadWidget({setUrl, setUploading}) {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    useEffect(()=> {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudName: 'do0w2gqax',
                uploadPreset: 'library'
            }, 
            function(error, result) {
                if(error) {
                    setUploading(false);
                    return;
                }
                if(!result || result.event != "success") {
                    setUploading(true);
                    return;
                } 
                setUploading(false);
                setUrl(result.info.url);
            }
        );
    }, [setUploading, setUrl]);
    return (
        <button onClick={()=> widgetRef.current.open()} className="bg-amber-400 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md"> Upload </button>
    );
}
