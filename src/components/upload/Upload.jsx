import { IKContext, IKUpload } from "imagekitio-react";
import { useRef } from "react";

const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT;
const publickKey = import.meta.env.VITE_IMAGE_KIT_PUBLICKEY;
const authenticator = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/upload");

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error();
        }

        const data = await response.json();

        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error();
    }
};

const Upload = ({ setImg }) => {
    const ikUploadRef = useRef(null);
    const onError = (err) => {
        console.log("Error", err);
    };

    const onSuccess = (res) => {
        console.log("Success", res);
        setImg((prev) => ({ ...prev, isLoading: false, dbData: res }));
    };

    const onUploadProgress = (process) => {
        console.log("Process", process);
    };

    const onUploadStart = (evt) => {
        console.log("Start", evt);
        const file = evt.target.files[0];

        const reader = new FileReader();
        reader.onloadend = () => {
            setImg((prev) => ({
                ...prev,
                isLoading: true,
                aiData: {
                    inlineData: {
                        data: reader.result.split(",")[1],
                        mimeType: file.type,
                    },
                },
            }));
        };
        reader.readAsDataURL(file);
    };
    return (
        <IKContext
            urlEndpoint={urlEndpoint}
            publicKey={publickKey}
            authenticator={authenticator}
        >
            <IKUpload
                fileName="test-upload.png"
                onError={onError}
                onSuccess={onSuccess}
                useUniqueFileName={true}
                onUploadProgress={onUploadProgress}
                onUploadStart={onUploadStart}
                style={{ display: "none" }}
                ref={ikUploadRef}
            />
            <label onClick={() => ikUploadRef.current.click()}>
                <img src="/attachment.png" alt="" />
            </label>
        </IKContext>
    );
};
export default Upload;
