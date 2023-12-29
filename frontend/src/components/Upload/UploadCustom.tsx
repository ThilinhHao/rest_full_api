import React from 'react';
import { message, Upload } from 'antd';
import { UploadButtonWrapper, UploadWrapper } from './uploadCustomStyle';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const UploadCustom = () => {
  // const [imageUrl, setImageUrl] = useState<string>();
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const uploadButton = <UploadButtonWrapper>項目追加</UploadButtonWrapper>;

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      // setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        // setLoading(false);
        // setImageUrl(url);
      });
    }
  };

  return (
    <UploadWrapper>
      <Upload
        name="avatar"
        listType="picture-card"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {uploadButton}
      </Upload>
    </UploadWrapper>
  );
};

export default UploadCustom;
