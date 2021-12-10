<template>
  <div>
    <img :src="imgSrc" width="200" height="200" />
    <van-button @click="takePicture" type="default">拍照</van-button>
    <van-button @click="writeSecretFile" type="success">存文件</van-button>
    <van-button @click="readSecretFile" type="primary">读文件</van-button>
    <van-button @click="deleteSecretFile" type="danger">删文件</van-button>
    文件内容： {{ fileContent }}
  </div>
</template>

<script>
import { Camera, CameraResultType } from "@capacitor/camera";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      imgSrc: "",
      fileContent: "",
    };
  },
  created() {},
  methods: {
    async takePicture() {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
      });

      // image.webPath will contain a path that can be set as an image src.
      // You can access the original file using image.path, which can be
      // passed to the Filesystem API to read the raw data of the image,
      // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
      var imageUrl = image.webPath;

      // Can be set to the src of an image now
      this.imgSrc = imageUrl;
    },
    async writeSecretFile() {
      await Filesystem.writeFile({
        path: "secrets/text.txt",
        data: "This is a test",
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
        recursive: true,
      });
    },
    async readSecretFile() {
      const contents = await Filesystem.readFile({
        path: "secrets/text.txt",
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });
      this.fileContent = contents;
      console.log("secrets:", contents);
    },
    async deleteSecretFile() {
      await Filesystem.deleteFile({
        path: "secrets/text.txt",
        directory: Directory.Documents,
      });
      this.fileContent = "";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
