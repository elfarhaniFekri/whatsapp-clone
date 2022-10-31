import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/app';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  storageRef,
  uploadString,
  uploadBytesResumable,
  storage,
} from 'firebase/storage';
import uuid from 'react-native-uuid';

export default function ImgPicker() {
  const [image, setImage] = useState(null);

  const [uploading, setUploading] = useState(null);
  const [imageUplaoded, setImageUplaoded] = useState({ image: null });
  const [finalImg, setFinalImg] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = null;
    result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled && result !== null) {
      setImage(result.uri);
      handleImagePicked(result.uri)
        .then((downloadUrl) => {
          setFinalImg(downloadUrl);
        })
        .catch((error) => {
          throw error;
        });
    }
  };

  const handleImagePicked = async (pickerResult) => {
    try {
      setUploading(true);
      const uploadUrl = await uploadImageAsync(pickerResult);
      setImageUplaoded({ image: uploadUrl });
    } catch (e) {
      console.log(e);
      setUploading(false);
    } finally {
      setUploading(null);
    }
  };

  async function uploadImageAsync(uri) {
    const storage = getStorage();
    const refs = ref(storage, `${uuid.v4()}`);

    const img = await fetch(uri);
    const bytes = await img.blob();

    const down = await uploadBytes(refs, bytes);

    getDownloadURL(refs)
      .then((url) => {
        console.log(url);
      })
      .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            break;
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
        }
      });

    return true;
  }

  useEffect(() => {}, [finalImg, image, imageUplaoded, uploading]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title='Pick an image from camera roll' onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
}
