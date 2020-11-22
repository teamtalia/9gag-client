import React, { useState } from 'react';
import { Upload as UploadAntd, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import imagekit from '../../config/imagekit';

const Upload: React.FC = () => {
  const { Dragger } = UploadAntd;

  const [uploadedFiles, setUploadedFiles] = useState([]);

  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  const uploadOptions = {
    beforeUpload,
    name: 'file',
    multiple: true,
  };

  return (
    <>
      <Dragger
        customRequest={options => {
          const { file, onError, onSuccess } = options;
          imagekit.upload(
            {
              file,
              fileName: file.name,
              useUniqueFileName: true,
              folder: 'tmp/',
            },
            (err, result) => {
              if (err) {
                onError(err);
                setUploadedFiles(files =>
                  files.filter(f => f.uid !== file.uid),
                );
              }
              if (result) {
                onSuccess(result, file);
                setUploadedFiles(files => [
                  ...files.filter(f => f.uid !== file.uid),
                  {
                    uid: file.uid,
                    ...result,
                  },
                ]);
              }
            },
          );
        }}
        {...uploadOptions}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>
      <ul>
        {uploadedFiles.map(file => {
          const { thumbnailUrl, name } = file;
          console.log(file);
          return (
            <li
              style={{
                display: 'flex',
              }}
            >
              <img src={thumbnailUrl} alt="uploaded" />
              <span>{name}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Upload;
