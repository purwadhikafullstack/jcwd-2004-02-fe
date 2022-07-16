import { Divider, Button } from '@chakra-ui/react' 
import React, { Component, useCallback, createRef } from "react";
import { useDropzone } from "react-dropzone"; 
import Footer from './footer';



const BoxPaymentProof = () => { 

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        console.log("accepted", acceptedFiles);
        console.log("rejected", rejectedFiles);
      }, []);
    
      const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
        onDrop,
        accept: "image/png",
        noClick: true,
        noKeyboard: true,
      });

    return( 
        <div className="w-[800px] h-[400px] rounded-lg shadow-md p-6 font-bold text-purple-900" >Upload Bukti Pembayaran
            <div className='my-5'>
                <Divider/> 
                <div>
                {!acceptedFiles[0] ? (
                <div
                    className="containerx ml-6 my-2 flex items-center justify-center w-[700px] h-[300px]"
                    {...getRootProps()}
                >
                    <input {...getInputProps()} />
                    <div className="mb-6 text-2xl"> Tarik & Letakkan File</div>
                    <div className="flex">
                    <div className="hl"></div>
                    <div className="mb-6 text-sm mx-2">atau</div>
                    <div className="hl"></div>
                    </div>
                    <Button
                    colorScheme={"purple"}
                    className="w-[260px]"
                    type="button"
                    onClick={open}
                    >
                    Unggah Bukti Pembayaran
                    </Button>
                </div>
                ) : (
                <div>
                    <div className="container2 mx-[80px] my-2 flex w-[900px] h-[350px]">
                    <div className="flex border-solid border-gray-200 rounded-lg border-2 px-5 py-2">
                        <BsImage className="text-2xl text-purple-600 " />
                        <ul className="ml-6 text-sm">
                        <div className="flex">
                            <div key={acceptedFiles[0].path}>
                            {acceptedFiles[0].path}
                            </div>
                            <div
                            className="text-purple-600 ml-3"
                            key={acceptedFiles[0].path}
                            >
                            {acceptedFiles[0].size / 1000} KB
                            </div>
                        </div>
                        </ul>
                    </div>
                    <Button
                        colorScheme={"purple"}
                        className="w-[150px] mt-5 "
                        type="button"
                        onClick={open}
                    >
                        Unggah Resep
                    </Button>
                    </div>
                    <div className="flex justify-end mr-6 mb-4  ">
                    <Button
                        variant={"outline"}
                        colorScheme={"purple"}
                        className="w-[100px] mt-3 mr-5 "
                        type="button"
                        // onClick={a}
                    >
                        Cancel
                    </Button>
                    <Button
                        colorScheme={"purple"}
                        className="w-[100px] mt-3 "
                        type="button"
                        onClick={onSaveDataClick}
                    >
                        Unggah
                    </Button>
                    </div>
                </div>
                )}
                </div> 
            </div>
        </div>
    )
} 

export default BoxPaymentProof